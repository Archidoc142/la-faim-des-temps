<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Tarif;
use App\Models\Format;
use App\Http\Resources\TarifResource;
use Inertia\Inertia;

class TarifController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('Admin/Tarifs', [
            'tarifs' => TarifResource::collection(Tarif::all())
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
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $tarif = Tarif::find($request->input('id'));
        $tarif->montant = $request->input('montant');
        $tarif->save();

        if ($request->input('id') > 2) {
            $format = Format::find($request->input('id') - 2);
            $format->montant = $request->input('montant');
            $format->save();
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
