<?php

use App\Http\Controllers\MissingReportController;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Route;

Route::get('/public/reports', [MissingReportController::class, 'publicIndex']);
Route::get('/public/reports/{id}', [MissingReportController::class, 'publicShow']);


Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/reports', [MissingReportController::class, 'index']);
    Route::post('/reports', [MissingReportController::class, 'store']);
    Route::get('/reports/{id}', [MissingReportController::class, 'show']);
    Route::put('/reports/{id}', [MissingReportController::class, 'update']);
    Route::delete('/reports/{id}', [MissingReportController::class, 'destroy']);
});