<?php

use App\Http\Controllers\MissingReportController;
use App\Http\Controllers\FoundReportController;
use Illuminate\Support\Facades\Route;

Route::get('/public/reports', [MissingReportController::class, 'publicIndex']);
Route::get('/public/reports/{id}', [MissingReportController::class, 'publicShow']);
Route::post('/public/reports/{id}/flag', [MissingReportController::class, 'flag']);
Route::get('/public/stats', [MissingReportController::class, 'getPublicStats']);


Route::middleware(['auth:sanctum'])->group(function () {
    // Missing Reports (reporter)
    Route::get('/reports', [MissingReportController::class, 'index']);
    Route::post('/reports', [MissingReportController::class, 'store']);
    Route::get('/reports/{id}', [MissingReportController::class, 'show']);
    Route::put('/reports/{id}', [MissingReportController::class, 'update']);
    Route::delete('/reports/{id}', [MissingReportController::class, 'destroy']);

    // Found Reports (reporter submits evidence)
    Route::post('/reports/{missingReportId}/found', [FoundReportController::class, 'store']);
    Route::get('/my-found-submissions', [FoundReportController::class, 'mySubmissions']);

    // Found Reports (admin review)
    Route::get('/admin/found-reports', [FoundReportController::class, 'adminIndex']);
    Route::get('/admin/found-reports/{id}', [FoundReportController::class, 'adminShow']);
    Route::post('/admin/found-reports/{id}/review', [FoundReportController::class, 'adminReview']);

    // Flagged Reports admin
    Route::get('/admin/flagged-reports', [MissingReportController::class, 'adminFlaggedIndex']);
});