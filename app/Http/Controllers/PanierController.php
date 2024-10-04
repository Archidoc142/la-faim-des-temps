<?php

namespace App\Http\Controllers;

use App\Http\Resources\AdressesResource;
use App\Http\Resources\ProduitRessource;
use App\Models\Adresse;
use App\Models\Commande;
use App\Models\Produit;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class PanierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $produits = ProduitRessource::collection(Produit::ProduitsWithLang());

        $idCommandsOfUser = Commande::where('id_utilisateur', Auth::id())->distinct()->pluck('id_adresse');
        $addressesOfUser = Adresse::whereIn('id', $idCommandsOfUser)->get();
        $addresses = AdressesResource::collection($addressesOfUser);

        return Inertia::render('Panier', [
            'produits' => $produits,
            'adresses' => $addresses
        ]);
    }
}
