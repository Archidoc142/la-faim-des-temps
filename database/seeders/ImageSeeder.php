<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Image;

class ImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('image')->insert([
            [
                'nom_fichier' => 'default.jpg',
                'vitrine' => 1,
                'saisonnier' => 0
            ],
            [
                'nom_fichier' => 'duck.jpg',
                'vitrine' => 1,
                'saisonnier' => 0
            ],
            [
                'nom_fichier' => 'molestias.png',
                'vitrine' => 1,
                'saisonnier' => 1
            ],
            [
                'nom_fichier' => 'necessitatibus.png',
                'vitrine' => 1,
                'saisonnier' => 0
            ],
            [
                'nom_fichier' => 'ipsum.png',
                'vitrine' => 1,
                'saisonnier' => 1
            ],
        ]);

        //Image::factory(3)->create();
    }
}
