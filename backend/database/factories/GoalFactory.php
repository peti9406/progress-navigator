<?php

namespace Database\Factories;

use App\Models\Goal;
use App\Models\Step;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Goal>
 */
class GoalFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => 1,
            'goal' => $this->faker->word(),
            'deadline' => $this->faker->date(),
        ];
    }

    public function withSteps(int $count = 3): static
    {
        return $this->has(
            Step::factory()->count($count)
        );
    }
}
