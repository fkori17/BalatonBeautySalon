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
        $request->validate([
            'email' => 'required|email'
        ], [
            'email.required' => 'Az email cím megadása kötelező.',
            'email.email' => 'Érvényes email címet adj meg.'
        ]);

        $status = Password::broker('customers')
            ->sendResetLink($request->only('email'));

        if ($status === Password::RESET_LINK_SENT) {
            return response()->json([
                'message' => 'Visszaállító link elküldve.'
            ]);
        }

        return response()->json([
            'errors' => [
                'email' => ['Nem található felhasználó ezzel az email címmel.']
            ]
        ], 422);
    }

    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:6|confirmed',
        ], [
            'token.required' => 'A visszaállító token megadása kötelező.',
            'email.required' => 'Az email cím megadása kötelező.',
            'email.email' => 'Érvényes email címet adj meg.',
            'password.required' => 'Az új jelszó megadása kötelező.',
            'password.min' => 'A jelszónak legalább 6 karakter hosszúnak kell lennie.',
            'password.confirmed' => 'A jelszó megerősítése nem egyezik.'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $status = Password::broker('customers')->reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->save();
            }
        );

        if ($status === Password::PASSWORD_RESET) {
            return response()->json([
                'message' => 'A jelszó sikeresen megváltozott.'
            ]);
        }

        if ($status === Password::INVALID_TOKEN) {
            return response()->json([
                'errors' => [
                    'token' => ['A visszaállító token érvénytelen vagy lejárt.']
                ]
            ], 422);
        }

        if ($status === Password::INVALID_USER) {
            return response()->json([
                'errors' => [
                    'email' => ['Nem található felhasználó ezzel az email címmel.']
                ]
            ], 422);
        }

        return response()->json([
            'errors' => [
                'email' => ['Ismeretlen hiba történt.']
            ]
        ], 422);
    }
}
