<?php

namespace App\Http\Controllers\Management;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
     public function categoryIndex(Request $request)
    {
        $this->authorize('view categories');

        $query = Category::with('parent');

        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', "%{$request->search}%")
                    ->orWhere('type', 'like', "%{$request->search}%");
            });
        }

        $categories = $query->paginate(10);

        return Inertia::render('Dashboard/Category/Index', [
            'categories' => $categories,
            'filters' => $request->only('search'),
            'breadcrumbs' => [
                ['name' => 'Categories']
            ]
        ]);
    }

    public function createCategory()
    {
        $this->authorize('create categories');
        $categories = Category::all();

        return Inertia::render('Dashboard/Category/Create', [
            'categories' => $categories
        ]);
    }

    public function storeCategory(Request $request)
    {
        $this->authorize('create categories');

        $validateData = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:book,journal',
            'parent_category_id' => 'nullable|exists:categories,id'
        ]);

        Category::create($validateData);

        return redirect()->route('categories.index')
            ->with('success', 'Category created successfully.');
    }

    public function categoryEdit(Category $category)
    {
        $this->authorize('edit categories');

        $categories = Category::where('id', '!=', $category->id)->get();
        return Inertia::render('Dashboard/Category/Edit', [
            'category' => $category,
            'categories' => $categories
        ]);
    }

    public function updateCategory(Request $request, Category $category)
    {
        $this->authorize('create categories');

        $validateData = $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|in:book,journal',
            'parent_category_id' => 'nullable|exists:categories,id'
        ]);

        $category->update($validateData);

        return redirect()->route('categories.index')
            ->with('success', 'Category updated successfully.');
    }

    public function deleteCategory(Category $category)
    {
        $this->authorize('delete categories');

        $category->delete();

        return redirect()->route('categories.index')
            ->with('success', 'Category deleted successfully.');
    }
}
