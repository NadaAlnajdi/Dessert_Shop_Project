<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;

class CartController extends Controller
{
    public function viewCart($userId)
    {
        $cart = Cart::with('cartItems.product.promotions')->where('user_id', $userId)->first();
        if (!$cart) {
            return response()->json(['message' => 'Cart not found'], 404);
        }

        $prices = $cart->calculatePrices();

        return response()->json(['cart' => $cart, 'subtotal' => $prices['subtotal'], 'total_price' => $prices['total']], 200);
    }

    public function addToCart(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'product_id' => 'required|exists:products,id',
            'quantity' => 'required|integer|min:1',
        ]);

        $product = Product::find($validatedData['product_id']);
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $cart = Cart::firstOrCreate(['user_id' => $validatedData['user_id']]);
        $cartItem = $cart->cartItems()->updateOrCreate(
            ['product_id' => $validatedData['product_id']],
            ['quantity' => $validatedData['quantity'], 'price' => $product->price]
        );

        $prices = $cart->calculatePrices();

        return response()->json(['cart' => $cart->load('cartItems.product.promotions'), 'subtotal' => $prices['subtotal'], 'total_price' => $prices['total']], 200);
    }

    public function increaseQuantity($id)
    {
        $cartItem = CartItem::find($id);
        if (!$cartItem) {
            return response()->json(['message' => 'Cart item not found'], 404);
        }

        $cartItem->quantity += 1;
        $cartItem->save();

        $cart = $cartItem->cart;
        $prices = $cart->calculatePrices();

        return response()->json(['message' => 'Quantity increased', 'cart' => $cart->load('cartItems.product.promotions'), 'subtotal' => $prices['subtotal'], 'total_price' => $prices['total']], 200);
    }

    public function decreaseQuantity($id)
    {
        $cartItem = CartItem::find($id);
        if (!$cartItem) {
            return response()->json(['message' => 'Cart item not found'], 404);
        }

        if ($cartItem->quantity > 1) {
            $cartItem->quantity -= 1;
            $cartItem->save();
        } else {
            $cartItem->delete();
        }

        $cart = $cartItem->cart;
        $prices = $cart->calculatePrices();

        return response()->json(['message' => 'Quantity decreased', 'cart' => $cart->load('cartItems.product.promotions'), 'subtotal' => $prices['subtotal'], 'total_price' => $prices['total']], 200);
    }

    public function removeItem($id)
    {
        $cartItem = CartItem::find($id);
        if (!$cartItem) {
            return response()->json(['message' => 'Cart item not found'], 404);
        }

        $cart = $cartItem->cart;
        $cartItem->delete();

        $prices = $cart->calculatePrices();

        return response()->json(['message' => 'Item removed', 'cart' => $cart->load('cartItems.product.promotions'), 'subtotal' => $prices['subtotal'], 'total_price' => $prices['total']], 200);
    }
}
