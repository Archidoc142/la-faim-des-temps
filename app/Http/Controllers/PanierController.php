<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProduitRessource;
use App\Models\Produit;
use Inertia\Inertia;

class PanierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $produits = ProduitRessource::collection(Produit::ProduitsWithLang());

        return Inertia::render('Panier', [
            'produits' => $produits,
        ]);
    }
}
