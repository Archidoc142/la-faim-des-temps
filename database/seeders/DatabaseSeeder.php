<?php

namespace Database\Seeders;

use App\Models\DateRetour;
use App\Models\SecteurCode;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

      /*  User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);
*/

        $this->call([
            RoleSeeder::class,
            AdminSeeder::class,
            SaisonSeeder::class,
            //ImageSeeder::class,
            //ImageSaisonSeeder::class,
            //ProducteurSeeder::class,
            LangueSeeder::class,
            FormatSeeder::class,
            FormatLangueSeeder::class,
            ProduitSeeder::class,
            ProduitLangueSeeder::class,
            EtatCommandeSeeder::class,
            HoraireOuvertureSeeder::class,
            TarifLivraisonSeeder::class,
            SecteurSeeder::class,
            SecteurCodeSeeder::class,
            ProduitFormatSeeder::class,
            //AdresseSeeder::class,
            //ClientSeeder::class,
            TypeCommandeSeeder::class,
            //CommandeSeeder::class,
            DateRetourSeeder::class,
            //LegendeLangueSeeder::class,
            //ProducteurLangueSeeder::class
        ]);
    }
}
