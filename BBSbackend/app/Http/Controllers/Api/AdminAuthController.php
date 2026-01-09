<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\Admin;


class AdminAuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'user' => 'required|email',
            'password' => 'required'
        ]);

        $admin = Admin::where('user', $request->user)->first();

        if (!$admin || !Hash::check($request->password, $admin->password)) {
            return response()->json([
                'message' => 'Hibás admin belépési adatok'
            ], 401);
        }

        $token = $admin->createToken('admin-token')->plainTextToken;

        return response()->json([
            'token' => $token
        ]);
    }
}
