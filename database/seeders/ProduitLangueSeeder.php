<?php

namespace Database\Seeders;

use App\Models\Produit;
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
                'id_produit' => '3',
                'description' => 'Mac and cheese description fr'
            ],
            [
                'id_langue' => '1',
                'id_produit' => '4',
                'description' => 'Parmentier description fr'
            ],
            [
                'id_langue' => '1',
                'id_produit' => '5',
                'description' => 'Nouilles au beurre, légume et jambon'
            ],

            [
                'id_langue' => '1',
                'id_produit' => '6',
                'description' => 'Plat de riz description fr'
            ],
            [
                'id_langue' => '1',
                'id_produit' => '7',
                'description' => 'Plat de saucisses description fr'
            ],

            [
                'id_langue' => '1',
                'id_produit' => '8',
                'description' => 'Pizza végé aux pois-chiches, épinard et feta'
            ],
            [
                'id_langue' => '1',
                'id_produit' => '9',
                'description' => 'Plat couscous description fr'
            ],

            [
                'id_langue' => '1',
                'id_produit' => '10',
                'description' => 'Médaillons de porc sauce aux petits fruits nordiques sur riz aux légumes'
            ],
            [
                'id_langue' => '1',
                'id_produit' => '11',
                'description' => 'Mijoté boeuf description fr'
            ],
            [
                'id_langue' => '1',
                'id_produit' => '12',
                'description' => 'Mijouté poulet description fr'
            ],
            [
                'id_langue' => '1',
                'id_produit' => '13',
                'description' => 'Poulet en sauce description fr'
            ],

            [
                'id_langue' => '1',
                'id_produit' => '14',
                'description' => 'Rôti de boeuf sauce au poivre sur purée de pommes de terre'
            ],
            [
                'id_langue' => '1',
                'id_produit' => '15',
                'description' => 'Porc en sauce description fr'
            ],
            [
                'id_langue' => '1',
                'id_produit' => '16',
                'description' => 'Plat végétarien description fr'
            ],
        ]);

        DB::table('produit_langue')->insert([
            [
                'id_langue' => '2',
                'id_produit' => '1',
                'description' => 'EN Crème de chou-fleur'
            ],
            [
                'id_langue' => '2',
                'id_produit' => '2',
                'description' => 'EN Pâtes fraîches façon carbonara aux oeufs de canard et prosciutto'
            ],

            [
                'id_langue' => '2',
                'id_produit' => '3',
                'description' => 'Mac and cheese description en'
            ],
            [
                'id_langue' => '2',
                'id_produit' => '4',
                'description' => 'Parmentier description en'
            ],
            [
                'id_langue' => '2',
                'id_produit' => '5',
                'description' => 'EN Nouilles au beurre, légume et jambon'
            ],

            [
                'id_langue' => '2',
                'id_produit' => '6',
                'description' => 'Plat de riz description en'
            ],
            [
                'id_langue' => '2',
                'id_produit' => '7',
                'description' => 'Plat de saucisses description en'
            ],

            [
                'id_langue' => '2',
                'id_produit' => '8',
                'description' => 'EN Pizza végé aux pois-chiches, épinard et feta'
            ],
            [
                'id_langue' => '2',
                'id_produit' => '9',
                'description' => 'Plat couscous description en'
            ],

            [
                'id_langue' => '2',
                'id_produit' => '10',
                'description' => 'EN Médaillons de porc sauce aux petits fruits nordiques sur riz aux légumes'
            ],
            [
                'id_langue' => '2',
                'id_produit' => '11',
                'description' => 'Mijoté boeuf description en'
            ],
            [
                'id_langue' => '2',
                'id_produit' => '12',
                'description' => 'Mijouté poulet description en'
            ],
            [
                'id_langue' => '2',
                'id_produit' => '13',
                'description' => 'Poulet en sauce description en'
            ],

            [
                'id_langue' => '2',
                'id_produit' => '14',
                'description' => 'EN Rôti de boeuf sauce au poivre sur purée de pommes de terre'
            ],
            [
                'id_langue' => '2',
                'id_produit' => '15',
                'description' => 'EN Porc en sauce description en'
            ],
            [
                'id_langue' => '2',
                'id_produit' => '16',
                'description' => 'EN plat végétarien description en'
            ],
        ]);

        /*
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
                'id_produit' => '10',
                'description' => 'Médaillons de porc sauce aux petits fruits nordiques sur riz aux légumes'
            ],
            [
                'id_langue' => '1',
                'id_produit' => '5',
                'description' => 'Nouilles au beurre, légume et jambon'
            ],
            [
                'id_langue' => '1',
                'id_produit' => '14',
                'description' => 'Rôti de boeuf sauce au poivre sur purée de pommes de terre'
            ],
            [
                'id_langue' => '1',
                'id_produit' => '8',
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
                'id_produit' => '10',
                'description' => 'Pork medallions with Nordic berry sauce on vegetable rice'
            ],
            [
                'id_langue' => '2',
                'id_produit' => '5',
                'description' => 'Buttered noodles with vegetables and ham'
            ],
            [
                'id_langue' => '2',
                'id_produit' => '14',
                'description' => 'Roast beef with pepper sauce on mashed potatoes'
            ],
            [
                'id_langue' => '2',
                'id_produit' => '8',
                'description' => 'Veggie pizza with chickpeas, spinach and feta'
            ],


        ]);*/
    }
}
