<?php

namespace App\Services\AI;

use App\Exceptions\AiFailedException;
use App\Exceptions\AllAiFailedException;
use Illuminate\Support\Facades\Log;

class AiClientChain implements AiClient
{

    public function __construct(protected array $clients){}

    /**
     * @throws AllAiFailedException
     */
    public function generate(string $prompt): string
    {
        foreach($this->clients as $client){
            try {
                return $client->generate($prompt);
            } catch (AiFailedException $e) {
                continue;
            }
        }

        Log::error('All ai clients failed');
        throw new AllAiFailedException();
    }
}
