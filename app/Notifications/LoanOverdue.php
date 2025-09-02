<?php

namespace App\Notifications;

use App\Models\Loan;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class LoanOverdue extends Notification implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new notification instance.
     */
    protected Loan $loan;

    public function __construct(Loan $loan)
    {
        $this->loan = $loan;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    /**
     * Get the mail representation of the notification.
     */
    // public function toMail(object $notifiable): MailMessage
    // {
    //     return (new MailMessage)
    //                 ->line('The introduction to the notification.')
    //                 ->action('Notification Action', url('/'))
    //                 ->line('Thank you for using our application!');
    // }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */

    public function toDatabase($notifiable): array
    {
        return [
            'loan_id' => $this->loan->id,
            'publication_title' => $this->loan->publication->title,
            'status' => 'overdue',
            'fine_amount' => $this->loan->fine_amount,
            'message' => "Your loan for '{$this->loan->publication->title}' is overdue. Fine: {$this->loan->fine_amount} IDR",
            'updated_at' => now(),
        ];
    }
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
