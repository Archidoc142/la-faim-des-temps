<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                "nom" => "Pelletier",
                "prenom" => "Yannick",
                "email" => "admin@lafaimdestemps.ca",
                "password" => Hash::make("admin"), // temporaire
                "id_role" => 2,
                "type" => 0
            ]
        ]);
    }
}
