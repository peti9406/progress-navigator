<?php

namespace Auth;

use App\Exceptions\EmailAlreadyVerifiedException;
use App\Models\User;
use App\Services\AuthorizationService;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class VerifyEmailAlreadyVerifiedTest extends TestCase
{
    use RefreshDatabase;

    public function test_verify_email_fails_when_email_already_verified(): void
    {
        $user = User::factory()->create();

        $authService = $this->mock(AuthorizationService::class);
        $authService
            ->shouldReceive('verifyEmail')
            ->once()
            ->andThrow(new EmailAlreadyVerifiedException('Email already verified.'));

        $response = $this->getJson("/api/email/verify/{$user->id}/validhash");
        $response
            ->assertStatus(409)
            ->assertJson(['message' => 'Email already verified.']);
    }
}
