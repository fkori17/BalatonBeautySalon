<?php

namespace App\Http\Controllers;

use App\Models\treatment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TreatmentController extends Controller
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
            'customer_id' => 'required|integer|min:1',
            'description' => 'string',
            'realprice' => 'required|integer|min:0'
        ], [
            'customer_id.required' => 'A vevő azonosítójának megadása kötelező',
            'customer_id' => 'A vevő azonosítója nem lehet 1-nél kisebb',
            'customer_id.min' => 'A vevő azonosítója nem lehet 1-nél kisebb',
            'realprice.min' => 'A kezelés ára nem lehet negatív'
        ]);

        $newRecord = new treatment();
        $newRecord -> customer_id = $request->customer_id;
        $newRecord -> description = $request->description;
        $newRecord -> realprice = $request->realprice;

        return response()->json(['success' => true, 'message' => 'Sikeres mentés'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(treatment $treatment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(treatment $treatment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, treatment $treatment)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(treatment $treatment)
    {
        //
    }
}
