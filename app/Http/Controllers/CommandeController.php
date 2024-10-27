<?php

namespace App\Http\Controllers;

use App\Models\Commande;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Resources\CommandeResource;
use App\Models\Adresse;
use App\Models\CommandeProduit;
use App\Models\Format;
use App\Models\Produit;
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

    /**
     * Store a newly created resource in storage.
     */
    /*
    public function store(Request $request)
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

        dd("Commande ajoutée");

    }*/

    /**
     * Display the specified resource.
     */
    public function show(Commande $commande)
    {
        //
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
        \Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));

        $quickBooksService = new QuickBooksService();

        $items = [];

        foreach ($request->produits as $p) {
            $produit = Produit::where('id', $p["produitId"])->first();
            $format = Format::where('id', $p["formatId"])->first();

            $items[] = [
                'price_data' => [
                    'currency' => 'cad',
                    'product_data' => [
                        'name' => $produit->nom . " " . $format->nom_interne
                    ],
                    'unit_amount' => $format->montant * 100
                ],
                'quantity' => $p["qte"]
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


        $idAdresse = null;

        if ($request->livraison) {
            if (!$request->adresse_exists) {
                $adresse = new Adresse;

                $adresse->no_civique = $request->adresse["no_civique"];
                $adresse->rue = $request->adresse["rue"];
                $adresse->appartement = $request->adresse["no_appt"];
                $adresse->code_postal = $request->adresse["code_postal"];
                $adresse->visible = true;

                $adresse->id_secteur_code = SecteurCode::where('code', substr($request->adresse["code_postal"], 0, 3))->first()->id;
                $adresse->save();

                $idAdresse = $adresse->id;
            } else {
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

        $commande->status = "unpaid";
        $commande->session_id = $session->id;
        $commande->stripe_id = $request->user()->stripe_id;

        $commande->save();

        foreach ($request->produits as $p) {
            for ($i = 0; $i < $p["qte"]; $i++) {
                CommandeProduit::create([
                    "id_produit" => $p["produitId"],
                    "id_commande" => $commande->id,
                    "id_format" => $p["formatId"],
                    "prix_vente" => Format::where('id', $p["formatId"])->first()->montant
                ]);
            }
        }

        //envoi de la facture à QuickBooks, besoin de la commande et des items
        //TODO: gérer l'ajout de chaque item dans la facture
        $quickBooksService ->createInvoice($commande, $items);

        return Inertia::location($session->url);
    }


    public function success(Request $request)
    {
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

        dump("Commande passée!");
        dd($commande->ProduitsCommande()->get());
        // retourner vers page confirmation commande + vider panier (localstorage)
    }


    public function cancel(Request $request) {}
}
