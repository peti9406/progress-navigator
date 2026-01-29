<?php

use App\Exceptions\ApiException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->statefulApi();
    })
    ->withExceptions(function (Exceptions $exceptions): void {

        $exceptions->renderable(function (NotFoundHttpException $e) {
           if ($e->getPrevious() instanceof ModelNotFoundException) {
               $model = $e->getPrevious()->getModel();
               $className = basename($model);

               return response()->json([
                   'message' => "$className not found",
               ], $e->getStatusCode());
           }
           return null;
        });

        $exceptions->render(function (Throwable $e) {

            if ($e instanceof ApiException) {
                return response()->json([
                    'message' => $e->getMessage(),
                ], $e->getCode());
            }

            return null;
        });

    })->create();
