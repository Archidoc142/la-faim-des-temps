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
        DB::table('HoraireOuverture')->insert([
            ['jour' => 'Lundi',
             'ouvert' => false,
             'heure_ouverture' => NULL,
             'heure_fermeture' => NULL],

            ['jour' => 'Mardi',
             'ouvert' => false,
             'heure_ouverture' => NULL,
             'heure_fermeture' => NULL],

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
             'ouvert' => false,
             'heure_ouverture' => NULL,
             'heure_fermeture' => NULL],

            ['jour' => 'Dimanche',
             'ouvert' => false,
             'heure_ouverture' => NULL,
             'heure_fermeture' => NULL],
        ]);
    }
}
