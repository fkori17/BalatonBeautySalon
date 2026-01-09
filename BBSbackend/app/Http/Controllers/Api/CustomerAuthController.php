<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\Customer;

class CustomerAuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'user' => 'required|email',
            'password' => 'required'
        ]);

        $customer = Customer::where('user', $request->user)->first();

        if (!$customer || !Hash::check($request->password, $customer->password)) {
            return response()->json([
                'message' => 'Hibás email vagy jelszó'
            ], 401);
        }

        $token = $customer->createToken('customer-token')->plainTextToken;

        return response()->json([
            'token' => $token
        ]);
    }
}
