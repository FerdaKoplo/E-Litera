<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\Loan;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $loanQuery = Loan::query()
            ->where('user_id', auth()->id());

        if ($request->boolean('todayFilter')) {
            $period = 'today';
        } elseif ($request->boolean('sevenDaysFilter')) {
            $period = '7days';
        } elseif ($request->boolean('thirtyDaysFilter')) {
            $period = '30days';
        }

        $period = $request->get('period', 'all');

        if ($period === 'today') {
            $loanQuery->whereDate('created_at', Carbon::today());
        } elseif ($period === '7days') {
            $loanQuery->where('created_at', '>=', Carbon::now()->subDays(7));
        } elseif ($period === '30days') {
            $loanQuery->where('created_at', '>=', Carbon::now()->subDays(30));
        }

        $loanChartData = $loanQuery
            ->selectRaw("DATE(created_at) as date, COUNT(*) as count")
            ->groupBy("date")
            ->orderBy("date")
            ->get()
            ->toArray();

        return Inertia::render('Member/Dashboard', [
            'loanChartData' => $loanChartData,
            'filters' => [
                'todayFilter' => $request->boolean('todayFilter'),
                'sevenDaysFilter' => $request->boolean('sevenDaysFilter'),
                'thirtyDaysFilter' => $request->boolean('thirtyDaysFilter'),
                'period' => $period,
            ],
        ]);
    }
}
