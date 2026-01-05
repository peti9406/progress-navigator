<?php

namespace App\Http\Controllers;

use App\Services\AdminService;

class AdminController extends Controller
{
    protected AdminService $adminService;

    public function __construct(AdminService $adminService)
    {
        $this->adminService = $adminService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = $this->adminService->getUsers();
        return response()->json($users);
    }
}
