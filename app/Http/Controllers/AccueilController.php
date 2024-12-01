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
                 ->get();

        $filtered_images = $images->filter(function ($image) use ($saison_actuelle) {
            return !$image->saisonnier || !is_null($image->saison($saison_actuelle));
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
        $imagesBD = Image::where('vitrine', true)
            ->get();

        $saison_actuelle = $this->getSaison();

        $images = $imagesBD->filter(function ($image) use ($saison_actuelle) {
            return !$image->saisonnier || !is_null($image->saison($saison_actuelle));
        });

        $imgV = [];
        $imgH = [];

        // J'ai eu une erreur d'index dans ce code en ouvrant la page d'accueil une fois,
        // donc j'ai remplacé for par foreach
        foreach ($images as $i => $image) {
            if ($this->is_horizontal($image['nom_fichier']))
                array_push($imgH, $i);
            else
                array_push($imgV, $i);
        }

        if (count($imgV) > 0) {
            $ids[0] = $imgV[rand(0, (count($imgV) - 1))];
        } else {
            $ids[0] = null;
        }

        if (count($imgV) > 1) {
            do {
                $ids[1] = $imgV[rand(0, (count($imgV) - 1))];
            } while ($ids[1] == $ids[0]);
        } else {
            $ids[1] = null;
        }

        if (count($imgH) > 0) {
            $ids[2] = $imgH[rand(0, (count($imgH) - 1))];
        } else {
            $ids[2] = null;
        }

        return $ids;
    }

    public function is_horizontal($nom_fichier)
    {
        if (function_exists('exif_read_data')) {
            $exif = @exif_read_data(public_path('img/' . $nom_fichier), 'IFD0');

            if ($exif && $exif['Orientation'] == 8 || $exif && $exif['Orientation'] == 6) {
                list($height, $width, $type, $attr) = getimagesize(public_path('img/' . $nom_fichier));
            } else {
                list($width, $height, $type, $attr) = getimagesize(public_path('img/' . $nom_fichier));
            }

            return $width > $height;
        }
    }
}
