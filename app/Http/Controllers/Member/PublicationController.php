<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Location;
use App\Models\Publication;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicationController extends Controller
{
    public function publicationSearch(Request $request)
    {
        $search = $request->query('q');

        $results = Publication::query()
            ->where('title', 'like', "%{$search}%")
            ->orWhere('author', 'like', "%{$search}%")
            ->limit(5)
            ->get(['id', 'title', 'author']);

        return response()->json($results);
    }

    public function publicationIndex(Request $request)
    {
        $this->authorize('view publications');

        $query = Publication::with('category', 'location');

        // Filter by category
        if ($request->category_id) {
            $query->where('category_id', $request->category_id);
        }

        // filter by type
        if ($request->type) {
            $query->where('type', $request->type);
        }

        // filter by location
        if ($request->location_id) {
            $query->where('location_id', $request->location_id);
        }

        // Search by title or author
        // if ($request->search) {
        //     $query->where(function ($q) use ($request) {
        //         $q->where('title', 'like', "%{$request->search}%")
        //             ->orWhere('author', 'like', "%{$request->search}%");
        //     });
        // }

        // Pagination
        $publications = $query->paginate(16);

        $categories = Category::all();
        $locations = Location::all();

        return Inertia::render('Member/Publications/Index', [
            'publications' => $publications,
            'categories' => $categories,
            'locations' => $locations,
            'filters' => $request->only(['category_id',  'location_id', 'type']),
        ]);
    }



    public function publicationShow(Publication $publication)
    {
        $this->authorize('view publications');

        // if (!$publication) {
        //     return Inertia::render('Errors/NotFound', [
        //         'message' => 'Publication not found.'
        //     ])->toResponse(request())
        //         ->setStatusCode(404);
        // }

        return Inertia::render('Member/Publications/Show', [
            'publication' => $publication->load('category', 'location')->append('is_available'),
        ]);
    }
}
