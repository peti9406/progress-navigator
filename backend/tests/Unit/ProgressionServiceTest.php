<?php

namespace Tests\Unit;

use App\Models\Goal;
use App\Models\User;
use App\Repositories\GoalRepository;
use App\Repositories\StepRepository;
use App\Services\ProgressionService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Mockery;
use Tests\TestCase;

class ProgressionServiceTest extends TestCase
{
    protected GoalRepository $goalRepository;
    protected StepRepository $stepRepository;
    protected ProgressionService $service;

    protected function setUp(): void
    {
        parent::setUp();

        $this->goalRepository = Mockery::mock(GoalRepository::class);
        $this->stepRepository = Mockery::mock(StepRepository::class);

        $this->service = new ProgressionService($this->goalRepository, $this->stepRepository);
    }

    public function testCreateGoal()
    {
        $user = new User();
        $user->id = 1;

        Auth::shouldReceive('user')
            ->once()
            ->andReturn($user);

        $request = Request::create('/', 'POST', [
            'goal' => 'Learn Testing',
            'deadline' => now()->addDays(14)->format('Y-m-d'),
            'steps' => ['Basics', 'Practice'],
        ]);

        $goal = new Goal();
        $goal->id = 123;

        $this->goalRepository
            ->shouldReceive('save')
            ->once()
            ->andReturn($goal);

        $this->stepRepository
            ->shouldReceive('save')
            ->twice();

        $this->goalRepository
            ->shouldReceive('find')
            ->once()
            ->with($goal->id)
            ->andReturn($goal);

        $response = $this->service->createGoal($request);

        $this->assertEquals(201, $response->getStatusCode());
        $this->assertEquals('Goal created', $response->getData()->message);
    }

}
