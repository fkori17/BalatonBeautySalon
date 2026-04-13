<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AdminAuthController;
use App\Http\Controllers\Api\CustomerAuthController;
use App\Http\Controllers\Api\PasswordResetController;
use App\Http\Controllers\Api\StatisticsController;

use App\Http\Controllers\TreatmentController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\Admin\AdminTreatmentController;





/*
|--------------------------------------------------------------------------
| AUTH ROUTES
|--------------------------------------------------------------------------
*/

Route::post('/login', [CustomerAuthController::class, 'login']);
Route::post('/admin/login', [AdminAuthController::class, 'login']);

Route::post('/forgot-password', [PasswordResetController::class, 'sendResetLink']);
Route::post('/reset-password', [PasswordResetController::class, 'resetPassword'])
    ->name('password.reset');



/*
|--------------------------------------------------------------------------
| AUTHENTICATED ROUTES
|--------------------------------------------------------------------------
*/

Route::middleware('auth:sanctum')->group(function () {

    /*
    |--------------------------------------------------------------------------
    | GENERAL
    |--------------------------------------------------------------------------
    */

    Route::post('/logout', function (Request $request) {

        if (!$request->user()) {
            return response()->json([
                'message' => 'Nem vagy bejelentkezve.'
            ], 401);
        }

        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Sikeres kijelentkezés.'
        ]);
    });

    Route::get('/me', fn(Request $request) => $request->user());



    /*
    |--------------------------------------------------------------------------
    | CUSTOMER FUNCTIONS
    |--------------------------------------------------------------------------
    */

    Route::prefix('treatments/me')->group(function () {

        Route::get('/', [TreatmentController::class, 'myTreatments']);
        Route::get('/last', [TreatmentController::class, 'last']);
        Route::get('/stats', [TreatmentController::class, 'stats']);
        Route::get('/service-stats-3months', [TreatmentController::class, 'serviceStatsLast3Months']);
    });

    Route::post('/change-password', [CustomerController::class, 'changePassword']);



    /*
    |--------------------------------------------------------------------------
    | ADMIN DASHBOARD
    |--------------------------------------------------------------------------
    */

    Route::middleware(['auth:sanctum','admin'])
    ->prefix('admin/dashboard')
    ->group(function () {

        Route::get('/stats', [TreatmentController::class, 'adminStats']);
        Route::get('/recent-treatments', [TreatmentController::class, 'adminRecentTreatments']);

    });



    /*
    |--------------------------------------------------------------------------
    | ADMIN CRUD
    |--------------------------------------------------------------------------
    */

    Route::middleware(['auth:sanctum','admin'])
        ->prefix('admin')
        ->group(function () {
            Route::get('/stats', [StatisticsController::class, 'index']);

            Route::get('/customers', [CustomerController::class, 'index']);
            Route::post('/customers', [CustomerController::class, 'store']);
            Route::put('/customers/{customer}', [CustomerController::class, 'update']);
            Route::delete('/customers/{id}', [CustomerController::class, 'destroy']);

            Route::get('/services', [ServiceController::class, 'index']);
            Route::post('/services', [ServiceController::class, 'store']);
            Route::put('/services/{service}', [ServiceController::class, 'update']);
            Route::patch('/services/{service}/toggle', [ServiceController::class, 'toggle']);

            Route::get('/treatments', [AdminTreatmentController::class, 'index']);
            Route::post('/treatments', [AdminTreatmentController::class, 'store']);
            Route::put('/treatments/{treatment}', [AdminTreatmentController::class, 'update']);
            Route::delete('/treatments/{treatment}', [AdminTreatmentController::class, 'destroy']);

    });

});
