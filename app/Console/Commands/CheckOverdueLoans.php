<?php

namespace App\Console\Commands;

use App\Models\Loan;
use App\Notifications\LoanOverdue;
use Carbon\Carbon;
use Illuminate\Console\Command;

class CheckOverdueLoans extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:check-overdue-loans';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
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

        $loan->user->notify(new LoanOverdue($loan));
    }
}
