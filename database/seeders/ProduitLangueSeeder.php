<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProduitLangueSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('produit_langue')->insert([
            # FRANÇAIS #
            [
                'id_langue' => '1',
                'id_produit' => '1',
                'description' => 'description une soupe'
            ],
            [
                'id_langue' => '1',
                'id_produit' => '2',
                'description' => 'description du plat du chef'
            ],
            [
                'id_langue' => '1',
                'id_produit' => '8',
                'description' => 'description d\'un plat de pizza'
            ],
            [
                'id_langue' => '1',
                'id_produit' => '6',
                'description' => 'description d\'un plat de riz'
            ],
            [
                'id_langue' => '1',
                'id_produit' => '14',
                'description' => 'description d\'un plat de boeuf en sauce'
            ],
            [
                'id_langue' => '1',
                'id_produit' => '3',
                'description' => 'description d\'un plat de mac and cheese'
            ],



            # ENGLISH #
            [
                'id_langue' => '2',
                'id_produit' => '1',
                'description' => 'description of soup'
            ],
            [
                'id_langue' => '2',
                'id_produit' => '2',
                'description' => 'description of the chef\'s dish'
            ],
            [
                'id_langue' => '2',
                'id_produit' => '8',
                'description' => 'description of a pizza dish'
            ],
            [
                'id_langue' => '2',
                'id_produit' => '6',
                'description' => 'description of a rice dish'
            ],
            [
                'id_langue' => '2',
                'id_produit' => '14',
                'description' => 'description of a meat in sauce dish'
            ],
            [
                'id_langue' => '2',
                'id_produit' => '3',
                'description' => 'description of a mac and cheese dish'
            ],


        ]);
    }
}
