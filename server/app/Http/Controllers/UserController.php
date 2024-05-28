<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Models\User;
use App\Models\ShippingAddress;

class UserController extends Controller
{
    // Middleware to ensure the user is authenticated
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function show(Request $request)
    {
        $user = $request->user()->load('shippingAddresses.orders');

        return response()->json($user);
    }

    public function update(Request $request)
    {
        $user = $request->user();

        $validatedData = $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'image' => 'nullable|string',
            'gender' => 'required|in:male,female',
            'role' => 'required|in:admin,user',
        ]);

        $user->update($validatedData);

        return response()->json($user);
    }

    public function updatePassword(Request $request)
    {
        $user = $request->user();

        $request->validate([
            'new_password' => 'required|string|min:8|confirmed',
        ]);

        $user->password = Hash::make($request->new_password);
        $user->save();

        return response()->json(['message' => 'Password updated successfully']);
    }

    public function deleteAccount(Request $request)
    {
        $request->validate([
            'password' => 'required|string',
        ]);

        $user = $request->user();

        // if (!Hash::check($request->password, $user->password)) {
        //     throw ValidationException::withMessages([
        //         'password' => ['The provided password does not match our records.'],
        //     ]);
        // }

        $user->delete();

        return response()->json(['message' => 'Account deleted successfully']);
    }
}
