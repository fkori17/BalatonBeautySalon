<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Treatment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class AdminTreatmentController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'customer_id' => 'required|exists:customers,id',
            'realprice'   => 'required|integer|min:0',
            'description' => 'nullable|string',
            'services'    => 'required|array|min:1',
            'services.*.service_id' => 'required|exists:services,id',
            'services.*.piece'      => 'required|integer|min:1',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Hibás adatok',
                'errors' => $validator->errors(),
            ], 422);
        }

        DB::transaction(function () use ($request) {
            $treatment = Treatment::create([
                'customer_id' => $request->customer_id,
                'description' => $request->description,
                'realprice'   => $request->realprice,
            ]);

            foreach ($request->services as $service) {
                $treatment->services()->attach(
                    $service['service_id'],
                    ['piece' => $service['piece']]
                );
            }
        });

        return response()->json(['message' => 'Kezelés sikeresen létrehozva'], 201);
    }

    public function index()
{
    $treatments = Treatment::with([
        'customer:id,name,email',
        'services:id,name,price' 
    ])
    ->orderByDesc('created_at')
    ->get()
    ->map(function ($t) {
        return [
            'id' => $t->id,
            'date' => $t->created_at,
            'customer' => $t->customer?->name ?? '-',
            'email' => $t->customer?->email ?? '-',
            'services' => $t->services->map(function ($s) {
                return [
                    'id' => $s->id,     
                    'name' => $s->name,
                    'price' => $s->price, 
                    'piece' => $s->pivot->piece,
                ];
            }),
            'realprice' => $t->realprice, 
            'description' => $t->description,
        ];
    });

    return response()->json($treatments);
}

public function update(Request $request, Treatment $treatment) {
    $treatment->update([
        'description' => $request->description,
        'realprice' => $request->realprice 
    ]);

    $services = [];
    foreach ($request->services as $s) {
        $services[$s['service_id']] = ['piece' => $s['piece']];
    }
    $treatment->services()->sync($services);

    return response()->json(['message' => 'Sikeres frissítés']);
}

    public function destroy(Treatment $treatment)
    {
        DB::transaction(function () use ($treatment) {
            $treatment->services()->detach();
            $treatment->delete();
        });

        return response()->json(['message' => 'Kezelés törölve']);
    }
}