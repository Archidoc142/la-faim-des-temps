<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProducteurLangueSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for ($i = 1; $i <= 10; $i++) {
            DB::table('producteur_langue')->insert([
                'id_producteur' => $i,
                'id_langue' => 1,
                'description' => 'Description en français pour producteur ' . $i,
            ]);

            DB::table('producteur_langue')->insert([
                'id_producteur' => $i,
                'id_langue' => 2,
                'description' => 'Description in English for producer ' . $i,
            ]);
        }
    }
}
