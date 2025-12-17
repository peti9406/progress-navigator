<?php

namespace Services;

use App\DTO\CreateGoalData;
use App\DTO\GoalQuery;
use App\Exceptions\StepsNotCompletedException;
use App\Models\Goal;
use App\Models\Step;
use App\Repositories\GoalRepository;
use App\Repositories\StepRepository;
use App\Services\ProgressionService;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Date;
use Mockery;
use Tests\TestCase;

class ProgressionServiceTest extends TestCase
{
    protected GoalRepository $goalRepository;
    protected StepRepository $stepRepository;
    protected ProgressionService $underTest;

    protected function setUp(): void
    {
        parent::setUp();

        $this->goalRepository = Mockery::mock(GoalRepository::class);
        $this->stepRepository = Mockery::mock(StepRepository::class);

        $this->underTest = new ProgressionService($this->goalRepository, $this->stepRepository);
    }

    public function testCreateGoal()
    {
        $goal = new Goal();
        $goal->id = 10;

        $this->goalRepository->shouldReceive('save')->once()->andReturn($goal);
        $this->stepRepository->shouldReceive('save')->twice();
        $this->goalRepository->shouldReceive('find')->once()->with(10)->andReturn($goal);

        $data = new CreateGoalData(
            1,
            'Learn Testing',
            '2025-12-31',
            ['Basics', 'Practice']
        );

        $result = $this->underTest->createGoal($data);
        $this->assertEquals($goal, $result, 'Goal should be created');
    }

    public function testGetGoals_WhenUserHasNoGoals_ReturnsEmptyCollection()
    {
        $userId = 1;

        $this->goalRepository
            ->shouldReceive('findAll')
            ->once()
            ->with($userId, [])
            ->andReturn(new Collection());

        $query = new GoalQuery($userId, null);
        $result = $this->underTest->getGoals($query);
        $this->assertInstanceOf(Collection::class, $result, 'Expected a collection of Goals');
        $this->assertEquals(0, $result->count(), 'Expected no goals for this user');
    }

    public function testGetGoals_WithCompletedQuery()
    {
        $goal1 = new Goal();
        $goal1->completed = 1;
        $goal2 = new Goal();
        $goal2->completed = 0;
        $goal3 = new Goal();
        $goal3->completed = 1;
        $userId = 1;

        $expected = new Collection([$goal1, $goal3]);

        $this->goalRepository
            ->shouldReceive('findAll')
            ->once()
            ->with($userId, ['completed' => 1])
            ->andReturn($expected);

        $queryCompleted = new GoalQuery($userId, 'Completed');
        $result = $this->underTest->getGoals($queryCompleted);
        $this->assertEquals($expected, $result, 'Expected goal1 and goal3 in the result');
        $this->assertEquals(2, $result->count(), 'Expected a collection of two goal');
    }

    public function testGetGoals_WithNotCompletedQuery()
    {
        $goal1 = new Goal();
        $goal1->completed = 1;
        $goal2 = new Goal();
        $goal2->completed = 0;
        $goal3 = new Goal();
        $goal3->completed = 0;
        $userId = 1;

        $expected = new Collection([$goal2, $goal3]);

        $this->goalRepository
            ->shouldReceive('findAll')
            ->once()
            ->with($userId, ['completed' => 0])
            ->andReturn($expected);

        $queryNotCompleted = new GoalQuery($userId, 'Not Completed');
        $result = $this->underTest->getGoals($queryNotCompleted);
        $this->assertEquals($expected, $result, 'Expected goal2 and goal3 in the result');
        $this->assertEquals(2, $result->count(), 'Expected a collection of two goal');
    }

