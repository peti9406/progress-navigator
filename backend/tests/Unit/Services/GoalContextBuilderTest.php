<?php

namespace Services;

use App\Models\Goal;
use App\Services\GoalContextBuilder;
use App\Services\ProgressionService;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Mockery;
use PHPUnit\Framework\Attributes\TestWith;
use Tests\TestCase;

class GoalContextBuilderTest extends TestCase
{
    protected ProgressionService $progressionService;
    protected GoalContextBuilder $underTest;

    public function setUp(): void
    {
        parent::setUp();

        $this->progressionService = Mockery::mock(ProgressionService::class);
        $this->underTest = new GoalContextBuilder($this->progressionService);
    }

    #[TestWith(['Test Problem'])]
    #[TestWith([''])]
    public function testBuild(string $providedProblem): void
    {
        $goal = new Goal();
        $goal->id = 1;
        $goal->goal = 'Test goal';
        $goal->deadline = now()->addDay();
        $problem = $providedProblem;

        $this->progressionService
            ->shouldReceive('getGoalById')
            ->once()
            ->andReturn($goal);

        $this->progressionService
            ->shouldReceive('getStepsByCompleted')
            ->once()
            ->with($goal, true)
            ->andReturn(['Step 1', 'Step 2']);

        $this->progressionService
            ->shouldReceive('getCurrentStep')
            ->once()
            ->andReturn('Step 3');

        $this->progressionService
            ->shouldReceive('getStepsByCompleted')
            ->once()
            ->with($goal, false)
            ->andReturn(['Step 3', 'Step 4']);

        $this->progressionService
            ->shouldReceive('isLastStep')
            ->once()
            ->andReturn(false);

        $result = $this->underTest->build($goal, $problem);

        $expected = [
            'goal' => $goal['goal'],
            'deadline' => $goal['deadline'],
            'completed_steps' => ['Step 1', 'Step 2'],
            'current_step' => 'Step 3',
            'upcoming_steps' => ['Step 4'],
            'is_last_step' => false,
            'problem' => $providedProblem
        ];

        $this->assertEquals($expected, $result, 'Goal context should be build with correct data');
    }

    public function testBuild_goalNotFound_shouldThrowException(): void
    {
        $id = 9999;

        $this->progressionService
            ->shouldReceive('getGoalById')
            ->once()
            ->with($id)
            ->andThrow(ModelNotFoundException::class);

        $this->progressionService
            ->shouldNotReceive('getStepsByCompleted');

        $this->progressionService
            ->shouldReceive('getCurrentStep');

        $this->progressionService
            ->shouldNotReceive('isLastStep');

        $this->expectException(ModelNotFoundException::class);
        $this->underTest->build($id, '');
    }
}
