<?php

namespace App\Repositories;

use App\Models\User;

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
}
