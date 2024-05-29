<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('category', 'images')->paginate(10);
        return response()->json($products);
    }
    
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string',
            'price' => 'required|numeric|min:1',
            'description' => 'nullable|string',
            'stock_quantity' => 'required|integer|min:0',
            'category_id' => 'required|exists:categories,id',
            'images' => 'required|array',
            'images.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $validatedData['slug'] = Str::slug($validatedData['title']);

        // Check if the product already exists
        if (Product::where('slug', $validatedData['slug'])->exists()) {
            return response()->json(['message' => 'Product already exists'], 409);
        }

        $product = Product::create($validatedData);

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $folderPath = 'public/uploads/' . $validatedData['slug'];
                $path = $image->store($folderPath);
                ProductImage::create([
                    'path' => $path,
                    'product_id' => $product->id,
                ]);
            }
        }

        return response()->json($product->load('images'), 201);
    }

    public function update(Request $request, $slug)
    {
        $product = Product::where('slug', $slug)->first();
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        $validatedData = $request->validate([
            'title' => 'sometimes|required|string',
            'price' => 'sometimes|required|numeric|min:1',
            'description' => 'nullable|string',
            'stock_quantity' => 'sometimes|integer|min:0',
            'category_id' => 'sometimes|required|exists:categories,id',
            'images.*' => 'sometimes|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if (isset($validatedData['title'])) {
            $validatedData['slug'] = Str::slug($validatedData['title']);
        } else {
            $validatedData['slug'] = $product->slug;
        }

        $product->update($validatedData);

        if ($request->hasFile('images')) {
            // Delete old images
            foreach ($product->images as $image) {
                Storage::disk('public')->delete($image->path);
                $image->delete();
            }

            // Store new images
            foreach ($request->file('images') as $image) {
                $folderPath = 'public/uploads/' . $validatedData['slug'];
                $path = $image->store($folderPath);
                ProductImage::create([
                    'path' => $path,
                    'product_id' => $product->id,
                ]);
            }
        }

        return response()->json($product->load('images'), 200);
    }

    public function destroy($slug)
    {
        $product = Product::where('slug', $slug)->first();
        if (!$product) {
            return response()->json(['message' => 'Product not found'], 404);
        }

        // Delete images
        foreach ($product->images as $image) {
            Storage::disk('public')->delete(str_replace('public/', '', $image->path));
            $image->delete();
        }

        $product->delete();

        return response()->json(['message' => 'Product deleted successfully'], 204);
    }
}
