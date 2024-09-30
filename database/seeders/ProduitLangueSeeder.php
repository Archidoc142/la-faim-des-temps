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
                'description' => 'Crème de chou-fleur'
            ],
            [
                'id_langue' => '1',
                'id_produit' => '2',
                'description' => 'Pâtes fraîches façon carbonara aux oeufs de canard et prosciutto'
            ],
            [
                'id_langue' => '1',
                'id_produit' => '8',
                'description' => 'Médaillons de porc sauce aux petits fruits nordiques sur riz aux légumes'
            ],
            [
                'id_langue' => '1',
                'id_produit' => '6',
                'description' => 'Nouilles au beurre, légume et jambon'
            ],
            [
                'id_langue' => '1',
                'id_produit' => '14',
                'description' => 'Rôti de boeuf sauce au poivre sur purée de pommes de terre'
            ],
            [
                'id_langue' => '1',
                'id_produit' => '3',
                'description' => 'Pizza végé aux pois-chiches, épinard et feta'
            ],



            # ENGLISH #
            [
                'id_langue' => '2',
                'id_produit' => '1',
                'description' => 'Cauliflower cream'
            ],
            [
                'id_langue' => '2',
                'id_produit' => '2',
                'description' => 'Fresh carbonara pasta with duck eggs and prosciutto'
            ],
            [
                'id_langue' => '2',
                'id_produit' => '8',
                'description' => 'Pork medallions with Nordic berry sauce on vegetable rice'
            ],
            [
                'id_langue' => '2',
                'id_produit' => '6',
                'description' => 'Buttered noodles with vegetables and ham'
            ],
            [
                'id_langue' => '2',
                'id_produit' => '14',
                'description' => 'Roast beef with pepper sauce on mashed potatoes'
            ],
            [
                'id_langue' => '2',
                'id_produit' => '3',
                'description' => 'Veggie pizza with chickpeas, spinach and feta'
            ],


        ]);
    }
}
