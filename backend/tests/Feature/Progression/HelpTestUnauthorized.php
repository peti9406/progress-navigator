<?php

namespace Progression;

use App\Models\Goal;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class HelpTestUnauthorized extends TestCase
{

    use RefreshDatabase;

    public function test_help_fails_when_goal_does_not_belong_to_user(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();
        $this->actingAs($user, 'sanctum');

        $goal = Goal::factory()->create(['user_id' => $otherUser->id, 'id' => 15]);

        $payload = ['problem' => 'test'];

        $response = $this->postJson("/api/goals/$goal->id/help", $payload);
        $response
            ->assertStatus(403)
            ->assertJson(['error' => 'Unauthorized']);
    }
}
