<?php

namespace App\Http\Controllers;

use App\Facades\AuthService;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    //
    public function register(Request $request)
    {
        return AuthService::registerUser($request);
    }

    public function login(Request $request)
    {
        return AuthService::loginUser($request);
    }

    public function verifyEmail(Request $request)
    {
        return AuthService::verifyEmail($request);
    }

    public function logout()
    {
        return AuthService::logoutUser();
    }
}
