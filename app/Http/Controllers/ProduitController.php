<?php

namespace App\Http\Controllers;

use App\Models\Format;
use App\Models\Format_Langue;
use App\Models\Produit;
use App\Models\Produit_Langue;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProduitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        //$produits = Produit::with('description', 'allFormats')->get();
        $produits = Produit::all();
        $formats = Format::all();
        $prodDesc = Produit_Langue::all();
        $langFormats = Format_Langue::all();

      /*  dump($produits);
        dump($formats);
        dump($prodDesc);
        dump($langFormats);*/


        return Inertia::render('Menu', [
            'produits' => $produits,
            'formats' => $formats,
            'prodDesc' => $prodDesc,
            'langFormats' => $langFormats
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Produit $produit)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Produit $produit)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Produit $produit)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Produit $produit)
    {
        //
    }
}
