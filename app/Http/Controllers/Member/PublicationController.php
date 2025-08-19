<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\Publication;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicationController extends Controller
{
    public function publicationIndex(Request $request)
    {
        $this->authorize('view publications');

        $query = Publication::with('category', 'location');

        // Filter by category
        if ($request->category_id) {
            $query->where('category_id', $request->category_id);
        }

        // Search by title or author
        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', "%{$request->search}%")
                    ->orWhere('author', 'like', "%{$request->search}%");
            });
        }

        // Pagination
        $publications = $query->paginate(10);

        return Inertia::render('Member/Publications/Index', [
            'publications' => $publications,
            'filters' => $request->only(['category_id', 'search']),
        ]);
    }

    public function publicationShow(Publication $publication)
    {
        $this->authorize('view publications');


        if (!$publication) {
            return Inertia::render('Errors/NotFound', [
                'message' => 'Publication not found.'
            ])->toResponse(request())
                ->setStatusCode(404);
        }

        return Inertia::render('Member/Publications/Show', [
            'publication' => $publication->load('category', 'location'),
        ]);
    }
}
