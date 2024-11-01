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
use Illuminate\Support\Facades\Storage;

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

        if ($request['imgExists']) {
            //dd($request->descriptionFr);
            /* MODIFIER UNE IMAGE */
            //il faudrait garder le nom de l'ancienne image pour le supprimer du dossier public/img du projet
            //dd("modifier", $request, $request->file('img'));

            $image = Image::find($request->imgId);

            if(!is_null($request->file('img')))
            {
                $file = $request->file('img');

                File::delete(public_path('img/' . $image->nom_fichier));

                $image->nom_fichier = $file->getClientOriginalName();
                $file->move(public_path('/img'), $image->nom_fichier);
            }

            $image->langues()->updateExistingPivot(1, ["legende" => $request->descriptionFr]);
            $image->langues()->updateExistingPivot(2, ["legende" => $request->descriptionEn]);

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

            $rules = [
                'descriptionFr' => 'required',
                'descriptionEn' => 'required',
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

            $file = $request->file('img');
            $imageName = $file->getClientOriginalName();
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

    /**
     * Display the specified resource.
     */
    public function show(image $image)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(image $image)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, image $image)
    {
        //
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
