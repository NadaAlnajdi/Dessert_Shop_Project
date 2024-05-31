<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\ForgetPasswordController;
use App\Http\Controllers\Auth\PasswordResetController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\WishlistController;
use App\Http\Controllers\PromotionController;
use App\Http\Controllers\AdminController;

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

// Authentication routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('password/forgot-password', [ForgetPasswordController::class, 'forgetPassword']);
Route::post('password/reset', [PasswordResetController::class, 'passwordReset']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    // Wishlist routes
    Route::get('profile/{id}', [UserController::class, 'show']);
    Route::post('profile/{id}', [UserController::class, 'update']);
    Route::post('profile/password/{id}', [UserController::class, 'updatePassword']);

    Route::get('/orders/{id}', [OrderController::class, 'show']);
    Route::post('/orders/{id}', [OrderController::class, 'cancel']);

    Route::get('wishlists', [WishlistController::class, 'index']);
    Route::post('wishlists', [WishlistController::class, 'store']);
    Route::delete('wishlists/{product_id}', [WishlistController::class, 'destroy']);

    // Checkout routes
    Route::post('/checkout', [OrderController::class, 'checkout']);
    Route::get('/orders', [OrderController::class, 'getOrders']);
    Route::delete('/orders/{id}', [OrderController::class, 'cancelOrder']);
    Route::patch('/orders/{id}/status', [OrderController::class, 'updateOrderStatus']);

    // User profile routes
    Route::get('profile/{id}', [UserController::class, 'show']);
    Route::post('profile/{id}', [UserController::class, 'update']);
    Route::post('profile/password/{id}', [UserController::class, 'updatePassword']);
    Route::delete('/user/{id}', [UserController::class, 'deleteAccount']);
});

// Product routes
Route::apiResource('products', ProductController::class);

// Category routes
Route::apiResource('categories', CategoryController::class);

// Admin routes
Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    Route::get('dashboard', [AdminController::class, 'overview']);
    Route::apiResource('products', ProductController::class);
    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('promotions', PromotionController::class);
    Route::get('orders', [OrderController::class, 'index']);
    Route::get('orders/{id}', [OrderController::class, 'show']);
    Route::put('orders/{id}', [OrderController::class, 'updateOrderStatus']);
    Route::get('users', [UserController::class,'index']);
    Route::get('users/{id}/orders', [UserController::class,'getUserOrders']);
});
