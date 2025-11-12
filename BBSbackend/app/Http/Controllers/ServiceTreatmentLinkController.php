<?php

namespace App\Http\Controllers;

use App\Models\service_treatment_link;
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
            'treatment_id.required' => 'Az kezelés azonosítójának megadása kötelező',
            'treatment_id.min' => 'A kezelés azonosítója nem lehet 1-nél kisebb',
            'service_id.required' => 'A szolgáltatás azonosítójának megadása kötelező',
            'service_id.min' => 'A szolgáltatás azonosítója nem lehet 1-nél kisebb',
            'piece.required' => 'A kezelés darabszámának megadása kötelező',
            'piece.min' => 'A kezelés darabszáma nem lehet 1-nél kisebb'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validációs hiba',
                'errors' => $validator->errors()
            ], 422);
        }

        $stl = service_treatment_link::create($request->all());
        return response()->json($stl, 201);
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
