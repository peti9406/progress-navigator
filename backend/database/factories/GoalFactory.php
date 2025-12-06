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

    public function configure(): Factory|GoalFactory
    {
        return $this->afterCreating(function (Goal $goal) {
            Step::factory(random_int(4, 12))->create([
                'goal_id' => $goal->id
            ]);
        });
    }
}
