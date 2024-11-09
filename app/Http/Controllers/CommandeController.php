<?php

namespace App\Http\Controllers;

use App\Models\Commande;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Resources\CommandeResource;
use App\Http\Resources\CommandeProduitResource;
use App\Models\Adresse;
use App\Models\CommandeProduit;
use App\Models\Format;
use App\Models\Produit;
use App\Models\ProduitFormat;
use App\Models\SecteurCode;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use App\Services\QuickBooksService;

class CommandeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $commandes = Commande::with('user')->where('status', 'paid')->latest()->paginate(5);

        return Inertia::render('Admin/Commandes', [
            'commandes' => CommandeResource::collection($commandes)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function webhook(Request $request)
    {
        $endpoint_secret = env('STRIPE_WEBHOOK_SECRET');
        $payload = @file_get_contents('php://input');
        $sig_header = $_SERVER['HTTP_STRIPE_SIGNATURE'];
        $event = null;

        try {
            $event = \Stripe\Webhook::constructEvent(
                $payload,
                $sig_header,
                $endpoint_secret
            );
        } catch (\UnexpectedValueException $e) {
            // Invalid payload
            return response('', 400);
        } catch (\Stripe\Exception\SignatureVerificationException $e) {
            // Invalid signature
            return response('', 400);
        }
        // Handle the event
        switch ($event->type) {
            case 'checkout.session.completed':
                $session = $event->data->object;
                $commande = Commande::where('session_id', $session->id)->first();
                if ($commande && $commande->status === 'unpaid') {
                    $commande->status = 'paid';
                    $commande->save();
                }
            default:
                echo 'Received unknown event type ' . $event->type;
        }
        return response('');
    }

    private function sendCommandeBD(Request $request)
    {
        $idAdresse = null;

        if($request->livraison)
        {
            if(!$request->adresse_exists)
            {
                $adresse = new Adresse;

                $adresse->no_civique = $request->adresse["no_civique"];
                $adresse->rue = $request->adresse["rue"];
                $adresse->appartement = $request->adresse["no_appt"];
                $adresse->code_postal = $request->adresse["code_postal"];
                $adresse->visible = true;

                $adresse->id_secteur_code = SecteurCode::where('code', substr($request->adresse["code_postal"], 0, 3))->first()->id;
                $adresse->save();

                $idAdresse = $adresse->id;
            }
            else
            {
                $idAdresse = $request->adresse_id;
            }
        }

        $commande = new Commande;

        $commande->id_utilisateur = $request->user()->id;
        $commande->livraison = ($request->livraison ? 1 : 0);
        $commande->frais_livraison = $request->frais_livraison;
        $commande->total = $request->total;
        $commande->id_adresse = $idAdresse;
        $commande->id_etat_commande = 1;
        $commande->allergenes = $request->allergenes;

        $commande->save();

        foreach($request->produits as $p)
        {
            for($i = 0; $i < $p["qte"]; $i++)
            {
                CommandeProduit::create([
                    "id_produit" => $p["produitId"],
                    "id_commande" => $commande->id,
                    "id_format" => $p["formatId"],
                    "prix_vente" => Format::where('id', $p["formatId"])->first()->montant
                ]);
            }
        }

        return $commande;
    }

    private function sendCommandeQB(Commande $commande, $sendEmail)
    {
        $quickBooksService = new QuickBooksService();
        $quickBooksService->refreshTokens();

        $produits = $commande->ProduitsCommande()->get();
        $itemsQb = [];

        foreach ($produits as $produit)
        {
            $format = Format::where('id', $produit->pivot->id_format)->first();
            $produitFormat = ProduitFormat::where('id_produit', $produit->id)->where('id_format', $format->id)->first();

            $itemsQb[] = [
                "Amount" => $format->montant,
                "DetailType" => "SalesItemLineDetail",
                "SalesItemLineDetail" => [
                    "ItemRef" => [
                        "value" => $produitFormat->id_qb
                    ]
                ]
            ];
        }

        if($commande->livraison)
        {
            $fraisLivraisonItem = $quickBooksService->getFraisLivraisonItem();

            $itemsQb[] = [
                "Amount" => $commande->frais_livraison,
                "DetailType" => "SalesItemLineDetail",
                "SalesItemLineDetail" => [
                    "ItemRef" => [
                        "value" => $fraisLivraisonItem->Id
                    ]
                ]
            ];
        }

        //dump($itemsQb);

        $quickBooksService->createInvoice($commande, $itemsQb, $sendEmail);
    }

    /**
     * Store a newly created resource in storage.
     */

    public function store(Request $request)
    {
        $commande = $this->sendCommandeBD($request);
        $this->sendCommandeQB($commande, true);

        return redirect('/?commandePassee=1');
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, int $id)
    {
        $commandes = Commande::find($id);
        $produits = CommandeProduit::where('id_commande', $id)->get();

        $prevPage = $request->prevPage;

        if(is_null($prevPage))
            $prevPage = "";

        return Inertia::render('Admin/Commande', [
            'commande' => new CommandeResource($commandes),
            'produits' => CommandeProduitResource::collection($produits),
            'prevPage' => $prevPage
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Commande $commande)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Commande $commande)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Commande $commande)
    {
        //
    }

    public function checkout(Request $request)
    {
        //dd($request);
        $quickBooksService = new QuickBooksService();

        \Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));

        $items = [];

        foreach ($request->produits as $p) {
            $produit = Produit::where('id', $p["produitId"])->first();
            $format = Format::where('id', $p["formatId"])->first();
            $nom = $produit->nom . " " . $format->nom_interne;

            $items[] = [
                'price_data' => [
                    'currency' => 'cad',
                    'product_data' => [
                        'name' => $nom
                    ],
                    'unit_amount' => $format->montant * 100
                ],
                'quantity' => $p["qte"]
            ];
        }

        if($request->livraison)
        {
            $items[] = [
                'price_data' => [
                    'currency' => 'cad',
                    'product_data' => [
                        'name' => "Frais de livraison"
                    ],
                    'unit_amount' => $request->frais_livraison * 100
                ],
                'quantity' => 1
            ];
        }

        $session = $request->user()->checkout(
            [],
            [
                'line_items' => $items,
                'mode' => 'payment',
                'success_url' => route('commande-success') . '?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url' => route('panier'),
            ],
        );

        $commande = $this->sendCommandeBD($request);

        $commande->status = "unpaid";
        $commande->session_id = $session->id;
        $commande->stripe_id = $request->user()->stripe_id;

        $commande->save();

        // Si le paiement se fait en ligne, c'est mieux d'envoyer à QuickBooks APRÈS que le paiement soit fait.
        // $this->sendCommandeQB($request, $commande);

        //envoi de la facture à QuickBooks, besoin de la commande et des items

        return Inertia::location($session->url);
    }


    public function success(Request $request)
    {
        $quickBooksService = new QuickBooksService();
        \Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));

        $sessionId = $request->get('session_id');

        $session = \Stripe\Checkout\Session::retrieve($sessionId);

        if (!$session) {
            throw new NotFoundHttpException;
        }

        $commande = Commande::where('session_id', $sessionId)->first();

        if ($commande->status == "unpaid")
            $commande->status = "paid";

        $commande->save();

        $this->sendCommandeQB($commande, false);

        $user = $commande->user()->first();
        $quickBooksService->sendPayment($user, $commande);

        //dump("Commande passée!");

        return redirect('/?commandePassee=1');

        //dd($commande->ProduitsCommande()->get());
        // retourner vers page confirmation commande + vider panier (localstorage)
    }


    public function cancel(Request $request) {}
}
