<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\ProfileController;
use App\Http\Resources\UserResource;

require __DIR__.'/api/auth.php';

Route::middleware(['auth:sanctum', 'verified'])->group(function () {
    Route::get('/user', function (Request $request) {
        return new UserResource($request->user()->load('profile'));
    });
    Route::get('/profile', [ProfileController::class, 'show']);
    Route::get('/profile/{user}', [ProfileController::class, 'showPublic']);
});