<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FormatLangueSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('FormatLangue')->insert([
            # FRANÇAIS #
            [
                'id_langue' => '1',
                'id_format' => '1',
                'nom' => 'Soupe',
                'description' => 'pour 1 personne'
            ],
            [
                'id_langue' => '1',
                'id_format' => '2',
                'nom' => 'Plat du chef',
                'description' => 'pour 1 personne'
            ],
            [
                'id_langue' => '1',
                'id_format' => '3',
                'nom' => 'Format individuel',
                'description' => 'pour 1 personne'
            ],
            [
                'id_langue' => '1',
                'id_format' => '4',
                'nom' => 'Format tête-à-tête',
                'description' => 'pour 2 personnes'
            ],
            [
                'id_langue' => '1',
                'id_format' => '5',
                'nom' => 'Format familial',
                'description' => 'pour 4 personnes'
            ],

            # ENGLISH #
            [
                'id_langue' => '2',
                'id_format' => '1',
                'nom' => 'Soup',
                'description' => 'for 1 person'
            ],
            [
                'id_langue' => '2',
                'id_format' => '2',
                'nom' => 'Chef\'s plate',
                'description' => 'for 1 person'
            ],
            [
                'id_langue' => '2',
                'id_format' => '3',
                'nom' => 'Individual format',
                'description' => 'for 1 person'
            ],
            [
                'id_langue' => '2',
                'id_format' => '4',
                'nom' => 'One-on-one format',
                'description' => 'for 2 people'
            ],
            [
                'id_langue' => '2',
                'id_format' => '5',
                'nom' => 'Family format',
                'description' => 'for 4 people'
            ],
        ]);
    }
}
