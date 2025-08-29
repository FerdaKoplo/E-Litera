<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\Feedback;
use App\Models\Publication;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FeedbackController extends Controller
{
    public function viewFeedback(Request $request, Publication $publication)
    {
        $this->authorize('view feedback');

        $query = $publication->feedbacks()->with('user');

        if ($request->filter === 'newest') {
            $query->latest();
        } elseif ($request->filter === '24h') {
            $query->where('created_at', '>=', now()->subDay());
        }

        return response()->json($query->paginate(10));
    }


    public function storeFeedback(Request $request)
    {
        $this->authorize('create feedback');

        $validated = $request->validate([
            'publication_id' => 'required|exists:publications,id',
            'rating' => 'nullable|integer|min:1|max:5',
            'review' => 'nullable|string',
        ]);

        $validated['user_id'] = auth()->id();

        $existingFeedback = Feedback::where('user_id', $validated['user_id'])
            ->where('publication_id', $validated['publication_id'])
            ->first();

        if ($existingFeedback) {
            return redirect()->route('publications.member.show', $validated['publication_id'])
                ->with('error', 'You have already submitted feedback for this publication.');
        }

        Feedback::create($validated);

        return redirect()->back()->with('success', 'Feedback submitted successfully.');
    }

    public function updateFeedback(Request $request, Feedback $feedback)
    {
        $this->authorize('edit feedback');

        if (auth()->user()->hasRole('member') && $feedback->user_id !== auth()->id()) {
            abort(403);
        }

        $validated = $request->validate([
            'rating' => 'nullable|integer|min:1|max:5',
            'review' => 'nullable|string',
        ]);

        $feedback->update($validated);

        return redirect()->route('publications.show', $feedback->publication_id)
            ->with('success', 'Feedback updated successfully.');
    }

    public function deleteFeedback(Feedback $feedback)
    {
        $this->authorize('delete feedback');

        if (auth()->user()->hasRole('member') && $feedback->user_id !== auth()->id()) {
            abort(403);
        }

        $feedback->delete();

        return redirect()->route('publications.show', $feedback->publication_id)
            ->with('success', 'Feedback deleted successfully.');
    }
}
