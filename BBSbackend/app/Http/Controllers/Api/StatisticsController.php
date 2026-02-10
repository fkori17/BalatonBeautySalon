<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use App\Models\Treatment;
use App\Models\ServiceTreatmentLink;
use Illuminate\Http\Request;
use Carbon\Carbon;

class StatisticsController extends Controller
{
    public function index()
    {
        $now = Carbon::now();
        $last12Months = $this->getLast12Months();

        // --- 1. ÜGYFÉL STATISZTIKÁK ---
        // Fontos: Ehhez a Customer modelben kell lennie a treatments() függvénynek!
        $customerStats = [
            'total' => Customer::count(),
            'returning' => Customer::has('treatment', '>=', 2)->count(),
            'active' => Customer::whereHas('treatment', function ($q) {
                $q->where('created_at', '>=', Carbon::now()->subMonths(3));
            })->count(),
            'new_this_month' => Customer::whereMonth('created_at', $now->month)
                                        ->whereYear('created_at', $now->year)
                                        ->count(),
        ];

        // --- 2. PÉNZÜGYI STATISZTIKÁK (realprice alapján) ---
        // Sokkal egyszerűbb: csak összeadjuk a kezelések végösszegét
        $totalRevenue = Treatment::sum('realprice');
        
        $revenue365 = Treatment::where('created_at', '>=', Carbon::now()->subDays(365))
            ->sum('realprice');

        $revenueMonth = Treatment::whereMonth('created_at', $now->month)
            ->whereYear('created_at', $now->year)
            ->sum('realprice');

        $financialStats = [
            'total_revenue' => $totalRevenue,
            'revenue_365' => $revenue365,
            'revenue_month' => $revenueMonth,
            'daily_avg' => round($revenue365 / 365), 
        ];

        // --- 3. KEZELÉS STATISZTIKÁK ---
        $totalTreatments = Treatment::count();
        $treatments30Days = Treatment::where('created_at', '>=', Carbon::now()->subDays(30))->count();
        
        // Átlag szolgáltatás szám: Összes link sor / Összes kezelés
        // A ServiceTreatmentLink modellt használjuk közvetlenül
        $totalLinks = ServiceTreatmentLink::sum('piece'); // Ha a darabszám is számít
        // VAGY: $totalLinks = ServiceTreatmentLink::count(); // Ha csak a sorok száma kell
        
        $avgServices = $totalTreatments > 0 ? round($totalLinks / $totalTreatments, 1) : 0;

        $treatmentStats = [
            'total' => $totalTreatments,
            'last_30_days' => $treatments30Days,
            'daily_avg' => round($treatments30Days / 30, 1),
            'avg_services' => $avgServices,
        ];

        // --- GRAFIKON ADATOK ---
        $charts = [
            'new_customers' => $this->getMonthlyData(Customer::class, 'created_at', $last12Months),
            'revenue' => $this->getMonthlyRevenue($last12Months), // Ez is realprice-ból megy majd
            'treatments' => $this->getMonthlyData(Treatment::class, 'created_at', $last12Months),
            'avg_cart' => $this->getMonthlyAvgCart($last12Months),
        ];

        return response()->json([
            'customers' => $customerStats,
            'financial' => $financialStats,
            'treatments' => $treatmentStats,
            'charts' => $charts
        ]);
    }

    private function getLast12Months() {
        $months = [];
        for ($i = 11; $i >= 0; $i--) {
            $months[] = Carbon::now()->subMonths($i);
        }
        return $months;
    }

    private function getMonthlyData($model, $dateCol, $months) {
        $data = [];
        foreach ($months as $date) {
            $count = $model::whereYear($dateCol, $date->year)
                           ->whereMonth($dateCol, $date->month)
                           ->count();
            $data[] = ['name' => $this->getHunMonth($date->month), 'v' => $count];
        }
        return $data;
    }

    private function getMonthlyRevenue($months) {
        $data = [];
        foreach ($months as $date) {
            // Itt most a Treatment realprice mezőjét összegezzük
            $sum = Treatment::whereYear('created_at', $date->year)
                            ->whereMonth('created_at', $date->month)
                            ->sum('realprice');
            
            $data[] = ['name' => $this->getHunMonth($date->month), 'v' => $sum];
        }
        return $data;
    }

    private function getMonthlyAvgCart($months) {
        $data = [];
        foreach ($months as $date) {
            $monthlyTreatments = Treatment::whereYear('created_at', $date->year)
                                          ->whereMonth('created_at', $date->month);
            
            $revenue = (clone $monthlyTreatments)->sum('realprice');
            $count = (clone $monthlyTreatments)->count();

            $avg = $count > 0 ? round($revenue / $count) : 0;
            $data[] = ['name' => $this->getHunMonth($date->month), 'v' => $avg];
        }
        return $data;
    }

    private function getHunMonth($m) {
        $names = ['', 'Jan', 'Feb', 'Már', 'Ápr', 'Máj', 'Jún', 'Júl', 'Aug', 'Szep', 'Okt', 'Nov', 'Dec'];
        return $names[$m];
    }
}