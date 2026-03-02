<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\VerifyEmailController;
use Illuminate\Support\Facades\Route;


Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::post('forgot-password', [App\Http\Controllers\ForgotPasswordController::class, 'sendOtp']);
Route::post('verify-reset-otp', [App\Http\Controllers\ForgotPasswordController::class, 'verifyOtp']);
Route::post('reset-password', [App\Http\Controllers\ForgotPasswordController::class, 'resetPassword']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/email/verify', [VerifyEmailController::class, 'verify'])
        ->middleware(['throttle:3,1']) // 3 attempts per minute
        ->name('verification.verify');

    Route::post('/email/verification-notification', [VerifyEmailController::class, 'resend'])
        ->middleware(['throttle:1,1']) // 1 resend per minute
        ->name('verification.send');

    Route::post('/logout', [AuthController::class, 'logout']);
});