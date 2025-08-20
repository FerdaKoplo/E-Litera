<?php

namespace App\Http\Controllers\Management;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ArticleController extends Controller
{
    public function articleIndex(Request $request)
    {
        $this->authorize('view articles');

        $query = Article::query();

        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('title_article', 'like', "%{$request->search}%");
            });
        }
        $articles = $query->with('user')->paginate(10);


        return Inertia::render('Dashboard/Article/Index', [
            'articles' => $articles
        ]);
    }

    public function articleShow(Article $article)
    {
        $this->authorize('view articles');

        return Inertia::render('Dashboard/Article/Show', [
            'article' => $article
        ]);
    }

    public function createArticle()
    {
        $this->authorize('create articles');

        return Inertia::render('Dashboard/Article/Create');
    }

    public function storeArticle(Request $request)
    {
        $validated = $request->validate([
            'title_article' => 'required|string|max:255',
            'article_text_content' => 'required|string',
            'images' => 'nullable|array',
            'images.*' => 'file|image|max:2048'
        ]);

        $article = Article::create([
            'user_id' => auth()->id(),
            'title_article' => $validated['title_article'],
            'article_text_content' => $validated['article_text_content'],
        ]);

        if ($request->hasFile('images')) {
            $urls = [];
            foreach ($request->file('images') as $image) {
                $urls[] = $image->store('article_images', 'public');
            }
            $article->images = $urls;
            $article->save();
        }

        return redirect()->route('articles.index')->with('success', 'Article created successfully.');
    }

    public function editArticle(Article $article)
    {
        $this->authorize('edit articles');

        return Inertia::render('Dashboard/Article/Edit', [
            'article' => $article->load('images')
        ]);
    }

    public function updateArticle(Request $request, Article $article)
    {
        $this->authorize('edit articles');

        $validated = $request->validate([
            'title_article' => 'required|string|max:255',
            'article_text_content' => 'required|string',
        ]);

        $article->update([
            'title_article' => $validated['title_article'],
            'article_text_content' => $validated['article_text_content'],
        ]);

        // if ($request->hasFile('images')) {
        //     foreach ($request->file('images') as $image) {
        //         $path = $image->store('article_images', 'public');
        //         ArticleImage::create([
        //             'article_id' => $article->id,
        //             'article_image_content_path' => $path,
        //         ]);
        //     }
        // }

        return redirect()->route('articles.show', $article->id)
            ->with('success', 'Article updated successfully.');
    }

    public function uploadImage(Request $request)
    {
        $request->validate([
            'image' => 'required|image|max:2048',
        ]);

        $path = $request->file('image')->store('article_images', 'public');

        return response()->json([
            'url' => asset('storage/' . $path),
        ]);
    }

    public function deleteArticle(Article $article)
    {
        $this->authorize('delete articles');

        $article->images()->delete();
        $article->delete();

        return redirect()->route('articles.index')
            ->with('success', 'Article deleted successfully.');
    }
}
