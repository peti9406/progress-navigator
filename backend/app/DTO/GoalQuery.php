<?php

namespace App\DTO;

class GoalQuery
{
    public function __construct(
        public int $userId,
        public ?string $status,
    ) {}
}
