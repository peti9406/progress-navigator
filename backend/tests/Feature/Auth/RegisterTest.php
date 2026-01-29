<?php

namespace Auth;

use App\Models\User;
use App\Notifications\VerifyEmailNotification;
use Exception;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

class RegisterTest extends TestCase
{

    use RefreshDatabase;

    /**
     * @throws Exception
     */
    public function test_user_can_register_successfully(): void
    {
        Notification::fake();

        $payload = [
            'name' => 'John Doe',
            'email' => 'john@gmail.com',
            'email_confirmation' => 'john@gmail.com',
            'password' => 'password',
        ];

        $response = $this->postJson('/api/register', $payload);

        $response
            ->assertStatus(201)
            ->assertJson(['message' => 'User successfully registered']);

        $this->assertDatabaseHas('users', [
            'name' => 'John Doe',
            'email' => 'john@gmail.com'
        ]);

        $user = User::where('email', $payload['email'])->first();
        $this->assertNull($user->email_verified_at);

        Notification::assertSentTo(
            $user,
            VerifyEmailNotification::class
        );

    }
}
