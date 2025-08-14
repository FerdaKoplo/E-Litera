<?php

namespace App\Http\Controllers;

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

        return Inertia::render('Publications/Index', [
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

        return Inertia::render('Publications/Show', [
            'publication' => $publication->load('category', 'location'),
        ]);
    }

    public function publicationCreate()
    {
        $this->authorize('create publications');

        $publications = Publication::all();

        return Inertia::render('Publications/Create', [
            'publications' => $publications
        ]);
    }

    public function storePublication(Request $request)
    {

        $validateData = $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'nullable|string|max:255',
            'type' => 'required|in:ebook,physical,journal',
            'category_id' => 'required|exists:categories,id',
            'location_id' => 'nullable|exists:locations,id'
        ]);

        Publication::create($validateData);

        return redirect()->route('publications.index')
            ->with('success', 'Publication created successfully.');
    }

    public function editPublication(Publication $publication)
    {
        $this->authorize('edit categories');

        $publications = Publication::where('id', '!=', $publication->id)->get();
        return Inertia::render('Publication/Edit', [
            'publication' => $publication,
            'publications' => $publications
        ]);
    }

    public function updatePublication(Request $request, Publication $publication)
    {
        if (!$publication) {
            return Inertia::render('Errors/NotFound', [
                'message' => 'Publication not found.'
            ])->toResponse(request())
                ->setStatusCode(404);
        }


        $validateData = $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'nullable|string|max:255',
            'type' => 'required|in:ebook,physical,journal',
            'category_id' => 'required|exists:categories,id',
            'location_id' => 'nullable|exists:locations,id'
        ]);

        $publication->update($validateData);

        return redirect()->route('publications.index')
            ->with('success', 'Publication updated successfully.');
    }

    public function deletePublication(Publication $publication)
    {
        if (!$publication) {
            return Inertia::render('Errors/NotFound', [
                'message' => 'Publication not found.'
            ])->toResponse(request())
                ->setStatusCode(404);
        }

        $this->authorize('delete publications');

        $publication->delete();

        return redirect()->route('publications.index')
            ->with('success', 'Publication deleted successfully.');
    }
}
