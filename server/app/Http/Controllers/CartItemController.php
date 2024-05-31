<?php

namespace App\Http\Controllers;

use App\Models\CartItem;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Cart;
use Illuminate\Support\Facades\Auth;

class CartItemController extends Controller
{

    public function index()
    {
        $user = Auth::user();
    
    // Fetch the cart items that belong to the authenticated user
    $cartItems = CartItem::with('product')
        ->whereHas('cart', function($query) use ($user) {
            $query->where('user_id', $user->id);
        })
        ->get();
        
    return response()->json($cartItems);
    }

   public function store(Request $request)
{
    // Get the currently authenticated user
    $user = Auth::user();

    // Validate the incoming request data
    $validatedData = $request->validate([
        'product_id' => 'required|integer|exists:products,id',
        'quantity' => 'required|integer|min:1',
        'price' => 'required|numeric|min:0',
    ]);

    // Check if the user already has a cart, if not, create one
    $cart = Cart::firstOrCreate(['user_id' => $user->id]);

    // Create the cart item and associate it with the cart
    $cartItem = CartItem::create([
        'cart_id' => $cart->id,
        'product_id' => $validatedData['product_id'],
        'quantity' => $validatedData['quantity'],
        'price' => $validatedData['price'],
    ]);

    return response()->json($cartItem, 201);
}

    public function show($id)
{
    $cartItems = CartItem::where('cart_id', $id)
                         ->with('product')
                         ->get();

    return response()->json($cartItems);
}



    public function update(Request $request, $id)
    {
        $cartItem = CartItem::findOrFail($id);
        $cartItem->update($request->all());
        return response()->json($cartItem);
    }


    public function destroy($id)
    {
        $cartItem = CartItem::findOrFail($id);
        $cartItem->delete();
        return response()->json(null, 204);
    }

    public function destroyAll()
{
    CartItem::truncate();

    return response()->json(null, 204);
}

}