<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Models\User;
use App\Models\ShippingAddress;

class UserController extends Controller
{
    public function index() {
        $users = User::all();

        return response()->json($users, 200);
    }

    public function show($id)
    {

        $user = User::with(['shippingAddresses.orders'])->find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        return response()->json($user);
    }

    public function update(Request $request, $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

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

    public function updatePassword(Request $request, $id)
    {
        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $request->validate([
            'new_password' => 'required|string|min:8|confirmed',
        ]);

        $user->password = Hash::make($request->new_password);
        $user->save();

        return response()->json(['message' => 'Password updated successfully']);
    }

    public function deleteAccount(Request $request, $id)
    {
        $request->validate([
            'password' => 'required|string',
        ]);

        $user = User::find($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        if (!Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'password' => ['The provided password does not match our records.'],
            ]);
        }

        $user->delete();

        return response()->json(['message' => 'Account deleted successfully']);
    }
}
