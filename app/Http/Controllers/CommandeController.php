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
use App\Models\SecteurCode;

class CommandeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $commandes = Commande::with('user')->latest()->paginate(5);

        return Inertia::render('Admin/Commandes', [
            'commandes' => CommandeResource::collection($commandes)
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
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
}
