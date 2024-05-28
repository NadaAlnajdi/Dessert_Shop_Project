<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;

class OrderController extends Controller
{

    public function checkout(Request $request)
    {
        $user = Auth::user();

        // Validate the request data for creating an order
        $request->validate([
            'shipping_address.city' => 'required|string',
            'shipping_address.state' => 'required|string',
            'shipping_address.street' => 'required|string',
            'shipping_address.phone_number' => 'required|string',
            'order_items' => 'required|array',
            'order_items.*.product_id' => 'required|exists:products,id',
            'order_items.*.quantity' => 'required|integer|min:1',
            'order_items.*.price' => 'required|numeric|min:0',
        ]);

        // Check if user has an existing shipping address
        $shippingAddress = $user->shippingAddresses()->firstOrCreate([
            'city' => $request->shipping_address['city'],
            'state' => $request->shipping_address['state'],
            'street' => $request->shipping_address['street'],
            'phone_number' => $request->shipping_address['phone_number'],
        ], [
            'user_id' => $user->id
        ]);

        // Calculate total price for the order
        $totalPrice = array_reduce($request->order_items, function ($sum, $item) {
            return $sum + ($item['price'] * $item['quantity']);
        }, 0);

        // Create the order
        $order = new Order();
        $order->user_id = $user->id;
        $order->total_price = $totalPrice;
        $order->shipping_address_id = $shippingAddress->id;
        $order->status = 'pending';
        $order->save();

        // Attach Order Items
        foreach ($request->order_items as $item) {
            $orderItem = new OrderItem();
            $orderItem->order_id = $order->id;
            $orderItem->product_id = $item['product_id'];
            $orderItem->quantity = $item['quantity'];
            $orderItem->price = $item['price'];
            $orderItem->save();
        }

        return response()->json([
            'message' => 'Order created successfully',
            'order' => $order,
            'shippingAddress' => $shippingAddress,
        ], 201);
    }

    public function cancelOrder($id)
    {
        $user = Auth::user();
        $order = Order::where('id', $id)->where('user_id', $user->id)->where('status', 'pending')->first();

        if ($order) {
            $order->delete();
            return response()->json(['message' => 'Order canceled successfully']);
        }

        return response()->json(['message' => 'Order not found or cannot be canceled'], 404);
    }

    public function updateOrderStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:accepted,rejected',
        ]);

        $order = Order::find($id);

        if ($order) {
            $order->status = $request->status;
            $order->save();
            return response()->json(['message' => 'Order status updated successfully']);
        }

        return response()->json(['message' => 'Order not found'], 404);
    }

    public function getOrders()
    {
        $user = Auth::user();
        $orders = $user->orders()->with(['orderItems.product', 'shippingAddress'])->get();
        return response()->json($orders);
    }

}
