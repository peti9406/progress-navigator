<?php

namespace App\Repositories;

use App\Models\Goal;
use Illuminate\Database\Eloquent\Collection;

class GoalRepository
{

    public function findAll(mixed $id, bool $completed): Collection
    {
        return Goal::with('steps')
            ->where('user_id', $id)
            ->where('completed', $completed)
            ->orderBy('achieved_at', 'desc')
            ->get();
    }

    public function save(array $data): Goal
    {
        return Goal::create($data);
    }

    public function update(string $id, array $array): void
    {
        Goal::where('id', $id)->update($array);
    }

    public function delete(string $id): void
    {
        $goal = Goal::findOrFail($id);
        $goal->delete();
    }

    public function find(mixed $id): Goal
    {
        return Goal::with('steps')->findOrFail($id);
    }


}
