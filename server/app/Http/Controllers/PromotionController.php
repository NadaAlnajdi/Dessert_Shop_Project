<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Promotion;
use App\Http\Resources\PromotionResource;
use App\Http\Requests\StorePromotionRequest;
use App\Http\Requests\UpdatePromotionRequest;

class PromotionController extends Controller
{
    public function index()
    {
        $promotions = Promotion::with('products')->orderBy('start_date', 'desc')->get();
        return PromotionResource::collection($promotions);
    }

    public function show($slug)
    {
        $promotion = Promotion::with('products')->where('slug', $slug)->first();
        if (!$promotion) {
            return response()->json(['error' => 'Promotion not found'], 404);
        }
        return new PromotionResource($promotion);
    }

    public function store(StorePromotionRequest $request)
    {
        $promotion = Promotion::create($request->validated());
        
        if ($request->has('products')) {
            $promotion->products()->attach($request->products);
        }

        return response()->json([
            'promotion' => new PromotionResource($promotion->load('products')), 
            'message' => "promotion added"
        ], 201);
    }

    public function update(UpdatePromotionRequest $request, $slug)
    {
        $promotion = Promotion::where('slug', $slug)->first();

        if (!$promotion) {
            return response()->json(['error' => 'Promotion not found'], 404);
        }

        $validatedData = $request->validated();

        $promotion->update($validatedData);

        if (isset($validatedData['products'])) {
            $promotion->products()->sync($validatedData['products']);
        }

        return response()->json([
            'promotion' => new PromotionResource($promotion->load('products')),
            'message' => 'Promotion updated successfully'
        ]);
    }


    public function destroy($slug)
    {
        $promotion = Promotion::where('slug', $slug)->first();
        if (!$promotion) {
            return response()->json(['error' => 'Promotion not found'], 404);
        }
        $promotion->delete();
        return response()->json(['message' => 'Promotion deleted'], 200);
    }
}

