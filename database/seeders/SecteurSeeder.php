<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class SecteurSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('secteur')->insert([
            ['nom' => 'Fleurimont'],
            ['nom' => 'Sherbrooke'],
            ['nom' => 'Rock Forest'],
        ]);
    }
}
