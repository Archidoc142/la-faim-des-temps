<?php

namespace Database\Seeders;

use App\Models\Produit;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProduitFormatSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('produit_format')->insert([
            [
                "id_produit" => 1,
                "id_format" => 1,
            ],
            [
                "id_produit" => 2,
                "id_format" => 2,
            ]
        ]);

        $rows = count(Produit::all());

        for($i = 3; $i <= $rows; $i++)
        {
            DB::table('produit_format')->insert([
                [
                    "id_produit" => $i,
                    "id_format" => 3,
                ],
                [
                    "id_produit" => $i,
                    "id_format" => 4,
                ],
                [
                    "id_produit" => $i,
                    "id_format" => 5,
                ]
            ]);
        }
    }
}
