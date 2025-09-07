<?php

namespace App\Http\Controllers\Management;

use App\Http\Controllers\Controller;
use App\Models\Delivery;
use App\Notifications\DeliveryShipped;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DeliveryController extends Controller
{
    public function deliveryIndex(Request $request)
    {
        $this->authorize('view delivery');

        $search = $request->search;
        $status = $request->status;

        $query = Delivery::with(['loan.user.address', 'loan.publication']);

        if ($status) {
            $query->where('status', $status);
        }

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->whereHas('loan.user', function ($q2) use ($search) {
                    $q2->where('name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%");
                })
                    ->orWhereHas('loan.publication', function ($q2) use ($search) {
                        $q2->where('title', 'like', "%{$search}%");
                    })
                    ->orWhere('courier', 'like', "%{$search}%");
            });
        }
        $deliveries = $query->orderBy('created_at', 'desc')->paginate(10);

        return Inertia::render('Dashboard/Delivery/Index', [
            'deliveries' => $deliveries,
            'filters' => $request->only('search', 'status')
        ]);
    }

    public function editDelivery(Delivery $delivery)
    {
        $this->authorize('edit delivery');

        return Inertia::render('Dashboard/Delivery/Edit', [
            'delivery' => $delivery->load(['loan.user', 'loan.publication']),
        ]);
    }

    public function updateDelivery(Request $request, Delivery $delivery)
    {
        $this->authorize('edit delivery');

        $validated = $request->validate([
            'status' => 'required|in:pending,shipped,delivered,cancelled',
            'courier' => 'nullable|string|max:255',
            'tracking_number' => 'nullable|string|max:255|unique:deliveries,tracking_number,' . $delivery->id,
        ]);


        $delivery->update($validated);
        if ($delivery->loan && $delivery->loan->user) {
            $delivery->loan->user->notify(new DeliveryShipped($delivery));
        }


        return redirect()->route('delivery.index')
            ->with('success', 'Delivery updated successfully.');
    }
}
