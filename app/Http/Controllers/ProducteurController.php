<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\Producteur;
use App\Models\ProducteurLangue;
use App\Http\Resources\ProducteurResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $file = $request->file('img');
        $imageName = $file ? $file->getClientOriginalName() : "default.jpg";

        if($imageName != "default.jpg" && Image::where('nom_fichier', $imageName)->exists()) {
            return back()->withErrors("Ce nom de fichier existe déjà dans la liste d'images.");
        }

        if($imageName != "default.jpg")
            $file->move(public_path('/img'), $imageName);

        $lastInsertedId = DB::table('image')->insertGetId([
            'nom_fichier' => $imageName,
            'vitrine' => 0,
            'saisonnier' => 0
        ]);

        $producteur = Producteur::create([
            'nom' => $request->nom,
            'url' => $request->has('url') ? $request->url : null,
            'adresse' => $request->adresse,
            'id_image' => $lastInsertedId
        ]);

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

        return back();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $file = $request->file('img');
        $imageName = $file ? $file->getClientOriginalName() : "default.jpg";

        if($imageName != "default.jpg" && Image::where('nom_fichier', $imageName)->exists()) {
            return back()->withErrors("Ce nom de fichier existe déjà dans la liste d'images.");
        }

        if($imageName != "default.jpg")
            $file->move(public_path('/img'), $imageName);

        $producteur = Producteur::find($request->id);

        $lastInsertedId = 1;        //default.jpg

        if(Image::where('nom_fichier', $imageName)->exists()) {
            $image = Image::where('nom_fichier', $imageName)->first();

            $lastInsertedId = $image->id;
        } else {
            $lastInsertedId = DB::table('image')->insertGetId([
                'nom_fichier' => $imageName,
                'vitrine' => 0,
                'saisonnier' => 0
            ]);

            $image = Image::find($producteur->id_image);

            //Suppression de l'ancienne image associée au producteur
            if($image->nom_fichier != "default.jpg") {
                $image->delete();

                unlink(public_path('/img/' . $image->nom_fichier));
            }
        }


        $producteur->nom = $request->nom;
        $producteur->url = $request->has('url') ? $request->url : null;
        $producteur->adresse = $request->adresse;
        $producteur->id_image = $lastInsertedId;

        $producteur->save();

        $descriptionFR = ProducteurLangue::where('id_producteur', $producteur->id)->where('id_langue', 1)->first();

        $descriptionFR->description = $request->descriptionFR;

        $descriptionFR->save();

        $descriptionEN = ProducteurLangue::where('id_producteur', $producteur->id)->where('id_langue', 2)->first();

        $descriptionEN->description = $request->descriptionEN;

        $descriptionEN->save();

        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $producteur = Producteur::find($request->id);

        $image = Image::find($producteur->id_image);

        //Suppression de l'image associée au producteur
        if($image->nom_fichier != "default.jpg") {
            $image->delete();

            unlink(public_path('/img/' . $image->nom_fichier));
        }

        $descriptionFR = ProducteurLangue::where('id_producteur', $producteur->id)->where('id_langue', 1)->first();

        $descriptionFR->delete();

        $descriptionEN = ProducteurLangue::where('id_producteur', $producteur->id)->where('id_langue', 2)->first();

        $descriptionEN->delete();

        $producteur->delete();

        return back();
    }
}
