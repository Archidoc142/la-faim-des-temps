<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FormatController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //dd($request);

        $lastInsertedId = DB::table('format')->insertGetId([
            'montant' => $request->montant,
        ]);

        // Insertion du nom et de la description du format en français
        DB::table('format_langue')->insert([
            'id_format' => $lastInsertedId,
            'id_langue' => 1,
            'nom' => $request->nomFR,
            'description' => $request->descriptionFR
        ]);

        // Insertion du nom et de la description du format en anglais
        DB::table('format_langue')->insert([
            'id_format' => $lastInsertedId,
            'id_langue' => 2,
            'nom' => $request->nomEN,
            'description' => $request->descriptionEN
        ]);

        // Association du format à chaque produit
        $rows = count(DB::table('produit')->get());

        for($i = 3; $i <= $rows; $i++)
        {
            DB::table('produit_format')->insert([
                'id_produit' => $i,
                'id_format' => $lastInsertedId
                ]);
        }
    }
}
