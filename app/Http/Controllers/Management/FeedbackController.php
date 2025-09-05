<?php

namespace App\Http\Controllers\Management;

use App\Http\Controllers\Controller;
use App\Models\Feedback;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FeedbackController extends Controller
{
    public function feedbackIndex(Request $request)
    {
        $this->authorize('view feedback');

        $query = Feedback::with('user', 'publication');

        if (auth()->user()->hasRole('member')) {
            $query->where('user_id', auth()->id());
        }

         if ($request->filter === 'newest') {
            $query->latest();
        } elseif ($request->filter === '24h') {
            $query->where('created_at', '>=', now()->subDay());
        }

        $feedbacks = $query->paginate(10);

        return Inertia::render('Dashboard/Feedback/Index', [
            'feedbacks' => $feedbacks,
            'filters' => $request->only('search')
        ]);
    }
}
