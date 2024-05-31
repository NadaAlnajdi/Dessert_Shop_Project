<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Product;
use App\Models\Order;
use App\Models\Promotion;

class AdminController extends Controller
{
    public function overview()
    {
        $usersCount = User::count();
        $productsCount = Product::count();
        $ordersCount = Order::count();
        $promotionsCount = Promotion::count();

        $latestProducts = Product::with('category', 'images')->latest()->take(5)->get();
        $latestOrders = Order::with(['shippingAddress.user:id,first_name,last_name', 'orderItems.product'])->where('status', 'pending')->latest()->take(5)->get();
        $latestUsers = User::where('role', '!=', 'admin')->latest()->take(5)->get();
        $latestPromotions = Promotion::with('products')->latest()->take(5)->get();

        return response()->json([
            'users_count' => $usersCount,
            'products_count' => $productsCount,
            'orders_count' => $ordersCount,
            'promotions_count' => $promotionsCount,
            'latest_products' => $latestProducts,
            'latest_orders' => $latestOrders,
            'latest_users' => $latestUsers,
            'latest_promotions' => $latestPromotions,
        ]);
    }
}
