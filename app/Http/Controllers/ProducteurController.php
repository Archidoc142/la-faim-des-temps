<?php

namespace App\Http\Controllers;

use App\Models\Producteur;
use App\Models\ProducteurLangue;
use App\Http\Resources\ProducteurResource;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProducteurController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $producteurs = ProducteurResource::collection(Producteur::paginate(5));

        return Inertia::render('Producteur/Producteurs', [
            'producteurs' => $producteurs
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //dd($request);

        //validator ?

        //dd($request);
        if(!is_null($request->file('img')))
            {
                $file = $request->file('img');

                File::delete(public_path('img/' . $image->nom_fichier));

                $image->nom_fichier = $file->getClientOriginalName();
                $file->move(public_path('/img'), $image->nom_fichier);
            }

        $producteur = Producteur::create([
            'nom' => $request->nom,
            'url' => $request->has('url') ? $request->url : null,
            'adresse' => $request->adresse,
            'id_image' => 1
        ]);

        //dd($producteur->id);
        $descriptionFR = ProducteurLangue::create([
            'id_producteur' => $producteur->id,
            'id_langue' => 1,
            'description' => $request->descriptionFR
        ]);

        $descriptionEN = ProducteurLangue::create([
            'id_producteur' => $producteur->id,
            'id_langue' => 2,
            'description' => $request->descriptionEN
        ]);

        return redirect("/producteurs");
    }

    /**
     * Display the specified resource.
     */
    public function show(Producteur $producteur)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Producteur $producteur)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Producteur $producteur)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Producteur $producteur)
    {
        //
    }
}
