<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\CommentaireResource;
use App\Http\Resources\ImageAccueilResource;
use App\Models\Commentaire;
use App\Models\Image;
use App\Models\QBToken;
use App\Services\QuickBooksService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AccueilController extends Controller
{
    public function accueil(Request $request)
    {
        $qbValid = null;

        if (!is_null($request->user()) && $request->user()->role->nom == "admin") {
            $quickBooksService = new QuickBooksService();
            $qbValid = $quickBooksService->refreshTokens();
        }

        /* Commentaires */
        $commentaires = CommentaireResource::collection(
            Commentaire::where('masque', true)
                ->whereNotNull('commentaire')
                ->limit(10)
                ->get()
        );

        /* Images */
        $saison_actuelle = $this->getSaison();
        $images = Image::where('vitrine', true)
                 ->where('saisonnier', true)
                 ->get();

        $filtered_images = $images->filter(function ($image) use ($saison_actuelle) {
            return $image->vitrine || !is_null($image->saison($saison_actuelle));
        });
        $imagesResource = ImageAccueilResource::collection($filtered_images);

        return Inertia::render('Accueil', [
            'commentaires' => $commentaires,
            'images' => $imagesResource,
            'qbValid' => $qbValid,
            'idsImgs' => $this->randImg()
        ]);
    }

    public function getSaison()
    {
        $SeasonDates = array(
            '/12/21' => 2, // Hiver
            '/09/21' => 1, // Automne
            '/06/21' => 4, // Été
            '/03/21' => 3, // Printemps
            '/01/01' => 2
        ); // Hiver

        foreach ($SeasonDates as $key => $value) {
            $SeasonDate = date("Y") . $key;

            if (strtotime("now") >= strtotime($SeasonDate)) {
                return $value;
            }
        }
    }

    public function randImg()
    {
        $ids = [];
        $images = Image::where('vitrine', true)
        ->orWhere('saisonnier', true)
        ->get();

        do {
            $ids[0] = rand(0, (count($images) - 1));
        } while ($this->is_horizontal($images[$ids[0]]['nom_fichier']));

        do {
            $ids[1] = rand(0, (count($images) - 1));
        } while ($this->is_horizontal($images[$ids[1]]['nom_fichier']) || $ids[1] == $ids[0]);

        do {
            $ids[2] = rand(0, (count($images) - 1));
        } while (!$this->is_horizontal($images[$ids[2]]['nom_fichier']));

        return $ids;
    }

    public function is_horizontal($nom_fichier)
    {
        if ($nom_fichier != "default.jpg") { //#######################
            $exif = exif_read_data(public_path('img/' . $nom_fichier), 'IFD0');

            if ($exif && $exif['Orientation'] == 8 || $exif && $exif['Orientation'] == 6) {
                list($height, $width, $type, $attr) = getimagesize(public_path('img/' . $nom_fichier));
            } else {
                list($width, $height, $type, $attr) = getimagesize(public_path('img/' . $nom_fichier));
            }

            return $width > $height;
        }
    }
}
