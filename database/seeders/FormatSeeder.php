<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FormatSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('format')->insert([
            [
                'montant' => '10',
                'nom_interne' => ''
            ],
            [
                'montant' => '15',
                'nom_interne' => ''
            ],
            [
                'montant' => '11',
                'nom_interne' => 'INDI',
            ],
            [
                'montant' => '20',
                'nom_interne' => 'TAT',
            ],
            [
                'montant' => '33',
                'nom_interne' => 'FAM'
            ],
        ]);
    }
}
