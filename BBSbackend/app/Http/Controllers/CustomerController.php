<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\Rule;


class CustomerController extends Controller
{
    public function index()
{
    return Customer::orderBy('created_at', 'desc')->get();
}


    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
        'email' => [
            'required',
            'email',
            'max:255',
            Rule::unique('customers', 'email')
        ],
        'password' => 'required|min:6',
        'name' => 'required|string|max:255',
        'phone' => 'required|string|max:20',
        'loyal' => 'boolean'
    ], [
        'email.required' => 'Az email megadása kötelező',
        'email.email' => 'Érvényes email cím szükséges',
        'email.unique' => 'Ezzel az email címmel már létezik vendég',
        'password.required' => 'A jelszó megadása kötelező',
        'password.min' => 'A jelszó legalább 6 karakter legyen',
        'name.required' => 'A név megadása kötelező',
        'phone.required' => 'A telefonszám megadása kötelező',
    ]);

    $customer = Customer::create([
        'email' => $validated['email'],
        'password' => Hash::make($validated['password']),
        'name' => $validated['name'],
        'phone' => $validated['phone'],
        'loyal' => $validated['loyal'] ?? false,
    ]);

    return response()->json([
        'message' => 'Vendég sikeresen létrehozva',
        'customer' => $customer
    ], 201);
    }

    public function show(customer $customer)
    {
        //
    }

    public function changePassword(Request $request)
    {
        $request->validate([
            'oldPassword' => 'required|string',
            'newPassword' => 'required|string|min:6',
        ], [
            'oldPassword.required' => 'A jelenlegi jelszó megadása kötelező.',
            'newPassword.required' => 'Az új jelszó megadása kötelező.',
            'newPassword.min' => 'Az új jelszónak legalább 6 karakter hosszúnak kell lennie.'
        ]);

        $user = $request->user();

        if (!$user) {
            return response()->json([
                'message' => 'Nem vagy bejelentkezve.'
            ], 401);
        }

        if (!Hash::check($request->oldPassword, $user->password)) {
            return response()->json([
                'message' => 'Hibás jelenlegi jelszó.'
            ], 400);
        }

        $user->password = Hash::make($request->newPassword);
        $user->save();

        return response()->json([
            'message' => 'Jelszó sikeresen módosítva.'
        ]);
    }


    public function update(Request $request, Customer $customer)
    {
        $validator = Validator::make($request->all(), [
            'email'    => 'sometimes|email|unique:customers,email,' . $customer->id,
            'name'     => 'sometimes|string|max:255',
            'phone'    => 'sometimes|string|max:30',
            'loyal'    => 'sometimes|boolean',
            'password' => 'nullable|string|min:6',
        ], [
            'email.email' => 'Érvényes email cím szükséges.',
            'email.unique' => 'Ez az email cím már használatban van.',

            'name.max' => 'A név legfeljebb 255 karakter lehet.',

            'phone.max' => 'A telefonszám legfeljebb 30 karakter lehet.',

            'loyal.boolean' => 'A törzsvendég mező csak igaz vagy hamis lehet.',

            'password.min' => 'A jelszónak legalább 6 karakter hosszúnak kell lennie.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $updateData = [];

        if ($request->filled('email')) {
            $updateData['email'] = $request->email;
        }

        if ($request->filled('name')) {
            $updateData['name'] = $request->name;
        }

        if ($request->filled('phone')) {
            $updateData['phone'] = $request->phone;
        }

        if ($request->has('loyal')) {
            $updateData['loyal'] = $request->loyal;
        }

        if ($request->filled('password')) {
            $updateData['password'] = Hash::make($request->password);
        }

        $customer->update($updateData);

        return response()->json([
            'message' => 'Ügyfél sikeresen frissítve',
            'customer' => $customer
        ]);
    }

    public function destroy($id)
    {
        try {
            $customer = Customer::findOrFail($id);

            $customer->delete();

            return response()->json([
                'message' => 'Ügyfél sikeresen törölve.'
            ]);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'error' => 'A megadott ügyfél nem található.'
            ], 404);
        }
    }
}
