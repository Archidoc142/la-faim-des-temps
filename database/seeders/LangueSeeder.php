<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LangueSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('langue')->insert([
            [
                'code' => 'fr',
                'nom' => 'Français',
            ],
            [
                'code' => 'en',
                'nom' => 'English',
            ]
        ]);
    }
}
