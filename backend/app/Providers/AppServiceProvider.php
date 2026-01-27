<?php

namespace App\Providers;

use App\Repositories\GoalRepository;
use App\Repositories\StepRepository;
use App\Repositories\UserRepository;
use App\Services\AI\AiClient;
use App\Services\AI\AiClientChain;
use App\Services\AI\GeminiClient;
use App\Services\AI\OpenRouterClient;
use App\Services\AuthenticationService;
use App\Services\GoalAiService;
use App\Services\GoalContextBuilder;
use App\Services\Logging\LogThrottleService;
use App\Services\ProgressionService;
use Gemini\Laravel\Facades\Gemini;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(AuthenticationService::class, function () {
            return new AuthenticationService(
                app(UserRepository::class),
            );
        });

        $this->app->singleton(GoalContextBuilder::class, function () {
            return new GoalContextBuilder(
                app(ProgressionService::class),
            );
        });

        $this->app->singleton(ProgressionService::class, function () {
            return new ProgressionService(
                app(GoalRepository::class),
                app(StepRepository::class),
            );
        });

        $this->app->singleton(AiClient::class, function ($app) {
            return new AiClientChain([
                $app->make(GeminiClient::class),
                $app->make(OpenRouterClient::class),
            ]);
        });

        $this->app->singleton(GoalAiService::class, function () {
            return new GoalAiService(
                app(AiClient::class),
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
