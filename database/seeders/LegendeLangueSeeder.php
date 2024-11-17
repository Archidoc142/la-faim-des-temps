<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LegendeLangueSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('legende_langue')->insert([
            /* FRANÇAIS */
            [
                'id_langue' => '1',
                'id_image' => '1',
                'legende' => 'Une définition pour l\'image default'
            ],
            [
                'id_langue' => '1',
                'id_image' => '2',
                'legende' => 'Une définition pour l\'image duck'
            ],
            [
                'id_langue' => '1',
                'id_image' => '3',
                'legende' => 'Une définition pour l\'image molestias'
            ],
            [
                'id_langue' => '1',
                'id_image' => '4',
                'legende' => 'Une définition pour l\'image necessitatibus'
            ],

            /* ENGLISH */
            [
                'id_langue' => '2',
                'id_image' => '1',
                'legende' => 'A definition for the image default'
            ],
            [
                'id_langue' => '2',
                'id_image' => '2',
                'legende' => 'A definition for the image duck'
            ],
            [
                'id_langue' => '2',
                'id_image' => '3',
                'legende' => 'A definition for the image molestias'
            ],
            [
                'id_langue' => '2',
                'id_image' => '4',
                'legende' => 'A definition for the image necessitatibus'
            ],
        ]);
    }
}
