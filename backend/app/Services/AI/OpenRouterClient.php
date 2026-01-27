<?php

namespace App\Services\AI;

use App\Services\AI\AiClient;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class OpenRouterClient implements AiClient
{

    public function generate(string $prompt): string
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
            Log::error('OpenRouter failed', [
                'status' => $response->status(),
                'body' => $response->body(),
            ]);
            throw new \RuntimeException('OpenRouter failed');
        }

        return trim($response->json('choices.0.message.content'));
    }
}
