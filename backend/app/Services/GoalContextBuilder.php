<?php

namespace App\Services;


use App\Models\Goal;

class GoalContextBuilder
{
    protected ProgressionService $progressionService;

    public function __construct(ProgressionService $progressionService)
    {
        $this->progressionService = $progressionService;
    }

    public function build(Goal $goal, string $problem): array
    {
        return [
            'goal' => $goal['goal'],
            'deadline' => $goal['deadline'],
            'completed_steps' => $this->progressionService->getStepsByCompleted($goal, true),
            'current_step' => $this->progressionService->getCurrentStep($goal),
            'upcoming_steps' => array_slice($this->progressionService->getStepsByCompleted($goal, false), 1),
            'is_last_step' => $this->progressionService->isLastStep($goal),
            'problem' => $problem,
        ];
    }
}
