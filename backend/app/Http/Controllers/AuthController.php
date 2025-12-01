<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    //
    public function register(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|min:3|max:30',
            'email' => 'required|email|unique:users|confirmed',
            'email_confirmation' => 'required',
            'password' => 'required|min:6',
        ]);

        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => $validated['password']
        ]);

        $user->sendEmailVerificationNotification();

        return response()->json('User successfully registered', 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        $user = Auth::user();

        if (!$user->hasVerifiedEmail()) {
            Auth::logout();
            return response()->json(['message' => 'Your email address is not verified.'], 403);
        }

        $request->session()->regenerate();

        return response()->json([
            'message' => 'User successfully logged in',
            'user' => $user,
        ]);
    }

    public function verifyEmail(Request $request)
    {
        $user = User::findOrFail($request->id);

        if (sha1($user->email) !== $request->hash) {
            return response()->json(['message' => 'Invalid verification link'], 400);
        }

        if ($user->hasVerifiedEmail()) {
            return response()->json(['message' => 'Email already verified']);
        }

        $user->markEmailAsVerified();

        return response()->json(['message' => 'Email successfully verified']);
    }
}
