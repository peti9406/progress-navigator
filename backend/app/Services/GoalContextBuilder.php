<?php

namespace App\Services;


class GoalContextBuilder
{
    protected ProgressionService $progressionService;

    public function __construct(ProgressionService $progressionService)
    {
        $this->progressionService = $progressionService;
    }

    public function build(string $goalId, string $problem): array
    {
        $goal = $this->progressionService->getGoalById($goalId);

        return [
            'goal' => $goal['goal'],
            'deadline' => $goal['deadline'],
            'completed_steps' => $this->progressionService->getStepsByCompleted($goal, true),
            'current_step' => $this->progressionService->getCurrentStep($goal),
            'upcoming_steps' => $this->progressionService->getStepsByCompleted($goal, false),
            'is_last_step' => $this->progressionService->isLastStep($goal),
            'problem' => $problem,
        ];
    }
}
