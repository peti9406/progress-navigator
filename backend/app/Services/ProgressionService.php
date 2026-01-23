<?php

namespace App\Services;

use App\DTO\CreateGoalData;
use App\DTO\GoalQuery;
use App\Exceptions\StepsNotCompletedException;
use App\Models\Goal;
use App\Models\Step;
use App\Repositories\GoalRepository;
use App\Repositories\StepRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Facades\Date;

class ProgressionService
{
    protected GoalRepository $goalRepository;
    protected StepRepository $stepRepository;

    public function __construct(GoalRepository $goalRepository, StepRepository $stepRepository)
    {
        $this->goalRepository = $goalRepository;
        $this->stepRepository = $stepRepository;
    }

    public function createGoal(CreateGoalData $data): Goal
    {
        $goal = $this->goalRepository->save([
            'user_id' => $data->userId,
            'goal' => $data->goal,
            'deadline' => $data->deadline,
        ]);

        foreach ($data->steps as $step) {
            $this->stepRepository->save([
                'goal_id' => $goal->id,
                'step' => $step,
            ]);
        }

        return $this->goalRepository->find($goal->id);
    }

    public function getGoals(GoalQuery $query): Collection|Goal
    {
        $filter = match ($query->status) {
            'Completed' => ['completed' => 1],
            'Not Completed' => ['completed' => 0],
            default => [],
        };

        return $this->goalRepository->findAll($query->userId, $filter);
    }


    public function toggleCompleted(string $id): Step
    {
        return $this->stepRepository->toggleCompleted($id);
    }

    /**
     * @throws StepsNotCompletedException
     */
    public function completeGoal(string $id): void
    {
        $goal = $this->goalRepository->find($id);

        foreach ($goal->steps as $step) {
            if ($step->completed === 0) {
                throw new StepsNotCompletedException ('You need to complete the steps first!');
            }
        }

        $this->goalRepository->update(
            $id,
            [
                'completed' => 1,
                'achieved_at' => Date::now(),
            ]
        );
    }

    public function delete(string $id): void
    {
        $this->goalRepository->delete($id);
    }

    public function getGoalById(string $id): Goal
    {
        return $this->goalRepository->find($id);
    }

    public function getCompletedSteps(array $steps): array
    {
        $completed = array_filter($steps, function ($step) {
            return $step['completed'] === 1;
        });

        return array_map(function ($step) {
            return $step['step'];
        }, $completed);
    }

    public function getCurrentStep(array $steps): string
    {
        $current = array_find($steps, function ($step) {
            return $step['completed'] === 0;
        });
        return $current['step'];
    }

    public function getUpcomingSteps(array $steps): array
    {
        $uncompleted = array_filter($steps, function ($step) {
            return $step['completed'] === 0;
        });

        $upcoming = array_slice($uncompleted, 1);

        return array_map(function ($step) {
            return $step['step'];
        }, $upcoming);
    }
}
