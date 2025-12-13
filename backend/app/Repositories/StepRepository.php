<?php

namespace App\Repositories;

use App\Models\Step;
use Illuminate\Database\Eloquent\Collection;

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

    public function findByGoalId(string $id): Collection
    {
        return Step::where('goal_id', $id)->get();
    }

    public function complete($id, array $array): void
    {
        $step = Step::findOrFail($id);
        $step->completed = 1;
        $step->save();
    }
}
