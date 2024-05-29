<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\CartItem;

class CartController extends Controller
{
    // Display a listing of the carts.
    public function index()
    {
        $carts = Cart::all();
        return response()->json($carts);
    }

    // Store a newly created cart in storage.
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        $cart = Cart::create($validatedData);

        return response()->json($cart, 201);
    }

    // Display the specified cart.
    public function show($id)
    {
        $cart = Cart::findOrFail($id);
        return response()->json($cart);
    }

    // Update the specified cart in storage.
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        $cart = Cart::findOrFail($id);
        $cart->update($validatedData);

        return response()->json($cart, 200);
    }

    // Remove the specified cart from storage.
    public function destroy($id)
    {
        $cart = Cart::findOrFail($id);
        $cart->delete();

        return response()->json(null, 204);
    }

    public function removeItem($cartId, $itemId)
    {
        $cart = Cart::findOrFail($cartId);
        $cartItem = CartItem::findOrFail($itemId);

        // Check if the cart item belongs to the specified cart
        if ($cartItem->cart_id !== $cart->id) {
            return response()->json(['message' => 'Cart item does not belong to the specified cart'], 404);
        }

        $cartItem->delete();

        return response()->json(['message' => 'Cart item removed successfully'], 200);
    }
}
