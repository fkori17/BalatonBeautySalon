<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Hash;
use App\Models\Customer;

class PasswordResetController extends Controller
{
    public function sendResetLink(Request $request)
{
    $request->validate([
        'email' => 'required|email'
    ]);

    $status = Password::broker('customers')->sendResetLink(
        $request->only('email')
    );

    if ($status === Password::RESET_LINK_SENT) {
        return response()->json([
            'message' => 'Jelszó-visszaállító email elküldve'
        ]);
    }

    return response()->json([
        'message' => 'Nincs ilyen email címmel regisztrált felhasználó'
    ], 400);
}
}
