<?php

namespace App\Http\Controllers;

use App\Http\Resources\FormatResource;
use App\Http\Resources\ProduitRessource;
use App\Http\Resources\ProduitsResource;
use App\Models\Format;
use App\Models\FormatLangue;
use App\Models\Produit;
use App\Models\ProduitLangue;
use App\Models\TarifLivraison;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;


class ProduitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        //$produits = Produit::with('description', 'allFormats')->get();
        $tarifs = TarifLivraison::all();
        $formats = Format::all();
        $langFormats = FormatLangue::all();
        $categories = Produit::all();
      /*  dump($produits);
        dump($formats);
        dump($prodDesc);
        dump($langFormats);*/


        return Inertia::render('Menu', [
            'formats' => $formats,
            'langFormats' => $langFormats,
            'tarifs' => $tarifs,
            'produits' => ProduitRessource::collection(Produit::all()),
            'categories' => $categories,
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
        dd($request);
        //$produits = $request;

        /*$rules = [
            'prenom' => 'required|max:64|regex:/^[A-ZÀ-Ü][a-zà-ù-]+$/',
            'nom' => 'required|max:64|regex:/^[A-ZÀ-Ü][a-zà-ù-]+$/',
            'telephone' => 'nullable|numeric|digits:10'
        ];

        $messages = [
            'nom.required' => 'Veuillez entrer un nom de famille.',
            'nom.max' => 'Le nom de famille ne peut pas dépasser 64 caractères.',
            'nom.regex' => 'Le format du nom de famille entré est invalide.',

            'prenom.required' => 'Veuillez entrer un prénom.',
            'prenom.max' => 'Le prénom ne peut pas dépasser 64 caractères.',
            'prenom.regex' => 'Le format du prénom entré est invalide.',

            'telephone.digits' => 'Le numéro de téléphone doit contenir 10 chiffres.',
            'telephone.numeric' => 'Le numéro de téléphone doit contenir 10 chiffres.'
        ];

        if($client->email != $request->email)
        {
            $messages['email.required'] = 'Veuillez entrer un courriel.';
            $messages['email.email'] = 'Veuillez entrer un courriel valide.';
            $messages['email.regex'] = 'Le format du courriel entré est invalide.';
            $messages['email.unique'] = 'Le courriel appartient déjà à un autre client.';
        }

        $validation = Validator::make($request->all(), $rules, $messages);

        if ($validation->fails())
            return back()->withErrors($validation->errors())->withInput();

        $client->nom = $request->nom;
        $client->prenom = $request->prenom;
        $client->email = $request->email;
        $client->telephone = $request->telephone;

        $client->save();

        return redirect("/menu" . $request->page);*/
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Produit $produit)
    {
        //
    }
}
