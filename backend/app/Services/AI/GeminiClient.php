<?php

namespace App\Services\AI;

use Gemini\Laravel\Facades\Gemini;
use Illuminate\Support\Facades\Log;

class GeminiClient implements AiClient
{
    /**
     * @throws \Throwable
     */
    public function generate(string $prompt): string
    {
        try {
            $result = Gemini::generativeModel(model: 'gemini-2.5-flash')->generateContent($prompt);
            return trim($result->text());
        } catch (\Throwable $th) {
            Log::warning('Gemini failed', ['error' => $th->getMessage()]);
            throw $th;
        }
    }
}
