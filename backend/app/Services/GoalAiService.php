<?php

namespace App\Services;

use App\Enums\AiPrompt;
use App\Services\AI\AiClient;
use Gemini\Laravel\Facades\Gemini;
use Illuminate\Support\Facades\Http;

class GoalAiService
{
    protected AiClient $aiClient;

    public function __construct(AiClient $aiClient)
    {
        $this->aiClient = $aiClient;
    }

    public function getHelp(array|string $context, AiPrompt $aiPrompt): array
    {
        $prompt = $aiPrompt->value . "\n" . json_encode($context);
        $text = $this->aiClient->generate($prompt);
        return $this->decodeJsonOrFail($text);
    }

    protected function decodeJsonOrFail(string $text): array
    {
        $decoded = json_decode($text, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            logger()->error('Invalid AI JSON', ['ai_text' => $text]);
            throw new \RuntimeException('AI returned invalid JSON');
        }

        return $decoded;
    }
}
