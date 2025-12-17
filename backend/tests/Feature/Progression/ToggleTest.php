<?php

namespace Progression;

use App\Models\Step;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\TestWith;
use Tests\TestCase;

class ToggleTest extends TestCase
{
    use RefreshDatabase;

    #[TestWith([0, 1])]
    #[TestWith([1, 0])]
    public function test_step_completed_can_be_toggled(int $initial, int $expected): void
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'sanctum');

        $step = Step::factory()->create([
            'completed' => $initial,
        ]);

        $response = $this->patchJson('/api/steps/' . $step->id . '/toggle');
        $response
            ->assertStatus(200)
            ->assertJson(['message' => 'Step updated']);

        $this->assertDatabaseHas('steps', [
            'id' => $step->id,
            'completed' => $expected,
        ]);
    }
}
