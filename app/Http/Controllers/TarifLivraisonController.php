<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TarifLivraison;
use App\Models\Format;
use App\Http\Resources\TarifLivraisonResource;
use App\Http\Resources\FormatResource;
use Inertia\Inertia;

class TarifLivraisonController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Tarifs', [
            'tarifs' => TarifLivraisonResource::collection(TarifLivraison::all()),
            'formats' => FormatResource::collection(Format::all())
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateTarif(Request $request)
    {
        $tarif = TarifLivraison::find($request->input('idIndex'));
        $tarif->montant = $request->input('montant');
        $tarif->save();
    }

    /**
     * Update the specified resource in storage.
     */
    public function updateFormat(Request $request)
    {
        $format = Format::find($request->input('idIndex'));
        $format->montant = $request->input('montant');
        $format->save();
    }
}
