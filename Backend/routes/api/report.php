<?php

use App\Http\Controllers\MissingReportController;
use App\Http\Resources\UserResource;

Route::middleware(['verified'])->group(function () {
    Route::middleware(['auth:sanctum'])->group(function () {
        Route::get('/reports', [MissingReportController::class, 'index']);
        Route::post('/reports', [MissingReportController::class, 'store']);
        Route::get('/reports/{id}', [MissingReportController::class, 'show']);
    });
});