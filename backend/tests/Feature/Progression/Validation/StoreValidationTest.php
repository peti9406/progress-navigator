<?php

namespace Progression\Validation;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class StoreValidationTest extends TestCase
{
    use RefreshDatabase;

    public function test_create_goal_fails_when_required_fields_missing(): void
    {
        $user = new User();
        $this->actingAs($user, 'sanctum');
        $payload = [];

        $response = $this->postJson('/api/goals', $payload);
        $response
            ->assertStatus(422)
            ->assertJsonValidationErrors(
                [
                    'goal',
                    'deadline',
                    'steps',
                ]
            );
    }

    public function test_create_goal_fails_when_deadline_is_before_today(): void
    {
        $user = new User();
        $this->actingAs($user, 'sanctum');
        $payload = [
            'goal' => 'Learn Feature Tests',
            'deadline' => now()->subDays()->toDateString(),
            'steps' => ['Step 1', 'Step 2'],
        ];

        $response = $this->postJson('/api/goals', $payload);
        $response
            ->assertStatus(422)
            ->assertJsonValidationErrors(['deadline',]);
    }

    public function test_create_goal_fails_when_steps_is_not_array(): void
    {
        $user = new User();
        $this->actingAs($user, 'sanctum');
        $payload = [
            'goal' => 'Learn Feature Tests',
            'deadline' => now()->addDays(5)->toDateString(),
            'steps' => 'Step 1, Step 2',
        ];

        $response = $this->postJson('/api/goals', $payload);
        $response
            ->assertStatus(422)
            ->assertJsonValidationErrors(['steps']);
    }

    public function test_create_goal_fails_when_steps_array_has_invalid_element(): void
    {
        $user = new User();
        $this->actingAs($user, 'sanctum');
        $payload = [
            'goal' => 'Learn Feature Tests',
            'deadline' => now()->addDays(5)->toDateString(),
            'steps' => ['Step 1', 'Step 2', ''],
        ];

        $response = $this->postJson('/api/goals', $payload);
        $response
            ->assertStatus(422)
            ->assertJsonValidationErrors(['steps.2']);
    }
}
