<?php

namespace App\DTO;

class CreateGoalData
{
    public function __construct(
        public int $userId,
        public string $goal,
        public string $deadline,
        public array $steps
    ) {}
}
