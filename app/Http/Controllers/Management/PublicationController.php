<?php

namespace App\Http\Controllers\Management;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Location;
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


        return Inertia::render('Dashboard/Publications/Index', [
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

        return Inertia::render('Dashboard/Publications/Show', [
            'publication' => $publication->load('category', 'location'),
        ]);
    }

    public function publicationCreate()
    {
        $this->authorize('create publications');

        $categories = Category::select('id', 'name')->get();
        $locations = Location::select('id', 'name')->get();

        return Inertia::render('Dashboard/Publications/Create', [
            'categories' => $categories,
            'locations' => $locations,
        ]);
    }

    public function storePublication(Request $request)
    {

        $validateData = $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'nullable|string|max:255',
            'type' => 'required|in:ebook,physical,journal',
            'publication_description' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'location_id' => 'nullable|exists:locations,id',
            'pdf_url' => 'nullable|file|mimes:pdf|max:20480',
            'image_url' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
        ]);

        if ($request->hasFile('pdf_url')) {
            $pdfPath = $request->file('pdf_url')->store('public/publications');
            $validateData['pdf_url'] = str_replace('public/', 'storage/', $pdfPath);
        }

        if ($request->hasFile('image_url')) {
            $imagePath = $request->file('image_url')->store('public/publications');
            $validateData['image_url'] = str_replace('public/', 'storage/', $imagePath);
        }

        Publication::create($validateData);

        return redirect()->route('publications.index')
            ->with('success', 'Publication created successfully.');
    }

    public function editPublication(Publication $publication)
    {
        $this->authorize('edit publications');
        $categories = Category::select('id', 'name')->get();
        $locations = Location::select('id', 'name')->get();

        $publications = Publication::where('id', '!=', $publication->id)->get();
        $publication->load('category', 'location');

        return Inertia::render('Dashboard/Publications/Edit', [
            'publication' => [
                'id' => $publication->id,
                'title' => $publication->title,
                'author' => $publication->author,
                'type' => $publication->type,
                'publication_description' => $publication->publication_description,
                'category_id' => $publication->category_id,
                'location_id' => $publication->location_id ?? "",
                'download_count' => (string) $publication->download_count,
                'pdf_url' => $publication->pdf_url,
                'image_url' => $publication->image_url,
            ],
            'categories' => $categories,
            'locations' => $locations,
            'publications' => $publications
        ]);
    }

    public function updatePublication(Request $request, Publication $publication)
    {
        if (!$publication) {
            return Inertia::render('Errors/NotFound', [
                'message' => 'Publication not found.'
            ])->toResponse($request)->setStatusCode(404);
        }

        $request->merge([
            'category_id' => $request->category_id !== '' ? $request->category_id : null,
            'location_id' => $request->location_id !== '' ? $request->location_id : null,
        ]);

        $validateData = $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'nullable|string|max:255',
            'type' => 'required|in:ebook,physical,journal',
            'publication_description' => 'required|string|max:255',
            'category_id' => 'required|integer|exists:categories,id',
            'location_id' => 'nullable|integer|exists:locations,id',
            'pdf_url' => 'nullable|file|mimes:pdf|max:20480',
            'image_url' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:5120',
        ]);

        if ($request->hasFile('pdf_url')) {
            $pdfPath = $request->file('pdf_url')->store('public/publications');
            $validateData['pdf_url'] = str_replace('public/', 'storage/', $pdfPath);
        }

        if ($request->hasFile('image_url')) {
            $imagePath = $request->file('image_url')->store('public/publications');
            $validateData['image_url'] = str_replace('public/', 'storage/', $imagePath);
        }

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
