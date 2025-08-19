<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ArticleController extends Controller
{
    public function articleIndex()
    {
        $this->authorize('view articles');

        $articles = Article::paginate(10);

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
