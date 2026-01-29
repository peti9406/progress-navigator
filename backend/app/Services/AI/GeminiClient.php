<?php

namespace App\Services\AI;

use App\Exceptions\AiFailedException;
use Gemini\Laravel\Facades\Gemini;
use Illuminate\Support\Facades\Log;
use Throwable;

class GeminiClient implements AiClient
{

    /**
     * @throws AiFailedException
     */
    public function generate(string $prompt): string
    {
        try {
            $result = Gemini::generativeModel(model: 'gemini-2.5-flash')->generateContent($prompt);
            return trim($result->text());
        } catch (\Exception $e) {
            Log::warning('Gemini failed', ['error' => $e->getMessage()]);
            throw new AiFailedException('Gemini');
        }
    }
}
