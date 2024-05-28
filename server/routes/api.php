<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\ForgetPasswordController;

use App\Http\Controllers\UserController;
use App\Http\Controllers\OrderController;

use App\Http\Controllers\Auth\PasswordResetController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\WishlistController;
use App\Http\Controllers\PromotionController;



/*
|--------------------------------------------------------------------------
| API Routes          ------------------
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

    Route::get('wishlists', [WishlistController::class, 'index']);
    Route::post('wishlists', [WishlistController::class, 'store']);
    Route::delete('wishlists/{product_id}', [WishlistController::class, 'destroy']);

});

Route::post('password/forgot-password', [ForgetPasswordController::class, 'forgetPassword']);
Route::post('password/reset', [PasswordResetController::class, 'passwordReset']);

// Product routes
Route::apiResource('products', ProductController::class);

// Category routes
Route::apiResource('categories', CategoryController::class);

// Route::prefix('admin')->group(function () {
//     Route::apiResource('promotions', PromotionController::class);
// });


// Admin routes
Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    Route::apiResource('promotions', PromotionController::class);
});