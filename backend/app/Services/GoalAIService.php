<?php

namespace App\Services;

use Gemini\Laravel\Facades\Gemini;

class GoalAIService
{
    protected string $PROMPT = 'The user has made good progress toward their goal but is currently stuck on the current step. Provide clear, practical, step-by-step guidance to help them move forward and try to be concise. Write down only your solution! Do not ask anything after giving an answer! Do not use markdown. Always put a number in front of each suggestion. At the end of each suggestion put |n. If the goal or the step is incomprehensible write Incomprehensible goal or step! Example: 1. First do this |n 2. Then do that |n 3. Continue like this |n';
    protected ProgressionService $progressionService;

    public function __construct(ProgressionService $progressionService)
    {
        $this->progressionService = $progressionService;
    }

    public function getHelp(string $id): string
    {
        $goalContext = $this->buildGoalContext($id);

        $result = Gemini::generativeModel(model: 'gemini-2.5-flash')->generateContent($this->PROMPT . "\n" . json_encode($goalContext));
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
