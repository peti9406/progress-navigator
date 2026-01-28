<?php

namespace App\Services\AI;

use Illuminate\Support\Facades\Log;
use RuntimeException;

class AiClientChain implements AiClient
{

    public function __construct(protected array $clients){}

    public function generate(string $prompt): string
    {
        foreach($this->clients as $client){
            try {
                return $client->generate($prompt);
            } catch (\Throwable $th) {
                continue;
            }
        }

        Log::error('All ai clients failed');
        throw new RuntimeException('All ai clients failed');
    }
}
