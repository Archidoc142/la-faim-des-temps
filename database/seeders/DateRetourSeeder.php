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
                'nom' => 'date_debut_ven',
                'date' => null
                //'date' => Carbon::create('2000', '01', '01')
            ],
            [
                'id' => 3,
                'nom' => 'date_fin_lun',
                'date' => null
                //'date' => Carbon::create('2000', '01', '01')
            ],
        ]);
    }
}
