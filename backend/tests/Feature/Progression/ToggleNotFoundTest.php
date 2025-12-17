<?php

namespace Progression;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ToggleNotFoundTest extends TestCase
{
    use RefreshDatabase;

    public function test_toggle_fails_when_step_not_found(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'sanctum');

        $response = $this->patchJson('/api/steps/9999/toggle');
        $response
            ->assertStatus(404)
            ->assertJson(['message' => 'Step not found']);
    }
}
