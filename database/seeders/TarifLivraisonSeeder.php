<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class TarifLivraisonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('TarifLivraison')->insert([
            ['nom' => 'Frais de livraison secteur Sherbrooke',
             'montant' => 7],

            ['nom' => 'Frais de livraison secteurs Fleurimont et Rock Forest',
             'montant' => 10],
        ]);
    }
}
