<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Wishlist;
use Illuminate\Support\Facades\Auth;

class WishlistController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        $wishlist = Wishlist::with(['products.images' => function($query) {
            $query->orderBy('created_at', 'asc');
        }])->where('user_id', $user->id)->first();

        $wishlistProducts = $wishlist->products->map(function($product) {
            $product->first_image = $product->images->first();
            return $product;
        });

        $wishlist->products = $wishlistProducts;

        return response()->json($wishlist);
    }

    public function store(Request $request)
    {
        $user = Auth::user();
        $wishlist = Wishlist::firstOrCreate(['user_id' => $user->id]);

        $wishlist->products()->attach($request->product_id);

        return response()->json(['message' => 'Product added to wishlist successfully']);
    }
    
    public function destroy(Request $request, $product_id)
    {
        $user = Auth::user();
        $wishlist = Wishlist::where('user_id', $user->id)->first();

        if ($wishlist) {
            $wishlist->products()->detach($request->product_id);
            return response()->json(['message' => 'Product removed from wishlist successfully']);
        }

        return response()->json(['message' => 'Wishlist not found'], 404);
    }
}