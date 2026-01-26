<?php

namespace App\Services;

use Gemini\Laravel\Facades\Gemini;
use App\Enums\AiPrompt;

class GoalAIService
{
    protected ProgressionService $progressionService;

    public function __construct(ProgressionService $progressionService)
    {
        $this->progressionService = $progressionService;
    }

    public function getHelp(string $id, string $problem): mixed
    {
        $text = $this->getHelpString($id, $problem);
        $decoded = json_decode($text, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            logger()->error('Invalid AI JSON', ['ai_text' => $text]);
            throw new \RuntimeException('AI returned invalid JSON');
        }

        return $decoded;
    }

    protected function getHelpString(string $id, string $problem): string
    {
        $goalContext = $this->buildGoalContext($id, $problem);

        $result = Gemini::generativeModel(model: 'gemini-2.5-flash')->generateContent(AiPrompt::STEP_HELP->value . "\n" . json_encode($goalContext));
        return trim($result->text());
    }

    protected function buildGoalContext(string $id, string $problem): array
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
            'problem' => $problem,
        ];
    }

    public function getNewGoal(string $goal): mixed
    {
        $text = $this->getNewGoalString($goal);
        $decoded = json_decode($text, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            logger()->error('Invalid AI JSON', ['ai_text' => $text]);
            throw new \RuntimeException('AI returned invalid JSON');
        }

        return $decoded;
    }

    protected function getNewGoalString(string $goal): string
    {
        $result = Gemini::generativeModel(model: 'gemini-2.5-flash')->generateContent(AiPrompt::GOAL_HELP->value . "\n" . json_encode($goal));
        return trim($result->text());
    }
}
