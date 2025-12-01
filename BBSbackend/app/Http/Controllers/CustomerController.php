<?php

namespace App\Http\Controllers;

use App\Models\customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user' => 'required|string',
            'password' => 'required|string|min:6',
            'name' => 'required|string',
            'phone' => 'required|regex:/^[\+]?[0-9]+$/',
            'loyal' => 'required|boolean',
        ], [
            'user.required' => 'A felhasználónév megadása kötelező',
            'password.required' => 'A jelszó megadása kötelező',
            'password.min' => 'A jelszónak legalább 6 karakter hosszúnak kell lennie',
            'name.required' => 'A név megadása kötelező',
            'phone.required' => 'A telefonszám megadása kötelező',
            'phone.regex' => 'A telefonszám csak számokat és opcionális + jelet tartalmazhat az elején',
            'loyal.required' => 'A lojalitás megadása kötelező'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message'=> $validator->errors()->toArray(),
            ], 400);
        };

        $newRecord = new customer();
        $newRecord -> user = $request->user;
        $newRecord -> password = $request->password;
        $newRecord -> name = $request->name;
        $newRecord -> phone = $request->phone;
        $newRecord -> loyal = $request->loyal;

        return response()->json(['success' => true, 'message' => 'Sikeres mentés'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(customer $customer)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(customer $customer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, customer $customer)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(customer $customer)
    {
        //
    }
}
