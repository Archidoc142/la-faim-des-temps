<?php

namespace App\Http\Controllers;

use App\Models\Adresse;
use App\Models\SecteurCode;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdresseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        $rules = [
            'no_civique' => 'required|regex:/^[0-9]*$/',
            'rue' => 'required|max:128',
            'appartement' => 'nullable|regex:/^[0-9]*$/',
            'code_postal' => 'required|min:7'
        ];

        $messages = [
            'no_civique.required' => 'Veuillez entrer un numéro civique.',
            'no_civique.regex' => 'Le format du numéro civique entré est invalide.',

            'rue.required' => 'Veuillez entrer un nom de rue.',
            'rue.max' => 'Le nom de la rue ne peut pas dépasser 128 caractères.',

            'appartement.regex' => 'Le format du numéro d\'appartement entré est invalide.',

            'code_postal.required' => 'Veuillez entrer un code postal.',
            'code_postal.min' => 'Le code postal doit contenir 6 caractères.'
        ];

        $validation = Validator::make($request->all(), $rules, $messages);

        if ($validation->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validation->errors()
            ], 400);
        } else {
            $inputs = $validation->validated();

            $code = substr($inputs['code_postal'], 0, 3);
            $id_secteur_code = SecteurCode::where('code', $code)->value('id');
            $id_secteur = SecteurCode::where('code', $code)->value('id_secteur');

            if ($id_secteur_code == null) {
                return response()->json([
                    'success' => false,
                    'errors' => ['code_postal' => "Le code postal rentré n'est pas dans la zone de livraison."]
                ], 400);
            }

            $adresse = Adresse::create([
                'no_civique' => $inputs['no_civique'],
                'rue' => $inputs['rue'],
                'appartement' => $inputs['appartement'],
                'code_postal' => $inputs['code_postal'],
                'id_secteur_code' => $id_secteur_code,
                'visible' => true,
            ]);

            $montant = ($id_secteur == 3) ? 7 : 10;

            return response()->json([
                'success' => true,
                'adresse' => [
                    'id' => $adresse->id,
                    'nom' => $adresse->rue,
                    'montant' => $montant,
                    'code_postal' => $adresse->code_postal,
                ],
            ]);
        }

    }

    /**
     * Display the specified resource.
     */
    public function show(Adresse $adresse)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Adresse $adresse)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Adresse $adresse)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        $adresse = Adresse::find($id);
        $adresse->visible = false;
        $adresse->save();
    }
}
