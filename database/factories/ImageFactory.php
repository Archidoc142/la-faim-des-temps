<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Image>
 */
class ImageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        //Génération de données fictive pour test TODO: les retirer avant production
        return [
            'nom_fichier' => $this->faker->word().'.png',
            'legende' => $this->faker->sentence(),
            'vitrine' => $this->faker->boolean(),
            'saisonnier' => $this->faker->boolean()
        ];
    }
}
