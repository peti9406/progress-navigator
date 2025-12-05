<?php

namespace App\Repositories;

use App\Models\Step;

class StepRepository
{

    public function save(array $data): void
    {
        Step::create($data);
    }
}
