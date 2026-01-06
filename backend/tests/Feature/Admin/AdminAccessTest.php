<?php

namespace Admin;

use App\Models\User;
use App\Services\AdminService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Pagination\LengthAwarePaginator;
use Tests\TestCase;

class AdminAccessTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_access_admin_page()
    {
        $admin = User::factory()->create([
            'is_admin' => 1,
        ]);

        $this->actingAs($admin);

        $users = User::factory()->count(3)->create();
        $allUsers = $users->push($admin);

        $paginator = new LengthAwarePaginator($allUsers, count($allUsers), 5);

        $adminService = $this->mock(AdminService::class);
        $adminService
            ->shouldReceive('getUsers')
            ->once()
            ->andReturn($paginator);

        $response = $this->getJson('/api/admin/users');
        $response
            ->assertStatus(200)
            ->assertJson($paginator->toArray());
    }
}
