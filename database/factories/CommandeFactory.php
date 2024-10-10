<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Commande>
 */
class CommandeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            //Génération de données fictive pour test TODO: les retirer avant production
            'allergenes' => implode(', ', $this->faker->randomElements(['Lait', 'oeuf', 'arachides', 'soja'], rand(0, 4))),
            'livraison' => $this->faker->boolean(),
            'frais_livraison' => $this->faker->randomFloat(2, 0, 10),
            'total' => $this->faker->randomFloat(2, 10, 400),
            'id_adresse' => $this->faker->numberBetween(1, 7),
            'id_utilisateur' => rand(1 , 5),
            'id_etat_commande' => $this->faker->numberBetween(1, 2),
            'created_at' => $this->faker->dateTimeBetween('-1 year', 'now')
        ];
    }
}
