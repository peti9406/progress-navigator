<?php

namespace Auth\Validation;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class LoginValidationTest extends TestCase
{

    use RefreshDatabase;

    public function test_login_fails_when_required_fields_are_missing(): void
    {
        $response = $this->postJson('/api/login', []);
        $response
            ->assertStatus(422)
            ->assertJsonValidationErrors([
                'email',
                'password'
            ]);
    }

    public function test_login_fails_when_email_does_not_have_email_format(): void
    {
        $payload = [
            'email' => 'john',
            'password' => 'password'
        ];

        $response = $this->postJson('/api/login', $payload);
        $response
            ->assertStatus(422)
            ->assertJsonValidationErrors(['email']);
    }
}
