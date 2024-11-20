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
            ['jour_fr' => 'Lundi',
             'jour_en' => 'Monday',
             'ouvert' => false,
             'heure_ouverture' => NULL,
             'heure_fermeture' => NULL],

            ['jour_fr' => 'Mardi',
             'jour_en' => 'Tuesday',
             'ouvert' => false,
             'heure_ouverture' => NULL,
             'heure_fermeture' => NULL],

            ['jour_fr' => 'Mercredi',
             'jour_en' => 'Wednesday',
             'ouvert' => true,
             'heure_ouverture' => '11:00',
             'heure_fermeture' => '15:00'],

            ['jour_fr' => 'Jeudi',
             'jour_en' => 'Thursday',
             'ouvert' => true,
             'heure_ouverture' => '11:00',
             'heure_fermeture' => '15:00'],

            ['jour_fr' => 'Vendredi',
             'jour_en' => 'Friday',
             'ouvert' => true,
             'heure_ouverture' => '11:00',
             'heure_fermeture' => '17:00'],

            ['jour_fr' => 'Samedi',
             'jour_en' => 'Saturday',
             'ouvert' => false,
             'heure_ouverture' => NULL,
             'heure_fermeture' => NULL],

            ['jour_fr' => 'Dimanche',
             'jour_en' => 'Sunday',
             'ouvert' => false,
             'heure_ouverture' => NULL,
             'heure_fermeture' => NULL],
        ]);
    }
}
