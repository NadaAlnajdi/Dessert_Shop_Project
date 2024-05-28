<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Product;
use App\Models\Order;
use App\Models\Category;

class AdminController extends Controller
{
    public function overview()
    {
        $usersCount = User::count();
        $productsCount = Product::count();
        $ordersCount = Order::count();
        $categoriesCount = Category::count();

        $latestProducts = Product::latest()->take(5)->get();
        $latestOrders = Order::latest()->take(5)->get();
        $latestUsers = User::latest()->take(5)->get();

        return response()->json([
            'users_count' => $usersCount,
            'products_count' => $productsCount,
            'orders_count' => $ordersCount,
            'categories_count' => $categoriesCount,
            'latest_products' => $latestProducts,
            'latest_orders' => $latestOrders,
            'latest_users' => $latestUsers,
        ]);
    }

    public function getUsers() {
        return User::all();
    }
}
