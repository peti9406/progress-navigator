<?php

namespace App\Services;

use Gemini\Laravel\Facades\Gemini;

class GoalAIService
{
    protected string $PROMPT = 'Return ONLY valid JSON with keys "steps" and "reflection".
Do not include ```json or any markdown, do not add extra text.
The user is stuck on the current_step, help proceed to the next step even if no problem is provided.

The JSON format must be:
{
  "steps": [
    "First step",
    "Second step",
    "Third step"
  ],
  "reflection": "Short reflection if applicable, otherwise null, if no problem is provided write something like you did not specify the reason you are stuck."
}

Rules:
- Provide clear, practical, step-by-step guidance.
- Be concise.
- Do not ask questions.
- If the goal or step is incomprehensible, return:
{
  "error": "Incomprehensible goal or step"
}';
    protected ProgressionService $progressionService;

    public function __construct(ProgressionService $progressionService)
    {
        $this->progressionService = $progressionService;
    }

    public function getHelp(string $id, string $problem): mixed
    {
        $text = trim($this->getHelpString($id, $problem));
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

        $result = Gemini::generativeModel(model: 'gemini-2.5-flash')->generateContent($this->PROMPT . "\n" . json_encode($goalContext));
        return $result->text();
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
}
