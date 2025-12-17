<?php

namespace Progression;

use App\Models\Goal;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DeleteTest extends TestCase
{
    use RefreshDatabase;

    public function test_goal_can_be_deleted(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'sanctum');

        $goal = Goal::factory()->create();

        $response = $this->deleteJson("/api/goals/{$goal->id}");
        $response
            ->assertStatus(200)
            ->assertJson(['message' => 'Goal deleted']);

        $this->assertDatabaseMissing('goals', [
            'id' => $goal->id,
        ]);
    }
}
