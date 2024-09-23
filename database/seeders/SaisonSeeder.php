<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class SaisonSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('saison')->insert([
            ['nom' => 'Automne'],
            ['nom' => 'Hiver'],
            ['nom' => 'Printemps'],
            ['nom' => 'Été']
        ]);
    }
}
