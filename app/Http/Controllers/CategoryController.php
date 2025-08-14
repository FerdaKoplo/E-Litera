<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function categoryIndex()
    {
        $this->authorize('view categories');

        $categories = Category::with('parent')->get();

        return Inertia::render('Categories/Index', [
            'categories' => $categories
        ]);
    }

    public function categoryShow(Category $category)
    {
        $this->authorize('view categories');

        return inertia::render('Categories/Show', [
            'category' => $category
        ]);
    }

    public function createCategory()
    {
        $this->authorize('create categories');
        $categories = Category::all();

        return Inertia::render('Categories/Create', [
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
        return Inertia::render('Categories/Edit', [
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