    public function testGetGoals_WithNoFilter_ReturnsAllGoals()
    {
        $goal1 = new Goal();
        $goal2 = new Goal();
        $userId = 1;

        $goalCollection = new Collection([$goal1, $goal2]);

        $this->goalRepository
            ->shouldReceive('findAll')
            ->once()
            ->with($userId, [])
            ->andReturn($goalCollection);

        $query = new GoalQuery($userId, null);
        $result = $this->underTest->getGoals($query);
        $this->assertEquals($goalCollection, $result, 'Expected goal1 and goal2 in the result');
        $this->assertEquals(2, $result->count(), 'Expected a collection of two goal');
    }

    public function testToggleCompleted_WhenStepExists_TogglesCompleted()
    {
        $step = new Step();
        $step->id = 1;
        $step->completed = 0;

        $this->stepRepository
            ->shouldReceive('toggleCompleted')
            ->once()
            ->with($step->id)
            ->andReturnUsing(function ($id) use ($step) {
                $step->completed = $step->completed ? 0 : 1;
                return $step;
            });

        $result = $this->underTest->toggleCompleted($step->id);
        $this->assertSame(1, $result->completed, 'Expected a completed step');
        $this->assertEquals($step, $result, 'Expected to toggle on the same step');
    }

    public function testToggleCompleted_WhenStepDoesNotExist_ThrowModelNotFoundException()
    {
        $this->stepRepository
            ->shouldReceive('toggleCompleted')
            ->once()
            ->with(9999)
            ->andThrow(new ModelNotFoundException());

        $this->expectException(ModelNotFoundException::class);
        $this->underTest->toggleCompleted(9999);
    }

    public function testDelete_WhenGoalExists_DeletesSuccessfully()
    {
        $goal = new Goal();
        $goal->id = 1;

        $this->goalRepository
            ->shouldReceive('delete')
            ->once()
            ->with($goal->id);

        $this->underTest->delete($goal->id);
        $this->assertTrue(true, 'Delete method should be called once');
    }

    public function testDelete_WhenGoalDoesNotExist_ThrowsModelNotFoundException()
    {
        $this->goalRepository
            ->shouldReceive('delete')
            ->once()
            ->with(9999)
            ->andThrow(new ModelNotFoundException());

        $this->expectException(ModelNotFoundException::class);
        $this->underTest->delete(9999);
    }

    public function testCompleteGoal_WhenGoalDoesNotExist_ThrowsModelNotFoundException()
    {
        $this->goalRepository
            ->shouldReceive('find')
            ->once()
            ->with(9999)
            ->andThrow(new ModelNotFoundException());

        $this->expectException(ModelNotFoundException::class);
        $this->underTest->completeGoal(9999);
    }

    public function testCompleteGoal_WhenSomeStepsNotCompleted_ThrowsRuntimeException()
    {
        $goal = new Goal();
        $goal->id = 1;
        $step1 = new Step();
        $step1->completed = 1;
        $step2 = new Step();
        $step2->completed = 0;

        $goal->steps = [$step1, $step2];

        $this->goalRepository
            ->shouldReceive('find')
            ->once()
            ->with($goal->id)
            ->andReturn($goal);

        $this->expectException(StepsNotCompletedException ::class);
        $this->underTest->completeGoal($goal->id);
    }

    public function testCompleteGoal_WhenAllStepsCompleted_UpdatesSuccessfully()
    {
        $goal = new Goal();
        $goal->id = 1;
        $step1 = new Step();
        $step1->completed = 1;
        $step2 = new Step();
        $step2->completed = 1;

        $goal->steps = [$step1, $step2];

        $now = now();

        Date::shouldReceive('now')
            ->once()
            ->andReturn($now);

        $this->goalRepository
            ->shouldReceive('find')
            ->once()
            ->with($goal->id)
            ->andReturn($goal);

        $this->goalRepository
            ->shouldReceive('update')
            ->once()
            ->with($goal->id, [
                'completed' => 1,
                'achieved_at' => $now
            ]);

        $this->underTest->completeGoal($goal->id);
        $this->assertTrue(true, 'Goal should be updated');
    }

}
