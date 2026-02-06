<?php

namespace Progression;

use App\Enums\AiPrompt;
use App\Models\User;
use App\Services\GoalAiService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AiNewGoalTest extends TestCase
{
    use RefreshDatabase;

    public function test_ai_can_suggest_steps_for_new_goal(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'sanctum');
        $goal = 'Test GoalType';

        $aiResponse = [
            "steps" => [
                [
                    'step' => 'First step',
                    'description' => 'Short description'
                ],
                [
                    'step' => 'Second step',
                    'description' => 'Short description'
                ],
            ],
            "goal" => $goal,
        ];

        $goalAiServiceMock = $this->mock(GoalAIService::class);
        $goalAiServiceMock
            ->shouldReceive('getHelp')
            ->with($goal, AiPrompt::GOAL_HELP)
            ->once()
            ->andReturn($aiResponse);

        $response = $this->postJson('/api/goals/ai-new-goal', ['goal' => $goal]);
        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                "goal",
                "steps" => [
                    "*" => [
                        "step",
                        "description",
                    ]
                ]
            ]);

    }
}
