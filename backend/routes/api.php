<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProgressionController;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/email/verify/{id}/{hash}', [AuthController::class, 'verifyEmail'])->name('verification.verify');
Route::post('/logout', [AuthController::class, 'logout']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/goals', [ProgressionController::class, 'store']);
    Route::get('/goals', [ProgressionController::class, 'index']);
    Route::put('/goals/{id}', [ProgressionController::class, 'complete']);
    Route::patch('/steps/{id}/toggle', [ProgressionController::class, 'toggle']);
    Route::delete('/goals/{id}', [ProgressionController::class, 'delete']);
});


