<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;

class OrderController extends Controller
{
    public function show($id)
    {
        $order = Order::find($id);

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }

        return response()->json($order);
    }


    public function cancel(Request $request , $id)
    {
        $order = Order::find($id);

        if (!$order) {
            return response()->json(['message' => 'Order not found'], 404);
        }


        if ($order->status !== 'pending') {
            return response()->json(['message' => 'Cannot cancel order. Status is not pending.'], 400);
        }




        return response()->json(['message' => 'Order cancelled successfully']);
    }
}
