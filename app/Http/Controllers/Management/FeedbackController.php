<?php

namespace App\Http\Controllers\Management;

use App\Http\Controllers\Controller;
use App\Models\Feedback;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FeedbackController extends Controller
{
    public function feedbackSearch(Request $request)
{
    $search = $request->query('q');

    $results = Feedback::with(['user:id,name,email', 'publication:id,title,author'])
        ->whereHas('user', function ($q) use ($search) {
            $q->where('name', 'like', "%{$search}%")
              ->orWhere('email', 'like', "%{$search}%");
        })
        ->orWhereHas('publication', function ($q) use ($search) {
            $q->where('title', 'like', "%{$search}%");
        })
        ->orWhere('review', 'like', "%{$search}%")
        ->limit(5)
        ->get();

    $formatted = $results->map(function ($feedback) {
        return [
            'id' => $feedback->id,
            'review' => $feedback->review ?? '-',
            'name' => $feedback->user->name ?? '-',
            'email' => $feedback->user->email ?? '-',
            'title' => $feedback->publication->title ?? '-',
            'author' => $feedback->publication->author ?? '-',
        ];
    });

    return response()->json($formatted);
}
    public function feedbackIndex(Request $request)
    {
        $this->authorize('view feedback');

        $query = Feedback::with('user', 'publication');

        if (auth()->user()->hasRole('member')) {
            $query->where('user_id', auth()->id());
        }

        if ($request->search) {
            $query->whereHas('user', fn($q) => $q->where('name', 'like', "%{$request->search}%"))
                ->orWhereHas('publication', fn($q) => $q->where('title', 'like', "%{$request->search}%"))
                ->orWhere('review', 'like', "%{$request->search}%");
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
