<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class HoraireOuvertureSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('tarif_livraison')->insert([
            ['jour' => 'Lundi',
             'ouvert' => false],

            ['jour' => 'Mardi',
             'ouvert' => false],

            ['jour' => 'Mercredi',
             'ouvert' => true,
             'heure_ouverture' => '11:00',
             'heure_fermeture' => '15:00'],

            ['jour' => 'Jeudi',
             'ouvert' => true,
             'heure_ouverture' => '11:00',
             'heure_fermeture' => '15:00'],

            ['jour' => 'Vendredi',
             'ouvert' => true,
             'heure_ouverture' => '11:00',
             'heure_fermeture' => '17:00'],

            ['jour' => 'Samedi',
             'ouvert' => false],

            ['jour' => 'Dimanche',
             'ouvert' => false],
        ]);
    }
}
