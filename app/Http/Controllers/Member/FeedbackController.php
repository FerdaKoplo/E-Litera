<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class FeedbackController extends Controller
{
       public function feedbackShow(Feedback $feedback)
    {
        $this->authorize('view feedback');

        if (auth()->user()->hasRole('member') && $feedback->user_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('Feedback/Show', [
            'feedback' => $feedback->load('user', 'publication'),
        ]);
    }
    public function feedbackCreate(Publication $publication)
    {
        $this->authorize('create feedback');

        return Inertia::render('Feedback/Create', [
            'publication' => $publication
        ]);
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

        Feedback::create($validated);

        return redirect()->route('publications.index')
            ->with('success', 'Feedback submitted successfully.');
    }

    public function feedbackEdit(Feedback $feedback)
    {
        $this->authorize('edit feedback');

        if (auth()->user()->hasRole('member') && $feedback->user_id !== auth()->id()) {
            abort(403);
        }

        return Inertia::render('Feedback/Edit', [
            'feedback' => $feedback
        ]);
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
