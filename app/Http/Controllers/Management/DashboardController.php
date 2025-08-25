<?php

namespace App\Http\Controllers\Management;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Loan;
use App\Models\Publication;
use Illuminate\Http\Request;
use Inertia\Inertia;


class DashboardController extends Controller
{
    public function index()
    {

        $loansTotal = Loan::count();
        $loansActive = Loan::where('status', 'borrowed')->count();
        $loansOverdue = Loan::where('status', 'overdue')->count();
        $publications = Publication::count();
        $articles = Article::count();
        $loanChartData = Loan::selectRaw("DATE(created_at) as date, COUNT(*) as count")
            ->groupBy("date")
            ->orderBy("date")
            ->get()
            ->makeHidden([])
            ->toArray();

        return Inertia::render('Dashboard/Dashboard', [
            'loansTotal' => $loansTotal,
            'loansActive' => $loansActive,
            'loansOverdue' => $loansOverdue,
            'publications' => $publications,
            'articles' => $articles,
            'notifications' => auth()->user()->notifications,
            'loanChartData' => $loanChartData,
        ]);
    }
}
