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
                "id_secteur_code" => 1,
                "visible" => true
            ],
            [
                "no_civique" => 475,
                "rue" => "Du cégep",
                "appartement" => null,
                "code_postal" => "J1E 4K1",
                "id_secteur_code" => 1,
                "visible" => true
            ],
            [
                "no_civique" => 6,
                "rue" => "Fernand",
                "appartement" => null,
                "code_postal" => "J1N 1H1",
                "id_secteur_code" => 7,
                "visible" => true
            ],
            [
                "no_civique" => 123,
                "rue" => "Avenue des Bois",
                "appartement" => null,
                "code_postal" => "J1L 2Y3", // précédemment J1X, qui est un code de Magog...
                "id_secteur_code" => 3,
                "visible" => true
            ],
            [
                "no_civique" => 45,
                "rue" => "Boulevard des Érables",
                "appartement" => 101,
                "code_postal" => "J1K 4R5",
                "id_secteur_code" => 2,
                "visible" => true
            ],
            [
                "no_civique" => 88,
                "rue" => "Rue de l'Acadie",
                "appartement" => null,
                "code_postal" => "J1H 5B2",
                "id_secteur_code" => 5,
                "visible" => true
            ],
            [
                "no_civique" => 232,
                "rue" => "Chemin du Lac",
                "appartement" => null,
                "code_postal" => "J1N 3G4",
                "id_secteur_code" => 4,
                "visible" => true
            ]
        ]);
    }
}
