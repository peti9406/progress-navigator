<?php

namespace Auth;

use App\Models\User;
use App\Services\AuthorizationService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class VerifyEmailTest extends TestCase
{

    use RefreshDatabase;

    public function test_user_can_verify_email_successfully(): void
    {
        $user = User::factory()->create();

        $authService = $this->mock(AuthorizationService::class);
        $authService
            ->shouldReceive('verifyEmail')
            ->once()
            ->withArgs(fn($data) => $data->userId === $user->id && $data->hash === 'validhash')
            ->andReturn(true);

        $response = $this->getJson("/api/email/verify/{$user->id}/validhash");
        $response
            ->assertStatus(200)
            ->assertJson(['message' => 'Email verified successfully']);
    }
}
