<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SecteurCodeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('secteur_code')->insert([
            // Fleurimont
            ['code' => 'J1E',
             'id_secteur' => 0],
            ['code' => 'J1G',
             'id_secteur' => 0],

            // Centre-ville
            ['code' => 'J1H',
             'id_secteur' => 1],
            ['code' => 'J1J',
             'id_secteur' => 1],
            ['code' => 'J1K',
             'id_secteur' => 1],
            ['code' => 'J1L',
             'id_secteur' => 1],

            // Rock Forest
            ['code' => 'J1N',
            'id_secteur' => 2],
        ]);
    }
}
