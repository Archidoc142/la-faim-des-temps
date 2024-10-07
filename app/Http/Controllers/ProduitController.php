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
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use PhpParser\Node\Expr\Cast\Object_;

class ProduitController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tarifs = TarifLivraison::all();
        $formats = Format::all();
        $langFormats = FormatLangue::all();
        $categories = Produit::all();

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
        $menu_pre_changement = DB::table('produit')->where('dansMenu', true)->get();
        $nouveau_menu = [];
        $all_categories = [];

        $req = $request->request;


        for ($i=0; $i < sizeof($req); $i++) {
            array_push($all_categories, $request->input($i)["id"]);
        }

        if(count($request->request) !== count(array_unique($all_categories)))
            return back()->withErrors("Une ou plusieurs catégories sont séléctionnées plus d'une fois.");

        //Validation de tous les champs pour chaque produit du JSON
        for ($i = 0; $i < sizeof($req); $i++) {
            $r_prod = $request->input($i);

            $rules = [
                'id' => 'required',
                'fr' => 'required|max:255',
                'en' => 'required|max:255'
            ];

            $messages = [
                'id.required' => 'Erreur : L\'id d\'un produit n\'a pas été envoyé.',

                'fr.required' => 'Une description française est manquante.',
                'fr.max' => 'Une description française dépasse les 255 caractères maximums.',
              //  'fr.regex' => 'Une description française est invalide. (Doit commencer par une majuscule et ne contenir que des lettres)',

                'en.required' => 'Une description anglaise est manquante.',
                'en.max' => 'Une description anglaise dépasse les 255 caractères maximums.',
              //  'en.regex' => 'Une description anglaise est invalide. (Doit commencer par une majuscule et ne contenir que des lettres)'
            ];

            $validation = Validator::make($r_prod, $rules, $messages);

            if ($validation->fails())
                return back()->withErrors($validation->errors())->withInput();
        }

       /* if ($validation->fails())
            return back()->withErrors($validation->errors())->withInput();
        if ($validation->fails())
            return back()->withErrors($validation->errors())->withInput();*/


        //Modification de la BD après avoir vérifier les champs
        for ($i = 0; $i < sizeof($req); $i++) {
            $r_prod = $request->input($i);

            //mettre le produit dans le menu
            DB::table("produit")
                ->where('id', $r_prod["id"])
                ->update(['dansMenu' => 1]);

            array_push($nouveau_menu, $r_prod["id"]);

            //modifier le produit en français
            DB::table("produit_langue")
                ->where(
                    [
                        ["id_produit", "=", $r_prod["id"]],
                        ['id_langue', "=", "1"]
                    ]
                )
                ->update([
                    'id_produit' => $r_prod["id"],
                    'description' => $r_prod["fr"]
                ]);

            //modifier le produit en anglais
            DB::table("produit_langue")
                ->where([
                    ["id_produit", "=", $r_prod["id"]],
                    ['id_langue', "=", "2"]
                ])
                ->update([
                    'id_produit' => $r_prod["id"],
                    'description' => $r_prod["en"]
                ]);
        }

        // enlever du menu les produits de trop
        for ($i = 0; $i < sizeof($menu_pre_changement); $i++) {
            if (!in_array($menu_pre_changement[$i]->id, $nouveau_menu)) {
                DB::table('produit')
                    ->where('id', $menu_pre_changement[$i]->id)
                    ->update(['dansMenu' => 0]);
            }
        }

        return redirect("/menu" . $request->page);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Produit $produit)
    {
        //
    }
}
