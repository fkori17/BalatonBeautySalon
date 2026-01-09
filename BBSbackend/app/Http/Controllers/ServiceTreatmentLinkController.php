<?php

namespace App\Http\Controllers;

use App\Models\Service_treatment_link;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ServiceTreatmentLinkController extends Controller
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
            'treatment_id' => 'required|integer|min:1',
            'service_id' => 'required|integer|min:1',
            'piece' => 'required|integer|min:1'
        ], [
            'treatment_id' => [
                'required' => 'Az kezelés azonosítójának megadása kötelező',
                'min' => 'A kezelés azonosítója nem lehet 1-nél kisebb',
            ],
            'service_id' => [
                'required' => 'A szolgáltatás azonosítójának megadása kötelező',
                'min' => 'A szolgáltatás azonosítója nem lehet 1-nél kisebb',
            ],
            'piece' => [
                'required' => 'A kezelés darabszámának megadása kötelező',
                'min' => 'A kezelés darabszáma nem lehet 1-nél kisebb',
            ]
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message'=> $validator->errors()->toArray(),
            ], 400);
        };

        $newRecord = new service_treatment_link();
        $newRecord -> treatment_id = $request->treatment_id;
        $newRecord -> service_id = $request->service_id;
        $newRecord -> piece = $request->piece;
        $newRecord -> save();
        return response()->json(['success' => true, 'message' => 'Sikeres mentés'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(service_treatment_link $service_treatment_link)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(service_treatment_link $service_treatment_link)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, service_treatment_link $service_treatment_link)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(service_treatment_link $service_treatment_link)
    {
        //
    }
}
