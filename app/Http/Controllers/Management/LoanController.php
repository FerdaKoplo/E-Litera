<?php

namespace App\Http\Controllers\Management;

use App\Http\Controllers\Controller;
use App\Models\Loan;
use App\Models\Publication;
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

        return Inertia::render('Loans/Index', [
            'loans' => $loans,
            'filters' => $request->only('search')
        ]);
    }

    public function loanShow(Loan $loan)
    {
        $this->authorize('view loans');

        if (auth()->user()->hasRole('member') && $loan->user_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('Loans/Show', [
            'loan' => $loan->load('user', 'publication'),
        ]);
    }

    public function loanCreate()
    {
        $this->authorize('create loans');

        $publications = Publication::all();

        return Inertia::render('Loans/Create', [
            'publications' => $publications
        ]);
    }

    public function storeLoan(Request $request)
    {
        $this->authorize('create loans');

        $validated = $request->validate([
            'publication_id' => 'required|exists:publications,id',
            'start_date' => 'required|date|after_or_equal:today',
            'due_date' => 'required|date|after:start_date',
        ]);

        // Check if the book taken
        $bookTaken = Loan::where('publication_id', $validated['publication_id'])
            ->whereIn('status', ['pending', 'borrowed'])
            ->exists();

        if ($bookTaken) {
            return back()->withErrors([
                'publication_id' => 'This book is currently unavailable.'
            ])->withInput();
        }

        Loan::create(array_merge($validated, [
            'user_id' => auth()->id(),
            'status' => 'borrowed',
            'fine_amount' => 0
        ]));

        return redirect()->route('loans.index')
            ->with('success', 'Loan request submitted.');
    }

    public function updateLoan(Request $request, Loan $loan)
    {
        $this->authorize('edit loans');

        $validated = $request->validate([
            'status' => 'required|in:borrowed,returned,overdue',
            'fine_amount' => 'nullable|numeric|min:0'
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

        $loan->update([
            'status' => $validated['status'],
            'fine_amount' => $validated['fine_amount'] ?? 0
        ]);

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
