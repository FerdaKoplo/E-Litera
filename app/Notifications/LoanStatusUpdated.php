<?php

namespace App\Notifications;

use App\Models\Loan;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class LoanStatusUpdated extends Notification
{
    use Queueable;

    protected Loan $loan;

    /**
     * Create a new notification instance.
     */
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
        return ['database', 'mail'];
    }

    /**
     * Get the mail representation of the notification.
     */

    public function toDatabase($notifiable)
    {
        return [
            'loan_id' => $this->loan->id,
            'publication_title' => $this->loan->publication->title,
            'status' => $this->loan->status,
            'message' => "Your loan request for '{$this->loan->publication->title}' is now '{$this->loan->status}'.",
            'updated_at' => now(),
        ];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject("Loan Request Update: {$this->loan->publication->title}")
            ->greeting("Hello {$notifiable->name},")
            ->line("Your loan request for '{$this->loan->publication->title}' has been updated.")
            ->line("Current status: '{$this->loan->status}'.")
            ->action('View Loan Details', url(route('loans.show', $this->loan->id)))
            ->line('Thank you for using our library system!');
    }
    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
