<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProduitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('produits')->insert([
            [
                'nom' => 'Soupe',
                'dansMenu' => true
            ],
            [
                'nom' => 'Plat du chef',
                'dansMenu' => true
            ],
            [
                'nom' => 'Mac and cheese',
                'dansMenu' => false
            ],
            [
                'nom' => 'Parmentier',
                'dansMenu' => false
            ],
            [
                'nom' => 'Plat de pâtes',
                'dansMenu' => false
            ],
            [
                'nom' => 'Plat de riz',
                'dansMenu' => false
            ],
            [
                'nom' => 'Plat de saucisses',
                'dansMenu' => false
            ],
            [
                'nom' => 'Pizza',
                'dansMenu' => false
            ],
            [
                'nom' => 'Plat de couscous',
                'dansMenu' => false
            ],
            [
                'nom' => 'Mijoté de porc',
                'dansMenu' => false
            ],
            [
                'nom' => 'Mijoté de bœuf',
                'dansMenu' => false
            ],
            [
                'nom' => 'Mijoté de poulet',
                'dansMenu' => false
            ],
            [
                'nom' => 'Poulet en sauce',
                'dansMenu' => false
            ],
            [
                'nom' => 'Bœuf en sauce',
                'dansMenu' => false
            ],
            [
                'nom' => 'Porc en sauce',
                'dansMenu' => false
            ],
        ]);
    }
}
