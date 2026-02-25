<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\VerifyEmailController;
use Illuminate\Support\Facades\Route;


Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/email/verify/{id}/{hash}', [VerifyEmailController::class, 'verify'])
        ->middleware(['signed'])
        ->name('verification.verify');

    Route::post('/email/verification-notification', [VerifyEmailController::class, 'resend'])
        ->middleware(['throttle:6,1'])
        ->name('verification.send');
});