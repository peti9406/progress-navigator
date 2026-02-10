<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProgressionController;
use App\Http\Middleware\AdminMiddleware;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
//Route::get('/email/verify/{id}/{hash}', [AuthController::class, 'verifyEmail'])->name('verification.verify');
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'getRememberedUser']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/goals', [ProgressionController::class, 'store']);
    Route::get('/goals', [ProgressionController::class, 'index']);
    Route::patch('/goals/{id}/complete', [ProgressionController::class, 'complete']);
    Route::patch('/steps/{id}/toggle', [ProgressionController::class, 'toggle']);
    Route::delete('/goals/{id}', [ProgressionController::class, 'delete']);
    Route::post('/goals/{id}/help', [ProgressionController::class, 'help']);
    Route::post('/goals/ai-new-goal', [ProgressionController::class, 'aiNewGoal']);
});

Route::middleware(AdminMiddleware::class)->group(function () {
    Route::get('/admin/users', [AdminController::class, 'index']);
});


