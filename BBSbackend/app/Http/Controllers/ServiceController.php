<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;



class ServiceController extends Controller
{
    public function index()
    {
        return Service::orderBy('name')->get();
    }

    public function store(Request $request)
{
    $data = $request->validate([
        'name'  => 'required|string|max:255',
        'price' => 'required|integer|min:0',
    ], [
        'name.required' => 'A szolgáltatás neve kötelező.',
        'name.string'   => 'A szolgáltatás neve szöveg kell legyen.',
        'name.max'      => 'A szolgáltatás neve legfeljebb 255 karakter lehet.',

        'price.required' => 'Az ár megadása kötelező.',
        'price.integer'  => 'Az ár csak egész szám lehet.',
        'price.min'      => 'Az ár nem lehet negatív érték.'
    ]);

    $service = Service::create([
        ...$data,
        'active' => true,
    ]);

    return response()->json([
        'message' => 'Szolgáltatás sikeresen létrehozva.',
        'data' => $service
    ], 201);
}

    public function update(Request $request, Service $service)
    {
        $validator = Validator::make($request->all(), [
            'name'  => 'sometimes|string|max:255',
            'price' => 'sometimes|integer|min:0',
        ], [
            'name.string' => 'A szolgáltatás neve szöveg kell legyen.',
            'name.max' => 'A szolgáltatás neve legfeljebb 255 karakter lehet.',

            'price.integer' => 'Az ár csak egész szám lehet.',
            'price.min' => 'Az ár nem lehet negatív.'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        $updateData = [];

        if ($request->filled('name')) {
            $updateData['name'] = $request->name;
        }

        if ($request->has('price')) {
            $updateData['price'] = $request->price;
        }

        $service->update($updateData);

        return response()->json([
            'message' => 'Szolgáltatás sikeresen frissítve.',
            'service' => $service
        ]);
    }

    public function toggle(Service $service)
    {
        try {
            $service->active = !$service->active;
            $service->save();

            return response()->json([
                'message' => 'Szolgáltatás állapota módosítva.',
                'active'  => $service->active,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Hiba történt a státusz módosítása során.'
            ], 500);
        }
    }
}
