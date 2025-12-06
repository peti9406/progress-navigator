<?php

namespace App\Repositories;

use App\Models\Goal;
use Illuminate\Database\Eloquent\Collection;

class GoalRepository
{

    public function findAll(mixed $id): Collection
    {
        return Goal::with('steps')->where('user_id', $id)->get();
    }

    public function save(array $data): Goal
    {
        return Goal::create($data);
    }

    public function update(string $id, array $array)
    {
        Goal::where('id', $id)->update($array);
    }


}
