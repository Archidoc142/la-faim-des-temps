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
                'legende' => 'default image',
                'vitrine' => 0,
                'saisonnier' => 0
            ],
            [
                'nom_fichier' => 'duck.jpg',
                'legende' => 'Canard du lac brome',
                'vitrine' => 0,
                'saisonnier' => 0
            ]
        ]);

        Image::factory(3)->create();
    }
}
