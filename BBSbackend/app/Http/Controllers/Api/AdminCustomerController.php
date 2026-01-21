<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class AdminCustomerController extends Controller
{
    public function index()
    {
        return Customer::orderBy('created_at', 'desc')->get();
    }
    
    public function store(Request $request)
    {
        $validated = $request->validate([
            'email' => ['required', 'email', 'unique:customers,email'],
            'password' => ['required', 'string', 'min:6'],
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:30'],
            'loyal' => ['boolean'],
        ]);

        $customer = Customer::create([
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
            'name' => $validated['name'],
            'phone' => $validated['phone'],
            'loyal' => $validated['loyal'] ?? false,
        ]);

        return response()->json($customer, 201);
    }
    
    public function update(Request $request, Customer $customer)
    {
        $validated = $request->validate([
            'email' => [
                'required',
                'email',
                Rule::unique('customers', 'email')->ignore($customer->id),
            ],
            'password' => ['nullable', 'string', 'min:6'],
            'name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:30'],
            'loyal' => ['boolean'],
        ]);

        $customer->email = $validated['email'];
        $customer->name = $validated['name'];
        $customer->phone = $validated['phone'];
        $customer->loyal = $validated['loyal'] ?? false;

        if (!empty($validated['password'])) {
            $customer->password = Hash::make($validated['password']);
        }

        $customer->save();

        return response()->json($customer);
    }
    
    public function destroy(Customer $customer)
    {
        $customer->delete();

        return response()->json([
            'message' => 'Ügyfél sikeresen törölve',
        ]);
    }
}
