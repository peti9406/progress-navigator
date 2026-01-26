<?php

namespace App\Providers;

use App\Repositories\GoalRepository;
use App\Repositories\StepRepository;
use App\Repositories\UserRepository;
use App\Services\AuthenticationService;
use App\Services\GoalAIService;
use App\Services\Logging\LogThrottleService;
use App\Services\ProgressionService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton('AuthService', function () {
            return new AuthenticationService(
                app(UserRepository::class),
            );
        });

        $this->app->singleton('ProgService', function () {
            return new ProgressionService(
                app(GoalRepository::class),
                app(StepRepository::class),
            );
        });

        $this->app->singleton('AIService', function () {
            return new GoalAIService(
                app(ProgressionService::class),
            );
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}
