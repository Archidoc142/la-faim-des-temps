<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DateRetourSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('dates_menu')->insert([
            [
                'id' => 1,
                'nom' => 'date_retour',
                'date' => null
                //'date' => Carbon::create('2000', '01', '01')
            ],
            [
                'id' => 2,
                'nom' => 'actif_ven',
                'date' => Carbon::parse('last friday')
            ],
            [
                'id' => 3,
                'nom' => 'actif_lun',
                'date' => Carbon::parse('last monday')
            ],
            [
                'id' => 4,
                'nom' => 'prochain_ven',
                'date' => Carbon::parse('this friday')
            ],
            [
                'id' => 5,
                'nom' => 'prochain_lun',
                'date' => Carbon::parse('this monday')
            ],
        ]);
    }
}
