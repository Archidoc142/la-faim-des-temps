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
            /*[
                'id' => 1,
                'montant' => '10'
            ],
            [
                'id' => 2,
                'montant' => '15'
            ],
            [
                'id' => 3,
                'montant' => '11'
            ],
            [
                'id' => 4,
                'montant' => '20'
            ],
            [
                'id' => 5,
                'montant' => '33'
            ],*/

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
