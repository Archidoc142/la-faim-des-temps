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
                'montant' => '10'
            ],
            [
                'montant' => '15'
            ],
            [
                'montant' => '11'
            ],
            [
                'montant' => '20'
            ],
            [
                'montant' => '33'
            ],
        ]);
    }
}
