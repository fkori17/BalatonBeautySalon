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
        ], [
            'customer_id.required' => 'A vendég kiválasztása kötelező.',
            'customer_id.exists'   => 'A megadott vendég nem létezik.',

            'realprice.required' => 'A végösszeg megadása kötelező.',
            'realprice.integer'  => 'A végösszeg csak egész szám lehet.',
            'realprice.min'      => 'A végösszeg nem lehet negatív.',

            'description.string' => 'A leírás szöveg típusú kell legyen.',

            'services.required' => 'Legalább egy szolgáltatást meg kell adni.',
            'services.array'    => 'A szolgáltatások formátuma hibás.',
            'services.min'      => 'Legalább egy szolgáltatást ki kell választani.',

            'services.*.service_id.required' => 'A szolgáltatás azonosító megadása kötelező.',
            'services.*.service_id.exists'   => 'A kiválasztott szolgáltatás nem létezik.',

            'services.*.piece.required' => 'A darabszám megadása kötelező.',
            'services.*.piece.integer'  => 'A darabszám csak egész szám lehet.',
            'services.*.piece.min'      => 'A darabszám legalább 1 kell legyen.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Hibás adatok.',
                'errors'  => $validator->errors(),
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

        return response()->json([
            'message' => 'Kezelés sikeresen létrehozva.'
        ], 201);
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

    public function update(Request $request, Treatment $treatment)
    {
        $validator = Validator::make($request->all(), [
            'description' => 'sometimes|nullable|string',
            'realprice'   => 'sometimes|integer|min:0',
            'services'    => 'sometimes|array|min:1',
            'services.*.service_id' => 'required_with:services|exists:services,id',
            'services.*.piece'      => 'required_with:services|integer|min:1',
        ], [
            'realprice.integer' => 'A végösszeg csak egész szám lehet.',
            'realprice.min' => 'A végösszeg nem lehet negatív.',

            'services.array' => 'A szolgáltatások formátuma hibás.',
            'services.min' => 'Legalább egy szolgáltatást meg kell adni.',

            'services.*.service_id.required_with' => 'A szolgáltatás azonosító megadása kötelező.',
            'services.*.service_id.exists' => 'A kiválasztott szolgáltatás nem létezik.',

            'services.*.piece.required_with' => 'A darabszám megadása kötelező.',
            'services.*.piece.integer' => 'A darabszám csak egész szám lehet.',
            'services.*.piece.min' => 'A darabszám legalább 1 kell legyen.',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $updateData = [];

        if ($request->has('description')) {
            $updateData['description'] = $request->description;
        }

        if ($request->has('realprice')) {
            $updateData['realprice'] = $request->realprice;
        }

        if (!empty($updateData)) {
            $treatment->update($updateData);
        }

        if ($request->has('services')) {
            $services = [];

            foreach ($request->services as $s) {
                $services[$s['service_id']] = [
                    'piece' => $s['piece']
                ];
            }

            $treatment->services()->sync($services);
        }

        return response()->json([
            'message' => 'Kezelés sikeresen frissítve.'
        ]);
    }

    public function destroy(Treatment $treatment)
{
    try {
        DB::transaction(function () use ($treatment) {
            $treatment->services()->detach();
            $treatment->delete();
        });

        return response()->json([
            'message' => 'Kezelés sikeresen törölve.'
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'error' => 'Hiba történt a kezelés törlése során.'
        ], 500);
    }
}
}