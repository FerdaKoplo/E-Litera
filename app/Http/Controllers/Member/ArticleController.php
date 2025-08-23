<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ArticleController extends Controller
{
    public function articleIndex(Request $request)
    {
        $this->authorize('view articles');

        $search = $request->query('search');
        $query = Article::with('user');
        if ($search) {
            $query->where(function ($q) use ($request) {
                $q->where('title_article', 'like', "%{$request->search}%");
            });
        }

        $articles = $query->paginate(16);

        return Inertia::render('Member/Article/Index', [
            'articles' => $articles
        ]);
    }

    public function articleShow(Article $article)
    {
        $this->authorize('view articles');

        return Inertia::render('Member/Article/Show', [
            'article' => $article
        ]);
    }


}
