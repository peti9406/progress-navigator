<?php

namespace Database\Factories;

use App\Models\Goal;
use App\Models\Step;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Step>
 */
class StepFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'goal_id' => Goal::factory(),
            'step' => $this->faker->sentence(4),
        ];
    }
}
