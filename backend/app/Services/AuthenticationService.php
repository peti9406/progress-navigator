<?php

namespace App\Services;


use App\DTO\LoginData;
use App\DTO\UserData;
use App\DTO\VerifyEmailData;
use App\Exceptions\EmailAlreadyVerifiedException;
use App\Exceptions\EmailNotVerifiedException;
use App\Exceptions\InvalidVerificationLinkException;
use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Support\Facades\Auth;

class AuthenticationService
{
    protected UserRepository $userRepository;

    public function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    public function register(UserData $data): void
    {
        $user = $this->userRepository->create($data->toArray());
        $user->sendEmailVerificationNotification();
    }

    /**
     * @throws InvalidVerificationLinkException
     * @throws EmailAlreadyVerifiedException
     */
    public function verifyEmail(VerifyEmailData $data): void
    {
        $user = $this->userRepository->find($data->userId);

        if (sha1($user->email) !== $data->hash) {
            throw new InvalidVerificationLinkException('Invalid verification link.');
        }

        if ($user->hasVerifiedEmail()) {
            throw new EmailAlreadyVerifiedException();
        }

        $user->markEmailAsVerified();
    }

    /**
     * @throws AuthenticationException
     * @throws EmailNotVerifiedException
     */
    public function login(LoginData $data): User
    {
        if (!Auth::attempt([
            'email' => $data->email,
            'password' => $data->password,
        ])) {
            throw new AuthenticationException('Invalid credentials.');
        }

        $user = Auth::user();

        if (!$user->hasVerifiedEmail()) {
            throw new EmailNotVerifiedException();
        }

        return $user;
    }
}
