<?php

namespace Progression;

use App\Models\Goal;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\Attributes\DataProvider;
use Tests\TestCase;

class IndexTest extends TestCase
{
    use RefreshDatabase;

    public function test_goals_are_fetched_for_authenticated_user_no_filters(): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();

        $this->actingAs($user, 'sanctum');

        Goal::factory()->create([
            'user_id' => $user->id,
            'goal' => 'User Goal 1'
        ]);

        Goal::factory()->create([
            'user_id' => $user->id,
            'goal' => 'User Goal 2'
        ]);

        Goal::factory()->create([
            'user_id' => $otherUser->id,
            'goal' => 'Other User Goal'
        ]);

        $response = $this->getJson('/api/goals');
        $response->assertStatus(200);

        $data = $response->json();

        $this->assertCount(2, $data);
        $this->assertEquals('User Goal 1', $data[0]['goal']);
        $this->assertEquals('User Goal 2', $data[1]['goal']);

        foreach ($data as $goal) {
            $this->assertEquals($user->id, $goal['user_id']);

        }
    }

    #[DataProvider('filterProvider')]
    public function test_goals_are_fetched_for_authenticated_user_with_correct_filter(string $filter, int $expectedCompletedValue): void
    {
        $user = User::factory()->create();
        $otherUser = User::factory()->create();

        $this->actingAs($user, 'sanctum');

        Goal::factory()->create([
            'goal' => 'User Goal 1',
            'user_id' => $user->id,
            'completed' => 1
        ]);

        Goal::factory()->create([
            'goal' => 'User Goal 2',
            'user_id' => $user->id,
            'completed' => 0
        ]);

        Goal::factory()->create([
            'goal' => 'Other User Goal',
            'user_id' => $otherUser->id,
            'completed' => 1
        ]);

        $response = $this->getJson("/api/goals?filter={$filter}");
        $response->assertStatus(200);

        $data = $response->json();
        $this->assertCount(1, $data);

        foreach ($data as $goal) {
            $this->assertEquals($user->id, $goal['user_id']);
            $this->assertEquals($expectedCompletedValue, $goal['completed']);
        }
    }

    public static function filterProvider(): array
    {
        return [
            'completed goals' => [
                'Completed',
                1,
            ],
            'not completed goals' => [
                'Not Completed',
                0,
            ],
        ];
    }
}
