<?php

namespace App\DTO;

readonly class VerifyEmailData
{
    public function __construct(
        public int $userId,
        public string $hash
    ) {}
}
