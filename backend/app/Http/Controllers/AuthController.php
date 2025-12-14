<?php

namespace App\Http\Controllers;

use App\DTO\LoginData;
use App\DTO\UserData;
use App\DTO\VerifyEmailData;
use App\Exceptions\EmailAlreadyVerifiedException;
use App\Exceptions\EmailNotVerifiedException;
use App\Exceptions\InvalidVerificationLinkException;
use App\Facades\AuthService;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    //
    public function register(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => 'required|string|min:3|max:30',
            'email' => 'required|email|unique:users|confirmed',
            'email_confirmation' => 'required',
            'password' => 'required|min:6',
        ]);

        $data = new UserData(
            $validated['name'],
            $validated['email'],
            $validated['password'],
        );

        AuthService::register($data);
        return response()->json('User successfully registered', 201);
    }

    public function verifyEmail(Request $request): JsonResponse
    {
        $data = new VerifyEmailData(
            (int)$request->id,
            $request->hash,
        );

        try {
            AuthService::verifyEmail($data);
            return response()->json('Email verified successfully');
        } catch (InvalidVerificationLinkException $exception) {
            return response()->json(['message' => $exception->getMessage()], 400);
        } catch (EmailAlreadyVerifiedException $exception) {
            return response()->json(['message' => $exception->getMessage()], 409);
        }
    }

    public function login(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $data = new LoginData(
            $validated['email'],
            $validated['password'],
        );

        try {
            $user = AuthService::login($data);

            $request->session()->regenerate();

            return response()->json([
                'message' => 'User successfully logged in',
                'name' => $user->name
                ]);
        } catch(AuthenticationException $exception) {
            return response()->json(['message' => $exception->getMessage()], 401);
        } catch(EmailNotVerifiedException $exception) {
            return response()->json(['message' => $exception->getMessage()], 403);
        }
    }


    public function logout(Request $request): JsonResponse
    {
        AuthService::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json('User successfully logged out');
    }
}
