<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Wishlist;


class WishlistController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $wishlists = Wishlist::with('product')->where('user_id', $user->id)->get();
        
        return response()->json($wishlists);
    }

    public function store(Request $request)
    {
        $user = $request->user();
        
        $request->validate([
            'product_id' => 'required|exists:products,id',
        ]);

        $wishlist = Wishlist::create([
            'user_id' => $user->id,
            'product_id' => $request->product_id,
        ]);

        return response()->json($wishlist, 201);
    }

    public function destroy(Request $request, $product_id)
    {
        $user = $request->user();

        $wishlist = Wishlist::where('user_id', $user->id)
                            ->where('product_id', $product_id)
                            ->first();

        if ($wishlist) {
            $wishlist->delete();
            return response()->json(null, 204);
        }

        return response()->json(['message' => 'Product not found in wishlist'], 404);
    }
}