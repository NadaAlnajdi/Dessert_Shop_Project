<?php

namespace App\Http\Controllers;


use Illuminate\Support\Facades\Auth;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    // get all orders (admin dashboard)
    public function index() 
    {
        $orders = Order::with(['shippingAddress.user:id,first_name,last_name', 'orderItems.product'])->latest()->get();
        return response()->json($orders, 200);
    }

    // get a specific order (admin dashboard)
    public function show($id)
    {
        $order = Order::with(['shippingAddress.user:id,first_name,last_name', 'orderItems.product'])->find($id);

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        return response()->json($order, 200);
    }

    public function checkout(Request $request)
    {
        $user = Auth::user();
        var_dump($user);

        // Validate the request data for creating an order
        $request->validate([
            'order_items' => 'required|array',
            'order_items.*.product_id' => 'required|exists:products,id',
            'order_items.*.quantity' => 'required|integer|min:1',
            'order_items.*.price' => 'required|numeric|min:0',
            'shipping_address_id' => 'nullable|exists:shipping_addresses,id', // Allow existing shipping address ID
            'shipping_address.city' => 'nullable|string',
            'shipping_address.state' => 'nullable|string',
            'shipping_address.street' => 'nullable|string',
            'shipping_address.phone_number' => 'nullable|string',
        ]);
    
        // Determine the shipping address ID
        if ($request->filled('shipping_address_id')) {
            // Use existing shipping address ID
            $shippingAddressId = $request->shipping_address_id;
        } else {
            // Create new shipping address
            $shippingAddress = $user->shippingAddresses()->create([
                'city' => $request->shipping_address['city'],
                'state' => $request->shipping_address['state'],
                'street' => $request->shipping_address['street'],
                'phone_number' => $request->shipping_address['phone_number'],
            ]);
            $shippingAddressId = $shippingAddress->id;
        }
        // Calculate total price for the order
        $totalPrice = array_reduce($request->order_items, function ($sum, $item) {
            return $sum + ($item['price'] * $item['quantity']);
        }, 0);

        // Create the order
        $order = new Order();
        $order->user_id = $user->id;
        $order->total_price = $totalPrice;
        $order->shipping_address_id = $shippingAddressId;
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

    // update a specific order status (admin dashboard)
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

    public function getOrders()
    {
        $user = Auth::user();
        $orders = $user->orders()->with(['orderItems.product', 'shippingAddress'])->get();
        return response()->json($orders);
    }
}