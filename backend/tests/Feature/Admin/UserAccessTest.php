<?php

namespace Admin;

use App\Models\User;
use App\Services\AdminService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserAccessTest extends TestCase
{
    use RefreshDatabase;

    public function test_user_can_not_access_admin_page()
    {
        $user = User::factory()->create();
        $this->actingAs($user);

        $adminService = $this->mock(AdminService::class);
        $adminService->shouldNotReceive('getUsers');

        $response = $this->getJson('/api/admin/users');
        $response
            ->assertStatus(403)
            ->assertJson(['message' => 'Forbidden']);
    }
}
