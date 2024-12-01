<?php

namespace App\Http\Controllers;

use App\Http\Resources\ImageResource;
use App\Models\Image;
use App\Models\ImageSaison;
use App\Models\LegendeLangue;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\File;

class ImageController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $res = ImageResource::collection(Image::where("vitrine", 1)->get());

        return Inertia::render('Admin/Images', [
            'res' => $res,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $file = $request->file('img');

        if ($request['imgExists']) {
            /* MODIFIER UNE IMAGE */

            $image = Image::find($request->imgId);

            if(!is_null($request->file('img')))
            {
                File::delete(public_path('img/' . $image->nom_fichier));

                $image->nom_fichier = $file->getClientOriginalName();
                $file->move(public_path('/img'), $image->nom_fichier);
            }

            $formDescriptionsEmpty = is_null($request->descriptionFr) && is_null($request->descriptionFr);

            // si une légende est déjà définie
            if(LegendeLangue::where("id_image", $image->id)->exists())
            {
                // si on supprime la légende (descriptions vides)
                if($formDescriptionsEmpty)
                {
                    LegendeLangue::where("id_image", $image->id)->delete();
                }
                // si c'est une simple mise à jour de la légende
                else
                {
                    $image->langues()->updateExistingPivot(1, ["legende" => $request->descriptionFr]);
                    $image->langues()->updateExistingPivot(2, ["legende" => $request->descriptionEn]);
                }
            }
            else if(!$formDescriptionsEmpty)
            {
                DB::table('legende_langue')->insert([
                    'id_image' => $image->id,
                    'id_langue' => 1,
                    'legende' => $request['descriptionFr'],
                ]);

                DB::table('legende_langue')->insert([
                    'id_image' => $image->id,
                    'id_langue' => 2,
                    'legende' => $request['descriptionEn'],
                ]);
            }

            $image->saisonnier = intval($request->saisonnier);

            if($request->saisons != $image->saisons())
            {
                ImageSaison::where('id_image', $image->id)->delete();

                if($request->saisons == [true, true, true, true])
                {
                    $image->saisonnier = false;
                }

                if($image->saisonnier)
                {
                    for($i = 0; $i < 4; $i++)
                    {
                        if($request->saisons[$i])
                        {
                            ImageSaison::create([
                                'id_image' => $image->id,
                                'id_saison' => $i + 1
                            ]);
                        }
                    }
                }
            }

            $image->save();

        } else {
            /* AJOUTER UNE IMAGE */
            $imageName = $file->getClientOriginalName();

            if(Image::where('nom_fichier', $imageName)->exists()) {
                return back()->withErrors("Ce nom de fichier existe déjà dans la liste d'images.");
            }

            $rules = [
                'saisons' => 'required',
                'saisonnier' => 'required'
            ];

            $messages = [
                'descriptionFr.required' => 'Veuillez entrer une description française pour cette image.',
                'descriptionEn.required' => 'Veuillez entrer une description anglaise pour cette image.',
                'saisons.required' => 'Erreur : Le tableau des saisons n\'a pas été envoyé.',
                'saisonnier.required' => 'Erreur : Le saisonnier n\'a pas été envoyé.'
            ];

            $validation = Validator::make($request->all(), $rules, $messages);

            if ($validation->fails())
                return back()->withErrors($validation->errors())->withInput();

            $file->move(public_path('/img'), $imageName);

            $lastInsertedId = DB::table('image')->insertGetId([
                'nom_fichier' => $imageName,
                'vitrine' => 1,
                'saisonnier' => $request['saisonnier'],
            ]);

            for ($i = 0; $i < count($request['saisons']); $i++) {
                if ($request['saisons'][$i]) {
                    DB::table('image_saison')->insert([
                        'id_image' => $lastInsertedId,
                        'id_saison' => $i + 1,
                    ]);
                }
            }

            $formDescriptionsEmpty = is_null($request->descriptionFr) && is_null($request->descriptionFr);

            if(!$formDescriptionsEmpty)
            {
                /* LÉGENDE FRANÇAISE */
                DB::table('legende_langue')->insert([
                    'id_image' => $lastInsertedId,
                    'id_langue' => 1,
                    'legende' => $request['descriptionFr'],
                ]);

                /* LÉGENDE ANGLAISE */
                DB::table('legende_langue')->insert([
                    'id_image' => $lastInsertedId,
                    'id_langue' => 2,
                    'legende' => $request['descriptionEn'],
                ]);
            }

        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, image $image)
    {
        $id = $request["id"];

        DB::table('legende_langue')->where("id_image", "=", $id)->delete();
        DB::table('image_saison')->where("id_image", "=", $id)->delete();

        $img = Image::find($id);
        File::delete(public_path('img/'.$img->nom_fichier));
        $img->delete();
    }
}
