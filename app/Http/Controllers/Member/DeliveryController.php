<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\Delivery;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DeliveryController extends Controller
{
    public function deliverySearch(Request $request)
    {
        $search = $request->query('q');

        $results = Delivery::with(['loan.publication:id,title,author'])
            ->whereHas('loan', function ($q) {
                $q->where('user_id', auth()->id());
            })
            ->where(function ($q) use ($search) {
                $q->whereHas('loan.publication', function ($q2) use ($search) {
                    $q2->where('title', 'like', "%{$search}%")
                        ->orWhere('author', 'like', "%{$search}%");
                })
                    ->orWhere('courier', 'like', "%{$search}%");
            })
            ->limit(5)
            ->get();

        $formatted = $results->map(function ($delivery) {
            return [
                'id' => $delivery->id,
                'title' => $delivery->loan->publication->title ?? '-',
                'author' => $delivery->loan->publication->author ?? '-',
                'courier' => $delivery->courier ?? '-',
                'status' => $delivery->status,
                'tracking_number' => $delivery->tracking_number ?? '-',
                'created_at' => $delivery->created_at?->format('Y-m-d'),
            ];
        });

        return response()->json($formatted);
    }

    public function deliveryIndex(Request $request)
    {
        $this->authorize('view delivery');

        $search = $request->search;
        $status = $request->status;

        $query = Delivery::with(['loan.user.address', 'loan.publication'])
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
