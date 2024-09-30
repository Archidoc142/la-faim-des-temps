<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AdresseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('adresse')->insert([
            [
                "no_civique" => 110,
                "rue" => "Saint François Nord",
                "appartement" => 410,
                "code_postal" => "J1E 3H6",
                "id_secteur_code" => 1
            ],
            [
                "no_civique" => 475,
                "rue" => "Du cégep",
                "appartement" => null,
                "code_postal" => "J1E 4K1",
                "id_secteur_code" => 1
            ],
            [
                "no_civique" => 6,
                "rue" => "Fernand",
                "appartement" => null,
                "code_postal" => "J1N 1H1",
                "id_secteur_code" => 7
            ]
        ]);
    }
}
