<?php

namespace App\Repositories;

use App\Models\Step;

class StepRepository
{

    public function save(array $data): void
    {
        Step::create($data);
    }

    public function toggleCompleted(int $id): Step
    {
        $step = Step::findOrFail($id);
        $step->completed = !$step->completed;
        $step->save();
        return $step;
    }
}
