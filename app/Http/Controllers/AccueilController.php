<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\CommentaireResource;
use App\Http\Resources\ImageAccueilResource;
use App\Models\Commentaire;
use App\Models\Image;
use App\Models\QBToken;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AccueilController extends Controller
{
    public function accueil()
    {
        $exists = QBToken::exists();

        /* Commentaires */
        $commentaires = CommentaireResource::collection(
            Commentaire::where('masque', true)
            ->whereNotNull('commentaire')
            ->limit(10)
            ->get());

        /* Images */
        $saison_actuelle = $this->getSaison();
        $images = Image::where('vitrine', true)
                 ->orWhere('saisonnier', true)
                 ->get();

        $filtered_images = $images->filter(function($image) use ($saison_actuelle) {
            return $image->vitrine || !is_null($image->saison($saison_actuelle));
        });
        $imagesResource = ImageAccueilResource::collection($filtered_images);

        return Inertia::render('Accueil', [
            'commentaires' => $commentaires,
            'images' => $imagesResource,
            'qbExists' => $exists
        ]);
    }

    public function getSaison() {
        $SeasonDates = array('/12/21'=> 2, // Hiver
                             '/09/21'=> 1, // Automne
                             '/06/21'=> 4, // Été
                             '/03/21'=> 3, // Printemps
                             '/01/01'=> 2);// Hiver

        foreach ($SeasonDates AS $key => $value) {
            $SeasonDate = date("Y").$key;

            if (strtotime("now") >= strtotime($SeasonDate)) {
                return $value;
            }
        }
    }
}
