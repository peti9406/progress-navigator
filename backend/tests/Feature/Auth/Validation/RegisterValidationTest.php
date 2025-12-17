<?php

namespace Auth\Validation;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Notification;
use Tests\TestCase;

class RegisterValidationTest extends TestCase
{

    use RefreshDatabase;

    public function test_register_fails_when_required_fields_are_missing(): void
    {
        Notification::fake();

        $response = $this->postJson('/api/register', []);
        $response
            ->assertStatus(422)
            ->assertJsonValidationErrors([
                'name',
                'email',
                'email_confirmation',
                'password'
            ]);

        Notification::assertNothingSent();
        $this->assertDatabaseCount('users', 0);
    }

    public function test_register_fails_when_password_is_too_short(): void
    {
        $payload = [
            'name' => 'John Doe',
            'email' => 'john@gmail.com',
            'email_confirmation' => 'john@gmail.com',
            'password' => 'short'
        ];

        $response = $this->postJson('/api/register', $payload);
        $response
            ->assertStatus(422)
            ->assertJsonValidationErrors(['password']);
    }

    public function test_register_fails_when_email_is_invalid(): void
    {
        $payload = [
            'name' => 'John Doe',
            'email' => 'john',
            'email_confirmation' => 'john',
            'password' => 'short'
        ];

        $response = $this->postJson('/api/register', $payload);
        $response
            ->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
    }

    public function test_register_fails_when_email_confirmation_does_not_match(): void
    {
        $payload = [
            'name' => 'John Doe',
            'email' => 'john@gmail.com',
            'email_confirmation' => 'notjohn@gmail.com',
            'password' => 'short'
        ];

        $response = $this->postJson('/api/register', $payload);
        $response
            ->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
    }

    public function test_register_fails_when_email_already_exists(): void
    {
        User::factory()->create([
            'email' => 'john@gmail.com'
        ]);

        $payload = [
            'name' => 'John Doe',
            'email' => 'john@gmail.com',
            'email_confirmation' => 'john@gmail.com',
            'password' => 'password'
        ];

        $response = $this->postJson('/api/register', $payload);
        $response
            ->assertStatus(422)
            ->assertJsonValidationErrors(['email']);

        $this->assertDatabaseCount('users', 1);
    }
}
