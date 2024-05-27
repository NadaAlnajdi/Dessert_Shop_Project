<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\ForgetPasswordController;
use App\Http\Controllers\Auth\PasswordResetController;#;
use App\Http\Controllers\UserController;
use App\Http\Controllers\OrderController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
// Route::post('/logout', [AuthController::class, 'logout']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);


    Route::get('profile/{id}', [UserController::class, 'show']);
    Route::post('profile/{id}', [UserController::class, 'update']);
    Route::post('profile/password/{id}', [UserController::class, 'updatePassword']);

    Route::delete('/user/{id}', [UserController::class, 'deleteAccount']);

    Route::get('/orders/{id}', [OrderController::class, 'show']);
    Route::post('/orders/{id}', [OrderController::class, 'cancel']);

});





Route::post('password/forgot-password', [ForgetPasswordController::class, 'forgetPassword']);

