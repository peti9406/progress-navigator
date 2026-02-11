<?php

namespace App\Http\Controllers;

use App\DTO\LoginData;
use App\DTO\UserData;
use App\DTO\VerifyEmailData;
use App\Exceptions\EmailAlreadyVerifiedException;
use App\Exceptions\EmailNotVerifiedException;
use App\Exceptions\InvalidVerificationLinkException;
use App\Services\AuthenticationService;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    protected AuthenticationService $authorizationService;

    public function __construct(AuthenticationService $authorizationService)
    {
        $this->authorizationService = $authorizationService;
    }

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

        $this->authorizationService->register($data);
        return response()->json(['message' => 'User successfully registered'], 201);
    }

    /**
     * @throws InvalidVerificationLinkException
     * @throws EmailAlreadyVerifiedException
     */
    public function verifyEmail(Request $request): JsonResponse
    {
        $data = new VerifyEmailData(
            (int)$request->id,
            $request->hash,
        );

        $this->authorizationService->verifyEmail($data);
        return response()->json(['message' => 'Email verified successfully']);
    }

    /**
     * @throws AuthenticationException
     * @throws EmailNotVerifiedException
     */
    public function login(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
            'remember' => 'boolean',
        ]);

        $data = new LoginData(
            $validated['email'],
            $validated['password'],
            $validated['remember'],
        );

        $user = $this->authorizationService->login($data);
        $user->tokens()->delete();

        $expiration = $data->remember
            ? now()->addDays(30)
            : now()->addHours(2);

        $token = $user->createToken('token', ['*'], $expiration)->plainTextToken;

        return response()->json([
            'message' => 'User successfully logged in',
            'user' => $user->toArray(),
            'token' => $token,
        ]);
    }


    public function logout(Request $request): JsonResponse
    {
        $user = $request->user();

        if ($user) {
            $user->tokens()->delete();
        }

        return response()->json(['message' => 'User successfully logged out']);
    }

    public function getRememberedUser(): JsonResponse
    {
        $user = Auth::user();
        $token = $user->createToken('token', ['*'], now()->addDays(30))->plainTextToken;

        return response()->json([
            'message' => 'User successfully logged in via remember token',
            'user' => $user->toArray(),
            'token' => $token,
        ]);
    }
}
