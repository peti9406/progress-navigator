<?php

namespace Auth;

use App\Exceptions\InvalidVerificationLinkException;
use App\Models\User;
use App\Services\AuthenticationService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class VerifyEmailInvalidLinkTest extends TestCase
{
    use RefreshDatabase;

    public function test_verify_email_fails_when_verification_link_is_invalid(): void
    {
        $user = User::factory()->create();

        $authService = $this->mock(AuthenticationService::class);
        $authService
            ->shouldReceive('verifyEmail')
            ->once()
            ->andThrow(new InvalidVerificationLinkException('Invalid verification link.'));

        $response = $this->getJson("/api/email/verify/{$user->id}/invalidhash");
        $response
            ->assertStatus(400)
            ->assertJson(['message' => 'Invalid verification link.']);
    }
}
