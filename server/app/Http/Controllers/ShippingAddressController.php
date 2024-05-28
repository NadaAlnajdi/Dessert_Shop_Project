<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ShippingAddress;

class ShippingAddressController extends Controller
{
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'user_id' => 'required|exists:users,id',
            'city' => 'required|string|max:255',
            'state' => 'required|string|max:255',
            'street' => 'required|string|max:255',
            'phone_number' => 'required|string|max:15',
        ]);

        $shippingAddress = ShippingAddress::create($validatedData);

        return response()->json($shippingAddress, 201);
    }
}
