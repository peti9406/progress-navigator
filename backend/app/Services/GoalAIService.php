<?php

namespace App\Services;

use Gemini\Laravel\Facades\Gemini;
use Illuminate\Support\Facades\Http;

class GoalAIService
{
    protected string $PROMPT = 'The user has made good progress toward their goal but is currently stuck on the current step. Provide clear, practical, step-by-step guidance to help them move forward. Do not ask anything after giving an answer!';
    protected ProgressionService $progressionService;

    public function __construct(ProgressionService $progressionService)
    {
        $this->progressionService = $progressionService;
    }

    public function getHelp(string $id): string
    {
        $goalContext = $this->buildGoalContext($id);

        $result = Gemini::generativeModel(model: 'gemini-2.5-flash-lite')->generateContent($this->PROMPT . "\n" . json_encode($goalContext));
        return $result->text();
    }

    protected function buildGoalContext(string $id): array
    {
        $goal = $this->progressionService->getGoalById($id);
        $steps = $goal['steps']->toArray();

        $completedSteps = $this->progressionService->getCompletedSteps($steps);
        $currentStep = $this->progressionService->getCurrentStep($steps);
        $upcomingSteps = $this->progressionService->getUpcomingSteps($steps);

        return [
            'goal' => $goal['goal'],
            'deadline' => $goal['deadline'],
            'completed_steps' => $completedSteps,
            'current_step' => $currentStep,
            'upcoming_steps' => $upcomingSteps,
            'is_last_step' => empty($upcomingSteps),
        ];
    }
}
