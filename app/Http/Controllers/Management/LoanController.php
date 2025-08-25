<?php

namespace App\Http\Controllers\Management;

use App\Http\Controllers\Controller;
use App\Models\Loan;
use App\Models\Publication;
use App\Notifications\LoanStatusUpdated;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LoanController extends Controller
{
      public function loanIndex(Request $request)
    {
        $this->authorize('view loans');

        $query = Loan::with('user', 'publication');

        if (auth()->user()->hasRole('member')) {
            $query->where('user_id', auth()->id());
        }

        if ($request->search) {
            $query->whereHas('publication', function ($q) use ($request) {
                $q->where('title', 'like', "%{$request->search}%")
                    ->orWhere('author', 'like', "%{$request->search}%");
            });
        }

        $loans = $query->paginate(10);

        return Inertia::render('Dashboard/Loans/Index', [
            'loans' => $loans,
            'filters' => $request->only('search')
        ]);
    }

    // public function loanCreate()
    // {
    //     $this->authorize('create loans');

    //     $publications = Publication::all();

    //     return Inertia::render('Loans/Create', [
    //         'publications' => $publications
    //     ]);
    // }

    public function updateLoan(Request $request, Loan $loan)
    {
        $this->authorize('edit loans');

        $validated = $request->validate([
            'status' => 'required|in:borrowed,returned,overdue,pending',
        ]);

        // If approving a loan, check if the book is still available
        if ($validated['status'] === 'borrowed') {
            $bookTaken = Loan::where('publication_id', $loan->publication_id)
                ->where('id', '!=', $loan->id)
                ->whereIn('status', ['borrowed'])
                ->exists();

            if ($bookTaken) {
                return back()->withErrors([
                    'status' => 'Cannot approve this loan. The book is already borrowed.'
                ]);
            }
        }

        $loan->update($validated);

        $loan->user->notify(new LoanStatusUpdated($loan));

        return redirect()->route('loans.index')
            ->with('success', 'Loan updated successfully.');
    }

    public function checkOverdue()
    {
        $loans = Loan::where('status', 'borrowed')
            ->where('due_date', '<', Carbon::today())
            ->get();

        foreach ($loans as $loan) {
            $daysOverdue = Carbon::today()->diffInDays($loan->due_date);
            $loan->update([
                'status' => 'overdue',
                'fine_amount' => $daysOverdue * 5000
            ]);
        }
    }
}
