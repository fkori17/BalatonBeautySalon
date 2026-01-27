<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\api\AdminAuthController;
use App\Http\Controllers\api\CustomerAuthController;
use App\Http\Controllers\TreatmentController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\Api\PasswordResetController;
use App\Http\Controllers\Admin\CustomerSelectController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\Admin\AdminTreatmentController;


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

Route::middleware('auth:sanctum')->get('/treatments/me', [TreatmentController::class, 'myTreatments']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/treatments/me/last', [TreatmentController::class, 'last']);
    Route::get('/treatments/me/stats', [TreatmentController::class, 'stats']);
});

Route::middleware('auth:sanctum')->post(
    '/change-password',
    [CustomerController::class, 'changePassword']
);

Route::post('/forgot-password', [PasswordResetController::class, 'sendResetLink']);
Route::post('/reset-password', [PasswordResetController::class, 'resetPassword']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/admin/dashboard/stats', [TreatmentController::class, 'adminStats']);
    Route::get('/admin/dashboard/recent-treatments', [TreatmentController::class, 'adminRecentTreatments']);
});

Route::middleware('auth:admin')->group(function () {
    Route::get('/admin/customers', [CustomerController::class, 'index']);
});
Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/admin/customers', [CustomerController::class, 'store']);
});
Route::middleware('auth:sanctum')->group(function () {
    Route::put('/admin/customers/{customer}', [CustomerController::class, 'update']);
});
Route::middleware('auth:sanctum')->group(function () {
    Route::delete('/admin/customers/{id}', [CustomerController::class, 'destroy']);
});

Route::middleware('auth:sanctum')
    ->prefix('admin')
    ->group(function () {

        Route::get('/customers', [CustomerController::class, 'index']);
        Route::get('/services', [ServiceController::class, 'index']);
        Route::get('/treatments', [AdminTreatmentController::class, 'index']);
        Route::post('/treatments', [AdminTreatmentController::class, 'store']);
        Route::put('/treatments/{treatment}', [AdminTreatmentController::class, 'update']);
        Route::delete('/treatments/{treatment}', [AdminTreatmentController::class, 'destroy']);
    });


Route::middleware('auth:sanctum')
    ->prefix('admin')
    ->group(function () {

        Route::get('/services', [ServiceController::class, 'index']);
        Route::post('/services', [ServiceController::class, 'store']);
        Route::put('/services/{service}', [ServiceController::class, 'update']);
        Route::patch('/services/{service}/toggle', [ServiceController::class, 'toggle']);
    });
