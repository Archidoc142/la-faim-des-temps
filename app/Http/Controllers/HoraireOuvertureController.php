<?php

namespace App\Http\Controllers;

use App\Models\HoraireOuverture;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class HoraireOuvertureController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $horaire = HoraireOuverture::all();

        return Inertia::render('Admin/Horaire', [
            'horaire' => $horaire
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
    public function show(HoraireOuverture $HoraireOuverture)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(HoraireOuverture $HoraireOuverture)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $date = HoraireOuverture::find($request->input('id'));

        $rules = [
            'heure_ouverture' => ['required', 'regex:/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/'],
            'heure_fermeture' => ['required', 'regex:/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/'],
        ];

        $messages = [
            'heure_ouverture.required' => 'Veuillez entrer une heure d\'ouverture.',
            'heure_ouverture.regex' => 'Le format de l\'heure d\'ouverture entré est invalide.',
            'heure_fermeture.required' => 'Veuillez entrer une heure de fermeture.',
            'heure_fermeture.regex' => 'Le format de l\'heure de fermeture entré est invalide.',
        ];

        $validation = Validator::make($request->all(), $rules, $messages);

        if ($validation->fails()) {
            return back()->withErrors($validation->errors())->withInput();
        }

        $date->heure_ouverture = $request->input('heure_ouverture');
        $date->heure_fermeture = $request->input('heure_fermeture');

        $date->save();

        return redirect()->back();
    }

    /**
     * Update the specified resource in storage.
     */
    public function toggle(int $id)
    {
        $date = HoraireOuverture::find($id);
        $date->ouvert = !$date->ouvert;
        $date->save();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(HoraireOuverture $HoraireOuverture)
    {
        //
    }
}
