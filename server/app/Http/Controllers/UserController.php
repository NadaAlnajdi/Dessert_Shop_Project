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
            'current_password' => 'required|string',
            'new_password' => 'required|string|min:8|confirmed',
        ]);


        if (!Hash::check($request->current_password, $user->password)) {
            throw ValidationException::withMessages([
                'current_password' => ['The provided current password is incorrect.'],
            ]);
        }


        if ($request->new_password !== $request->new_password_confirmation) {
            throw ValidationException::withMessages([
                'new_password_confirmation' => ['The new password and confirmation do not match.'],
            ]);
        }


        $user->password = Hash::make($request->new_password);
        $user->save();

      
        $user->tokens()->delete();

        return response()->json(['message' => 'Password updated successfully. Please login with your new password.']);
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
