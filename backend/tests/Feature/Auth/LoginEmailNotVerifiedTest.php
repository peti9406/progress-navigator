<?php

namespace Auth;

use App\Exceptions\EmailNotVerifiedException;
use App\Services\AuthenticationService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LoginEmailNotVerifiedTest extends TestCase
{
    use RefreshDatabase;

    public function test_login_fails_when_email_not_verified(): void
    {
        $payload = [
            'email' => 'john@gmail.com',
            'password' => 'password',
        ];

        $authService = $this->mock(AuthenticationService::class);
        $authService
            ->shouldReceive('login')
            ->once()
            ->andThrow(new EmailNotVerifiedException('Your email address is not verified.'));

        $response = $this->postJson('/api/login', $payload);
        $response
            ->assertStatus(403)
            ->assertJson(['message' => 'Your email address is not verified.'])
            ->assertJsonMissing(['token']);
    }
}
