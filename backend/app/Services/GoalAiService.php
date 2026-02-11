<?php

namespace App\Services;

use App\Enums\AiPrompt;
use App\Exceptions\AiReturnedInvalidJsonException;
use App\Services\AI\AiClient;
use Illuminate\Support\Facades\Log;

class GoalAiService
{
    protected AiClient $aiClient;

    public function __construct(AiClient $aiClient)
    {
        $this->aiClient = $aiClient;
    }

    /**
     * @throws AiReturnedInvalidJsonException
     */
    public function getHelp(array|string $context, AiPrompt $aiPrompt): array
    {
        $prompt = $aiPrompt->value . "\n" . json_encode($context);
        $text = $this->aiClient->generate($prompt);
        Log::debug($text);
        return $this->decodeJsonOrFail($text);
    }

    /**
     * @throws AiReturnedInvalidJsonException
     */
    public function decodeJsonOrFail(string $text): array
    {
        $cleanJson = preg_replace('/```json\s*|```/i', '', $text);
        $decoded = json_decode($cleanJson, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new AiReturnedInvalidJsonException();
        }

        return $decoded;
    }
}
