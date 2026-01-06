<?php

namespace Auth;

use App\Services\AuthenticationService;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LoginInvalidCredentialsTest extends TestCase
{
    use RefreshDatabase;

    public function test_login_fails_when_credentials_are_invalid(): void
    {
        $payload = [
            'email' => 'john@gmail.com',
            'password' => 'password',
        ];

        $authService = $this->mock(AuthenticationService::class);
        $authService
            ->shouldReceive('login')
            ->once()
            ->andThrow(new AuthenticationException('Invalid credentials.'));

        $response = $this->postJson('/api/login', $payload);
        $response
            ->assertStatus(401)
            ->assertJson(['message' => 'Invalid credentials.'])
            ->assertJsonMissing(['token']);
    }
}
