<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\Delivery;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DeliveryController extends Controller
{

    public function deliveryIndex(Request $request)
    {
        $this->authorize('view delivery');

        $search = $request->search;
        $status = $request->status;

         $query = Delivery::with(['loan.user', 'loan.publication'])
            ->whereHas('loan', function ($q) {
                $q->where('user_id', auth()->id());
            });

        if ($status) {
            $query->where('status', $status);
        }

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->whereHas('loan.publication', function ($q2) use ($search) {
                    $q2->where('title', 'like', "%{$search}%");
                })->orWhere('courier', 'like', "%{$search}%");
            });
        }
        $deliveries = $query->orderBy('created_at', 'desc')->paginate(10);

        return Inertia::render('Member/Delivery/Index', [
            'deliveries' => $deliveries,
            'filters' => $request->only('search', 'status')
        ]);
    }
}
