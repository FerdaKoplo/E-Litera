<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\Loan;
use App\Models\User;
use App\Notifications\LoanRequested;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Notification;

class LoanController extends Controller
{
    public function loanSearch(Request $request)
    {
        $search = $request->query('q');

        $results = Loan::with(['publication:id,title,author'])
            ->where('user_id', auth()->id())
            ->whereHas('publication', function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('author', 'like', "%{$search}%");
            })
            ->limit(5)
            ->get();

        $formatted = $results->map(function ($loan) {
            return [
                'id' => $loan->id,
                'title' => $loan->publication->title ?? '-',
                'author' => $loan->publication->author ?? '-',
                'status' => $loan->status,
                'due_date' => $loan->due_date?->format('Y-m-d'),
            ];
        });

        return response()->json($formatted);
    }
    public function viewLoan(Request $request)
    {

        $this->authorize('view loans');

        $query = Loan::with('publication', 'user')
            ->where('user_id', auth()->id())
            ->orderBy('created_at', 'desc');

        // filter by status
        if ($request->status) {
            $query->where('status', $request->status);
        }

        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->whereHas('publication', function ($pub) use ($request) {
                    $pub->where('title', 'like', "%{$request->search}%");
                });
            });
        }

        $loans = $query->paginate(10);

        return Inertia::render('Member/Loans/Index', [
            'loans' => $loans,
        ]);
    }

    public function storeLoan(Request $request)
    {
        $this->authorize('create loans');

        $user = auth()->user();

        $userAddress = auth()->user()->address;

        if (
            !$userAddress ||
            !$userAddress->province_id ||
            !$userAddress->city_id ||
            !$userAddress->district_id ||
            !$userAddress->sub_district_id ||
            !$userAddress->postal_code ||
            !$userAddress->full_address
        ) {
            return back()->with('error', 'Please complete your address before requesting a loan.');
        }

        $validated = $request->validate([
            'publication_id' => 'required|exists:publications,id',
        ]);

        $bookTaken = Loan::where('publication_id', $validated['publication_id'])
            ->whereIn('status', ['pending', 'borrowed'])
            ->exists();


        if ($bookTaken) {
            return back()->with('error', 'This book is currently unavailable.');
        }

        $loanDurationDays = 7;
        $startDate = now();
        $dueDate = $startDate->copy()->addDays($loanDurationDays);

        $loan = Loan::create([
            'publication_id' => $validated['publication_id'],
            'user_id' => auth()->id(),
            'status' => 'pending',
            'start_date' => $startDate,
            'due_date' => $dueDate,
            'fine_amount' => 0,
        ]);


        $superAdmin = User::role('super-admin')->get();
        $librarian = User::role('librarian')->get();
        Notification::send($superAdmin->merge($librarian), new LoanRequested($loan));

        return redirect()->back()->with('success', 'Loan request submitted.');
    }
}
