<?php

namespace App\Http\Controllers;

use App\Http\Resources\FormatRessource;
use App\Http\Resources\ProduitRessource;
use App\Models\FormatLangue;
use App\Models\ProduitLangue;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PanierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $produits = ProduitRessource::collection(ProduitLangue::all());
        $formats = FormatRessource::collection(FormatLangue::all());

        return Inertia::render('Panier', [
            'produits' => $produits,
            'formats' => $formats
        ]);
    }
}
