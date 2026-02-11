<?php

namespace Auth;

use App\DTO\LoginData;
use App\Models\User;
use App\Services\AuthenticationService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LoginTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_login_successfully(): void
    {
        $user = User::factory()->create([
            'name' => 'John Doe',
            'email' => 'john@gmail.com',
            'password' => 'password',
        ]);

        $payload = [
            'email' => 'john@gmail.com',
            'password' => 'password',
            'remember' => false,
        ];


        $authService = $this->mock(AuthenticationService::class);
        $authService
            ->shouldReceive('login')
            ->once()
            ->withArgs(fn($data) => $data instanceof LoginData &&
                $data->email === 'john@gmail.com' &&
                $data->password === 'password')
            ->andReturn($user);

        $response = $this->postJson('/api/login', $payload);
        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'message',
                'user',
                'token'
            ])
            ->assertJson([
                'message' => 'User successfully logged in',
                'user' => $user->toArray(),
            ]);
    }
}
