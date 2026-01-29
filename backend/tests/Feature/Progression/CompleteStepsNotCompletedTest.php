<?php

namespace Progression;

use App\Models\Goal;
use App\Models\Step;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CompleteStepsNotCompletedTest extends TestCase
{
    use RefreshDatabase;

    public function test_complete_goal_fails_when_a_step_is_not_completed(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'sanctum');

        $goal = Goal::factory()
            ->has(
                Step::factory()->count(3)->state(['completed' => 0])
            )
            ->create([
                'user_id' => $user->id
            ]);

        $response = $this->patchJson("/api/goals/{$goal->id}/complete");
        $response
            ->assertStatus(400)
            ->assertJson([
                "message" => "You need to complete the steps first!",
            ]);


        $this->assertDatabaseHas('goals', [
            'id' => $goal->id,
            'completed' => 0
        ]);
    }
}
