<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ShippingAddress;
use Illuminate\Support\Facades\Auth;


class ShippingAddressController extends Controller
{
    public function index(Request $request)
    {

        
            $user = Auth::user();
            $shippingAddress = $user->shippingAddresses()->get();
            
    
            if ($shippingAddress) {
                return response()->json($shippingAddress);
            } else {
                return response()->json(['message' => 'No shipping address found'], 404);
            }
        

    }

    public function store(Request $request)
    {
        $user = Auth::user();

        $request->validate([
            'city' => 'required|string',
            'state' => 'required|string',
            'street' => 'required|string',
            'phone_number' => 'required|string',
        ]);

        $shippingAddress = $user->shippingAddresses()->create(
            
            [
                'user_id' => $user->id,
                'city' => $request->city,
                'state' => $request->state,
                'street' => $request->street,
                'phone_number' => $request->phone_number,
            ]
        );

        return response()->json([
            'message' => 'Shipping address saved successfully',
            'shippingAddress' => $shippingAddress,
        ], 201);
    }
}
