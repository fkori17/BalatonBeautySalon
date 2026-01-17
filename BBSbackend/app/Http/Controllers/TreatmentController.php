<?php

namespace App\Http\Controllers;

use App\Models\Treatment;
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

    public function last(Request $request)
    {
        $treatment = Treatment::with([
            'services:id,name'
        ])
        ->where('customer_id', $request->user()->id)
        ->orderByDesc('created_at')
        ->first();

        if (!$treatment) {
            return response()->json(null, 200);
        }

        return $treatment;
    }

    public function stats(Request $request)
    {
        $user = $request->user();

        $treatments = Treatment::where('customer_id', $user->id)->get();

        return [
            'username' => $user->name,
            'total_treatments' => $treatments->count(),
            'member_since' => $user->created_at->format('Y-m-d'),
            'next_visit' => '4 hét múlva'
        ];
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
            'customer_id' => [
                'required' => 'A vevő azonosítójának megadása kötelező',
                'min' => 'A vevő azonosítója nem lehet 1-nél kisebb',
            ],
            'description' => [
                'string' => 'A kezelés leírásának szöveges formátumban kell lennie',
            ],
            'realprice' => [
                'required' => 'A kezelés árának megadása kötelező',
                'min' => 'A kezelés ára nem lehet negatív',
            ]
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message'=> $validator->errors()->toArray(),
            ], 400);
        };

        $newRecord = new treatment();
        $newRecord -> customer_id = $request->customer_id;
        $newRecord -> description = $request->description;
        $newRecord -> realprice = $request->realprice;
        $newRecord -> save();
        return response()->json(['success' => true, 'message' => 'Sikeres mentés'], 201);
    }

    public function myTreatments(Request $request)
    {
        $customerId = $request->user()->id;

        $treatments = Treatment::with([
            'services:id,name'
        ])
        ->where('customer_id', $customerId)
        ->orderByDesc('created_at')
        ->get()
        ->map(function ($treatment) {
            return [
                'id' => $treatment->id,
                'created_at' => $treatment->created_at,
                'description' => $treatment->description,
                'services' => $treatment->services->map(function ($service) {
                    return [
                        'name' => $service->name,
                        'piece' => $service->pivot->piece
                    ];
                })
            ];
        });

        return response()->json($treatments);
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
