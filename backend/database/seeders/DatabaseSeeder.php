<?php

namespace Database\Seeders;

use App\Models\Goal;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
//        GoalType::factory()
//            ->withSteps()
//            ->count(4)
//            ->create();

        User::factory()
            ->withGoals()
            ->count(20)
            ->create();
    }
}
