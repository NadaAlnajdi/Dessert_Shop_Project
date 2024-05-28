<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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
        $latestOrders = Order::where('status', 'pending')->latest()->take(5)->get();
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

    public function getOrders() 
    {
        $orders = Order::with(['shippingAddress.user:id,first_name,last_name', 'orderItems.product:id,title'])->latest()->get();
        return response()->json($orders, 200);
    }

    public function getOrder($id)
    {
        $order = Order::with(['shippingAddress.user:id,first_name,last_name', 'orderItems.product:id,title'])->find($id);

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        return response()->json($order, 200);
    }

    public function updateOrderStatus(Request $request, $id)
    {
        $validatedData = $request->validate([
            'status' => 'required|in:accepted,rejected',
        ]);

        $order = Order::find($id);

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

         // Check if the current status is already accepted or rejected
        if ($order->status === 'accepted' || $order->status === 'rejected') {
            return response()->json(['message' => 'Order status cannot be updated because it is already accepted or rejected'], 400);
        }

        $order->status = $validatedData['status'];
        $order->save();

        return response()->json(['message' => 'Order status updated successfully']);
    }
}
