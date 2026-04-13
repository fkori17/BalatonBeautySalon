<?php

namespace App\Http\Controllers;

use App\Models\Treatment;
use App\Models\Customer;
use Illuminate\Support\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TreatmentController extends Controller
{
    public function index()
    {
        
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
            'member_since' => $user->created_at->format('Y-m-d')
        ];
    }
    

    
    public function adminStats()
    {
        return response()->json([
            'totalClients' => Customer::count(),

            'activeClients' => Treatment::where(
                'created_at',
                '>=',
                Carbon::now()->subMonths(3)
            )
            ->distinct('customer_id')
            ->count('customer_id'),

            'monthlyTreatments' => Treatment::whereMonth('created_at', now()->month)
                ->whereYear('created_at', now()->year)
                ->count(),

            'monthlyRevenue' => Treatment::whereMonth('created_at', now()->month)
                ->whereYear('created_at', now()->year)
                ->sum('realprice'),
        ]);
    }


    public function adminRecentTreatments()
    {
        $treatments = Treatment::with(['customer', 'serviceLinks.service'])
            ->orderByDesc('created_at')
            ->limit(5)
            ->get()
            ->map(function ($t) {
                return [
                    'id' => $t->id,
                    'date' => $t->created_at,
                    'client' => $t->customer->name ?? '-',
                    'service' => $t->serviceLinks
                        ->filter(fn ($l) => $l->service)
                        ->map(fn ($l) => $l->service->name)
                        ->implode(', '),
                    'price' => $t->realprice,
                ];
            });

        return response()->json($treatments);
    }
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
    public function serviceStatsLast3Months(Request $request)
    {
        $user = $request->user();

        $threeMonthsAgo = Carbon::now()->subMonths(3);

        $treatments = Treatment::with(['services:id,name'])
            ->where('customer_id', $user->id)
            ->where('created_at', '>=', $threeMonthsAgo)
            ->get();

        $serviceCounts = [];

        foreach ($treatments as $treatment) {

            
            $uniqueServices = $treatment->services->unique('id');

            foreach ($uniqueServices as $service) {
                $name = $service->name;

                if (!isset($serviceCounts[$name])) {
                    $serviceCounts[$name] = 0;
                }

                $serviceCounts[$name]++; 
            }
        }

        
        $result = collect($serviceCounts)
            ->map(function ($count, $name) {
                return [
                    'name' => $name,
                    'count' => $count
                ];
            })
            ->sortByDesc('count')
            ->values();

        return response()->json($result);
    }
}
