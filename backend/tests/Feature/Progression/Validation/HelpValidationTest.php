<?php

namespace Progression\Validation;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class HelpValidationTest extends TestCase
{
    use RefreshDatabase;

    public function test_help_fails_when_problem_is_too_long(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'sanctum');

        $payload = ['problem' => str_repeat('a', 256)];

        $response = $this->postJson('/api/goals/1/help', $payload);
        $response
            ->assertStatus(422)
            ->assertJsonValidationErrors([
                'problem'
            ]);
    }
}
