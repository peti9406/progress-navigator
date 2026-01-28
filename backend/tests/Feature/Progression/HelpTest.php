<?php

namespace Progression;

use App\Enums\AiPrompt;
use App\Models\Goal;
use App\Models\User;
use App\Services\GoalAiService;
use App\Services\GoalContextBuilder;
use App\Services\ProgressionService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\TestWith;
use Tests\TestCase;

class HelpTest extends TestCase
{
    use RefreshDatabase;

    #[TestWith([''])]
    #[TestWith(['Test Problem'])]
    public function test_help_successfully_returns_ai_generated_text(string $providedProblem): void
    {
        $user = User::factory()->create();
        $this->actingAs($user, 'sanctum');

        $goal = Goal::factory()->create(['id' => 15, 'user_id' => $user->id]);
        $payload = ['problem' => $providedProblem];

        $progressionServiceMock = $this->mock(ProgressionService::class);
        $progressionServiceMock
            ->shouldReceive('getGoalById')
            ->with($goal->id)
            ->once()
            ->andReturn($goal);

        $context = ['context' => 'test'];

        $goalContextBuilderMock = $this->mock(GoalContextBuilder::class);
        $goalContextBuilderMock
            ->shouldReceive('build')
            ->with($goal, $providedProblem)
            ->once()
            ->andReturn($context);

        $goalAiServiceMock = $this->mock(GoalAiService::class);
        $goalAiServiceMock
            ->shouldReceive('getHelp')
            ->with($context, AIPrompt::STEP_HELP)
            ->once()
            ->andReturn([
                'steps' => ['Step 1', 'Step 2', 'Step 3'],
                'reflection' => 'Test Reflection',
            ]);

        $response = $this->postJson("/api/goals/$goal->id/help", $payload);
        $response
            ->assertStatus(200)
            ->assertJsonStructure(['steps',
                'reflection']);
    }
}
