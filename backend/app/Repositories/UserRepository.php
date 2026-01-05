<?php

namespace App\Repositories;

use App\Models\User;
use Illuminate\Pagination\LengthAwarePaginator;

class UserRepository
{

    public function create(array $data): User
    {
        return User::create($data);
    }

    public function find(string $id): User
    {
        return User::findOrFail($id);
    }

    public function findAllPaginated(int $perPage = 5): LengthAwarePaginator
    {
        return User::withCount('goals')
            ->orderBy('created_at', 'asc')
            ->paginate($perPage, ['id', 'name', 'email', 'created_at']);
    }
}
