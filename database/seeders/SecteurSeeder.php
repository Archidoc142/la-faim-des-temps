<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class SecteurSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('secteur')->insert([
            ['nom' => 'Fleurimont', 'id_tarif_livraison' => 2],
            ['nom' => 'Sherbrooke', 'id_tarif_livraison' => 1],
            ['nom' => 'Rock Forest', 'id_tarif_livraison' => 2],
        ]);
    }
}
