<?php

namespace App\Http\Controllers\Management;

use App\Http\Controllers\Controller;
use App\Models\Delivery;
use App\Models\Loan;
use App\Models\Publication;
use App\Notifications\LoanStatusUpdated;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LoanController extends Controller
{
    public function loanSearch(Request $request)
    {
        $search = $request->query('q');

        $results = Loan::with(['publication:id,title,author', 'user:id,name,email'])
            ->whereHas('publication', function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('author', 'like', "%{$search}%");
            })
            ->orWhereHas('user', function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            })
            ->limit(5)
            ->get();

        // Include publication & user info for the frontend
        $results->load(['publication:id,title,author', 'user:id,name,email']);

        // Format response
        $formatted = $results->map(function ($loan) {
            return [
                'id' => $loan->id,
                'title' => $loan->publication->title ?? '-',
                'author' => $loan->publication->author ?? '-',
                'name' => $loan->user->name ?? '-',
                'email' => $loan->user->email ?? '-',
                'status' => $loan->status,
                'due_date' => $loan->due_date?->format('Y-m-d'),
            ];
        });

        return response()->json($formatted);
    }
    public function loanIndex(Request $request)
    {
        $this->authorize('view loans');

        $query = Loan::with('user', 'publication');

        if (auth()->user()->hasRole('member')) {
            $query->where('user_id', auth()->id());
        }

        // filter by status
        if ($request->status) {
            $query->where('status', $request->status);
        }

        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->whereHas('publication', function ($pub) use ($request) {
                    $pub->where('title', 'like', "%{$request->search}%");
                })->orWhereHas('user', function ($user) use ($request) {
                    $user->where('name', 'like', "%{$request->search}%")
                        ->orWhere('email', 'like', "%{$request->search}%");
                });
            });
        }

        $loans = $query->paginate(10);

        return Inertia::render('Dashboard/Loans/Index', [
            'loans' => $loans,
            'filters' => $request->only('search')
        ]);
    }


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

        if ($validated['status'] === 'borrowed') {
            if (!$loan->delivery) {
                Delivery::create([
                    'loan_id' => $loan->id,
                    'tracking_number' => 'TRK-' . strtoupper(uniqid()),
                    'status' => 'pending',
                ]);
            }
        }

        $loan->user->notify(new LoanStatusUpdated($loan));

        return back()->with('success', 'Loan updated successfully.');
    }

    // public function checkOverdue()
    // {
    //     $loans = Loan::where('status', 'borrowed')
    //         ->where('due_date', '<', Carbon::today())
    //         ->get();

    //     foreach ($loans as $loan) {
    //         $daysOverdue = Carbon::today()->diffInDays($loan->due_date);
    //         $loan->update([
    //             'status' => 'overdue',
    //             'fine_amount' => $daysOverdue * 5000
    //         ]);
    //     }
    // }
}
