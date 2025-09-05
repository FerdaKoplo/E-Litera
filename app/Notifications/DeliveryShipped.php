<?php

namespace App\Notifications;

use App\Models\Delivery;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class DeliveryShipped extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     */

    protected Delivery $delivery;
    public function __construct(Delivery $delivery)
    {
        $this->delivery = $delivery;
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
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->line('The introduction to the notification.')
            ->action('Notification Action', url('/'))
            ->line('Thank you for using our application!');
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */

    public function toDatabase($notifiable): array
    {
        return [
            'delivery_id' => $this->delivery->id,
            'tracking_number' => $this->delivery->tracking_number,
            'courier' => $this->delivery->courier,
            'status' => $this->delivery->status,
            'message' => $this->buildMessage($this->delivery->status),
            'updated_at' => now(),
        ];
    }

     protected function buildMessage(string $status): string
    {
        return match($status) {
            'pending' => "Your delivery is pending.",
            'shipped' => "Your delivery has been shipped.",
            'delivered' => "Your delivery has been delivered.",
            'cancelled' => "Your delivery has been cancelled.",
            default => "Delivery status updated.",
        };
    }
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
