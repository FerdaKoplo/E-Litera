<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\Loan;
use App\Models\User;
use App\Notifications\LoanRequested;
use Illuminate\Http\Request;
use Notification;

class LoanController extends Controller
{
    public function storeLoan(Request $request)
    {
        $this->authorize('create loans');

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
