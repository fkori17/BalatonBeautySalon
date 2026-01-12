<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\AdminAuthController;
use App\Http\Controllers\api\CustomerAuthController;
use App\Http\Controllers\TreatmentController;

Route::post('/login', [CustomerAuthController::class, 'login']);
Route::post('/admin/login', [AdminAuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', function (Request $request) {
    $request->user()->currentAccessToken()->delete();

    return response()->json([
        'message' => 'Sikeres kijelentkezés'
    ]);
});

Route::middleware('auth:sanctum')->get('/me', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/treatments/me/last', [TreatmentController::class, 'last']);
    Route::get('/treatments/me/stats', [TreatmentController::class, 'stats']);
});