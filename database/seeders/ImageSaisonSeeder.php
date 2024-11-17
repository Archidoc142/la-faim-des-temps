<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Image;
use App\Models\Saison;
use Illuminate\Support\Facades\DB;

class ImageSaisonSeeder extends Seeder
{
    public function run()
    {
       /* // Retrieve all images and saisons
        $images = Image::all();
        $saisons = Saison::all();

        // Attach random saisons to each image
        foreach ($images as $image) {
            // Attach 1 to 3 random saisons for each image
            $image->saisons()->attach(
                $saisons->random(rand(1, 3))->pluck('id')->toArray()
            );
        }*/

        DB::table('image_saison')->insert([
            [
                'id_image' => 1,
                'id_saison' => 1,
            ],
            [
                'id_image' => 1,
                'id_saison' => 2,
            ],
            [
                'id_image' => 1,
                'id_saison' => 3,
            ],
            [
                'id_image' => 1,
                'id_saison' => 4,
            ],

            [
                'id_image' => 2,
                'id_saison' => 1,
            ],
            [
                'id_image' => 2,
                'id_saison' => 2,
            ],
            [
                'id_image' => 2,
                'id_saison' => 3,
            ],
            [
                'id_image' => 2,
                'id_saison' => 4,
            ],

            [
                'id_image' => 3,
                'id_saison' => 1,
            ],
            [
                'id_image' => 3,
                'id_saison' => 3,
            ],
            [
                'id_image' => 3,
                'id_saison' => 4,
            ],

            [
                'id_image' => 4,
                'id_saison' => 1,
            ],
            [
                'id_image' => 4,
                'id_saison' => 2,
            ],
            [
                'id_image' => 4,
                'id_saison' => 3,
            ],
            [
                'id_image' => 4,
                'id_saison' => 4,
            ],

            [
                'id_image' => 5,
                'id_saison' => 2,
            ],
            [
                'id_image' => 5,
                'id_saison' => 3,
            ],
        ]);
    }
}
