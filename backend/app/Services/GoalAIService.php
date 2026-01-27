<?php

namespace App\Services;

use App\Enums\AiPrompt;
use Gemini\Laravel\Facades\Gemini;
use Illuminate\Support\Facades\Http;

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
        $prompt = AiPrompt::STEP_HELP->value . "\n" . json_encode($goalContext);

        try {
            $result = Gemini::generativeModel(model: 'gemini-2.5-flash')->generateContent($prompt);
            return trim($result->text());
        } catch (\Throwable $th) {
            logger()->warning('Gemini failed, fallback to OpenRouter', [
                'error' => $th->getMessage(),
            ]);

            return $this->callOpenRouter($prompt);
        }
    }

    protected function buildGoalContext(string $id, string $problem): array
    {
        $goal = $this->progressionService->getGoalById($id);
        $steps = $goal['steps']->toArray();

        $completedSteps = $this->progressionService->getCompletedSteps($steps);
        logger()->debug($completedSteps);
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
        $prompt = AiPrompt::GOAL_HELP->value . "\n" . json_encode($goal);

        try {
            $result = Gemini::generativeModel(model: 'gemini-2.5-flash')->generateContent($prompt);
            return trim($result->text());
        } catch (\Throwable $th) {
            logger()->warning('Gemini failed, fallback to OpenRouter', [
                'error' => $th->getMessage(),
            ]);

            return $this->callOpenRouter($prompt);
        }


    }

    protected function callOpenRouter(string $prompt): string
    {
        $response = Http::withHeaders([
            'Authorization' => 'Bearer ' . config('services.openrouter.key'),
            'Content-Type' => 'application/json',
            'HTTP-Referer' => config('app.url'),
            'X-Title' => 'Progress Navigator',
        ])->post('https://openrouter.ai/api/v1/chat/completions', [
            'model' => 'allenai/molmo-2-8b:free',
            'messages' => [
                [
                    'role' => 'system',
                    'content' => 'Return ONLY valid JSON.',
                ],
                [
                    'role' => 'user',
                    'content' => $prompt,
                ],
            ],
            'temperature' => 0.6,
        ]);

        if ($response->failed()) {
            logger()->error('OpenRouter failed', [
                'status' => $response->status(),
                'body' => $response->body(),
            ]);
            throw new \RuntimeException('OpenRouter failed');
        }

        return trim($response->json('choices.0.message.content'));
    }
}
