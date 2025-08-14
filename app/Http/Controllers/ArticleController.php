<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\ArticleImage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ArticleController extends Controller
{

    public function articleIndex()
    {
        $this->authorize('view articles');

        $articles = Article::with('images')->get();

        return Inertia::render('Article/Index', [
            'articles' => $articles
        ]);
    }

    public function articleShow(Article $article)
    {
        $this->authorize('view articles');

          return Inertia::render('Article/Show', [
            'article' => $article->load('images')
        ]);
    }

    public function createArticle()
    {
        $this->authorize('create articles');
        return Inertia::render('Article/Create');
    }

    public function storeArticle(Request $request)
    {
        $this->authorize('create articles');

        $validated = $request->validate([
            'title_article' => 'required|string|max:255',
            'article_text_content' => 'required|string',
            'images.*' => 'nullable|image|max:2048',
        ]);

        $article = Article::create([
            'user_id' => auth()->id(),
            'title_article' => $validated['title_article'],
            'article_text_content' => $validated['article_text_content'],
        ]);

        if($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('article_images', 'public');
                ArticleImage::create([
                    'article_id' => $article->id,
                    'article_image_content_path' => $path,
                ]);
            }
        }

        return redirect()->route('articles.index')
                         ->with('success', 'Article created successfully.');
    }

    public function editArticle(Article $article)
    {
         $this->authorize('edit articles');

        return Inertia::render('Article/Edit', [
            'article' => $article->load('images')
        ]);
    }

    public function updateArticle(Request $request, Article $article)
    {
        $this->authorize('edit articles');

        $validated = $request->validate([
            'title_article' => 'required|string|max:255',
            'article_text_content' => 'required|string',
            'images.*' => 'nullable|image|max:2048',
        ]);

        $article->update([
            'title_article' => $validated['title_article'],
            'article_text_content' => $validated['article_text_content'],
        ]);

        if($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('article_images', 'public');
                ArticleImage::create([
                    'article_id' => $article->id,
                    'article_image_content_path' => $path,
                ]);
            }
        }

        return redirect()->route('articles.show', $article->id)
                         ->with('success', 'Article updated successfully.');
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
