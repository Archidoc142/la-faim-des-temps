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
            ['nom' => 'Livraison secteur Sherbrooke (<60$)',
             'montant' => 6],

            ['nom' => 'Livraison secteur Fleurimont et Rock Forest',
             'montant' => 10],

            ['nom' => 'Soupe',
             'montant' => 10],

            ['nom' => 'Plat du chef',
             'montant' => 15],

            ['nom' => 'Format individuel',
             'montant' => 11],

            ['nom' => 'Format tête-à-tête',
             'montant' => 20],

            ['nom' => 'Format familial',
             'montant' => 33],
        ]);
    }
}
