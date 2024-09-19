<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Producteur>
 */
class ProducteurFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nom' => $this->faker->name(),
            'adresse' => $this->faker->address(),
            'url' => $this->faker->url(),
            'id_image' => $this->faker->numberBetween(1, 5)
        ];
    }
}
