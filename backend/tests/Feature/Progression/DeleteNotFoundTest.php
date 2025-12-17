<?php

namespace Progression;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DeleteNotFoundTest extends TestCase
{
    use RefreshDatabase;

    public function test_delete_fails_when_goal_not_found(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'sanctum');

        $response = $this->deleteJson("/api/goals/9999");
        $response
            ->assertStatus(404)
            ->assertJson(['message' => 'Goal not found']);
    }
}
