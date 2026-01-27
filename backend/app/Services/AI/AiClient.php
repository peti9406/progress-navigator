<?php

namespace App\Services\AI;

interface AiClient
{
    public function generate(string $prompt): string;
}
