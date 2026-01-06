<?php

namespace Admin;

use App\Services\AdminService;
use Tests\TestCase;

class GuestAccessTest extends TestCase
{

    public function test_guest_can_not_access_admin_page()
    {
        $adminService = $this->mock(AdminService::class);
        $adminService->shouldNotReceive('getUsers');

        $response = $this->getJson('/api/admin/users');
        $response
            ->assertStatus(403)
            ->assertJson(['message' => 'Forbidden']);
    }

}
