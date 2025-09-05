<?php

namespace App\Http\Controllers\Management;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Feedback;
use App\Models\Loan;
use App\Models\Publication;
use Carbon\Carbon;
use DB;
use Illuminate\Http\Request;
use Inertia\Inertia;


class DashboardController extends Controller
{
    public function index(Request $request)
    {

        $loansTotal = Loan::count();
        $loansActive = Loan::where('status', 'borrowed')->count();
        $loansOverdue = Loan::where('status', 'overdue')->count();
        $publications = Publication::count();
        $articles = Article::count();

        $period = $request->get('period', 'all');
        if ($request->boolean('todayFilter')) {
            $period = 'today';
        } elseif ($request->boolean('sevenDaysFilter')) {
            $period = '7days';
        } elseif ($request->boolean('thirtyDaysFilter')) {
            $period = '30days';
        }

        $loanQuery = Loan::query();
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


        $highestRatedPublications = Feedback::query()
            ->with('publication:id,title')
            ->select('publication_id', DB::raw('AVG(rating) as avg_rating'))
            ->select('publication_id', DB::raw('AVG(rating) as avg_rating'), DB::raw('COUNT(*) as total_ratings'))
            ->when($period === 'today', fn($q) => $q->whereDate('created_at', Carbon::today()))
            ->when($period === '7days', fn($q) => $q->where('created_at', '>=', Carbon::now()->subDays(7)))
            ->when($period === '30days', fn($q) => $q->where('created_at', '>=', Carbon::now()->subDays(30)))
            ->groupBy('publication_id')
            ->orderByDesc('avg_rating')
            ->take(5)
            ->get()
            ->map(fn($feedback) => [
                'id' => $feedback->publication->id,
                'title' => $feedback->publication->title,
                'avg_rating' => round($feedback->avg_rating, 2),
                'total_ratings' => $feedback->total_ratings,
            ]);



        return Inertia::render('Dashboard/Dashboard', [
            'loansTotal' => $loansTotal,
            'loansActive' => $loansActive,
            'loansOverdue' => $loansOverdue,
            'publications' => $publications,
            'articles' => $articles,
            'notifications' => auth()->user()->notifications,
            'loanChartData' => $loanChartData,
            'highestRatedPublications' => $highestRatedPublications,
            'filters' => [
                'todayFilter' => $request->boolean('todayFilter'),
                'sevenDaysFilter' => $request->boolean('sevenDaysFilter'),
                'thirtyDaysFilter' => $request->boolean('thirtyDaysFilter'),
                'period' => $period,
            ],
        ]);
    }
}
