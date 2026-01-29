<?php

namespace App\Services;

use App\Enums\AiPrompt;
use App\Exceptions\AiReturnedInvalidJsonException;
use App\Services\AI\AiClient;

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
        return $this->decodeJsonOrFail($text);
    }

    /**
     * @throws AiReturnedInvalidJsonException
     */
    public function decodeJsonOrFail(string $text): array
    {
        $decoded = json_decode($text, true);

        if (json_last_error() !== JSON_ERROR_NONE) {
            throw new AiReturnedInvalidJsonException();
        }

        return $decoded;
    }
}
