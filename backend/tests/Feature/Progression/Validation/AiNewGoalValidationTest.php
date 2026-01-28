<?php

namespace Progression\Validation;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;

class AiNewGoalValidationTest extends TestCase
{

    use RefreshDatabase;

    #[DataProvider('goalProvider')]
    public function test_ai_fails_setting_a_new_goal_when_goal_is_invalid(array $data): void
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'sanctum');

        $response = $this->postJson('/api/goals/ai-new-goal', $data);
        $response->assertStatus(422)
            ->assertJsonValidationErrors(['goal']);
    }

    public static function goalProvider(): array
    {
        return [
            'too short' => [['goal' => str_repeat('a', 2)]],
            'too long' => [['goal' => str_repeat('a', 51)]],
            'missing' => [[]],
        ];
    }

}
