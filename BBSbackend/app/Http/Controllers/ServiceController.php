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
        ]);

        $service = Service::create([
            ...$data,
            'active' => true,
        ]);

        return response()->json($service, 201);
    }

    public function update(Request $request, Service $service)
    {
        $data = $request->validate([
            'name'  => 'required|string|max:255',
            'price' => 'required|integer|min:0',
        ]);

        $service->update($data);

        return response()->json($service);
    }

    public function toggle(Service $service)
{
    try {
        $service->active = !$service->active;
        $service->save();

        return response()->json([
            'success' => true,
            'active'  => $service->active,
        ]);
    } catch (\Exception $e) {
        return response()->json(['error' => $e->getMessage()], 500);
    }
}
}
