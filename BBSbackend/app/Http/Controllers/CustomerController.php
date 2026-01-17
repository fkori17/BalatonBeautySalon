<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;


class CustomerController extends Controller
{
    public function index()
    {
        //
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user' => 'required|string',
            'password' => 'required|string|min:6',
            'name' => 'required|string',
            'phone' => 'required|regex:/^[\+]?[0-9]+$/',
            'loyal' => 'required|boolean',
        ], [
            'user' => [
                'required' => 'A felhasználónév megadása kötelező',
            ],
            'password' => [
                'required' => 'A jelszó megadása kötelező',
                'min' => 'A jelszónak legalább 6 karakter hosszúnak kell lennie',
            ],
            'name' => [
                'required' => 'A név megadása kötelező',
            ],
            'phone' => [
                'required' => 'A telefonszám megadása kötelező',
                'regex' => 'A telefonszám csak számokat és opcionális + jelet tartalmazhat az elején',
            ],
            'loyal' => [
                'required' => 'A lojalitás megadása kötelező',
            ]
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message'=> $validator->errors()->toArray(),
            ], 400);
        };

        $newRecord = new customer();
        $newRecord -> user = $request->user;
        $newRecord->password = Hash::make($request->password);
        $newRecord -> name = $request->name;
        $newRecord -> phone = $request->phone;
        $newRecord -> loyal = $request->loyal;

        return response()->json(['success' => true, 'message' => 'Sikeres mentés'], 201);
    }

    public function show(customer $customer)
    {
        //
    }

    public function changePassword(Request $request)
        {
            $request->validate([
                'oldPassword' => ['required'],
                'newPassword' => ['required', 'string', 'min:6'],
            ]);

            /** @var \App\Models\Customer $customer */
            $customer = $request->user();

            if (!Hash::check($request->oldPassword, $customer->password)) {
                return response()->json([
                    'message' => 'Hibás jelenlegi jelszó'
                ], 422);
            }

        $customer->password = Hash::make($request->newPassword);
        $customer->save();
    
        $customer->tokens()->delete();

        return response()->json([
            'message' => 'Jelszó sikeresen módosítva. Kérlek jelentkezz be újra.'
        ]);
    }


    public function update(Request $request, customer $customer)
    {
        //
    }

    public function destroy(customer $customer)
    {
        //
    }
}
