<?php

namespace Progression;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class StoreTest extends TestCase
{
    use RefreshDatabase;

    public function test_goal_can_be_create(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'sanctum');

        $payload = [
            'goal' => 'Learn Feature Tests',
            'deadline' => now()->addDays(5)->toDateString(),
            'steps' => ['Step 1', 'Step 2'],
        ];

        $response = $this->postJson('/api/goals', $payload);
        $response
            ->assertStatus(201)
            ->assertJson([
                'message' => 'GoalType created',
                'goal' => [
                    'goal' => $payload['goal'],
                ]
            ]);

        $this->assertDatabaseHas('goals', [
            'goal' => $payload['goal'],
            'user_id' => $user->id
        ]);
    }
}
