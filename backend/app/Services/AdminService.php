<?php

namespace App\Services;

use App\Repositories\UserRepository;
use Illuminate\Pagination\LengthAwarePaginator;

class AdminService
{
    protected UserRepository $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function getUsers(): LengthAwarePaginator
    {
        return $this->userRepository->findAllPaginated();
    }


}
