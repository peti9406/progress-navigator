<?php

namespace Progression;

use App\Models\Goal;
use App\Models\Step;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CompleteTest extends TestCase
{
    use RefreshDatabase;

    public function test_goal_can_be_completed_when_all_steps_are_completed(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'sanctum');

        $goal = Goal::factory()
            ->has(
                Step::factory()->count(3)->state(['completed' => 1])
            )
            ->create([
                'user_id' => $user->id,
            ]);

        $response = $this->patchJson("/api/goals/{$goal->id}/complete");
        $response
            ->assertStatus(200)
            ->assertJson(['message' => 'Goal completed']);

        $this->assertDatabaseHas('goals', [
            'id' => $goal->id,
            'completed' => 1
        ]);
    }
}
