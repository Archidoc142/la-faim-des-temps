<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Image;
use App\Models\Saison;

class ImageSaisonSeeder extends Seeder
{
    public function run()
    {
        // Retrieve all images and saisons
        $images = Image::all();
        $saisons = Saison::all();

        // Attach random saisons to each image
        foreach ($images as $image) {
            // Attach 1 to 3 random saisons for each image
            $image->saisons()->attach(
                $saisons->random(rand(1, 3))->pluck('id')->toArray()
            );
        }
    }
}
