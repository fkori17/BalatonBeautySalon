<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Hash;
use App\Models\Customer;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Illuminate\Auth\Notifications\ResetPassword;

class PasswordResetController extends Controller
{

    public function sendResetLink(Request $request)
    {
        $request->validate(['email' => 'required|email']);
        
        $status = Password::broker('customers')->sendResetLink($request->only('email'));

        return $status === Password::RESET_LINK_SENT
            ? response()->json(['message' => 'Visszaállító link elküldve!'])
            : response()->json(['errors' => ['email' => [__($status)]]], 422);
    }

    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        
        $status = Password::broker('customers')->reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill(['password' => Hash::make($password)])->save();
            }
        );

        return $status === Password::PASSWORD_RESET
            ? response()->json(['message' => 'A jelszó sikeresen megváltozott!'])
            : response()->json(['errors' => ['email' => [__($status)]]], 422);
    }
}
