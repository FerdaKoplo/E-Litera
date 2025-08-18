<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\LoanController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\PublicationController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard/Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // category
    Route::get('/categories', [CategoryController::class, 'categoryIndex'])->name('categories.index');
    Route::get('/categories/create', [CategoryController::class, 'createCategory'])->name('categories.create');
    Route::post('/categories', [CategoryController::class, 'storeCategory'])->name('categories.store');
    Route::get('/categories/{category}/edit', [CategoryController::class, 'categoryEdit'])->name('categories.edit');
    Route::put('/categories/{category}', [CategoryController::class, 'updateCategory'])->name('categories.update');
    Route::delete('/categories/{category}', [CategoryController::class, 'deleteCategory'])->name('categories.destroy');

    // publications
    Route::get('/publications', [PublicationController::class, 'publicationIndex'])->name('publications.index');
    Route::get('/publications/create', [PublicationController::class, 'publicationCreate'])->name('publications.create');
    Route::post('/publications', [PublicationController::class, 'storePublication'])->name('publications.store');
    Route::get('/publications/{publication}', [PublicationController::class, 'publicationShow'])->name('publications.show');
    Route::get('/publications/{publication}/edit', [PublicationController::class, 'editPublication'])->name('publications.edit');
    Route::patch('/publications/{publication}', [PublicationController::class, 'updatePublication'])->name('publications.update');
    Route::delete('/publications/{publication}', [PublicationController::class, 'deletePublication'])->name('publications.destroy');

    // location
    Route::get('/locations', [LocationController::class, 'locationIndex'])->name('locations.index');
    Route::get('/locations/create', [LocationController::class, 'createLocation'])->name('locations.create');
    Route::post('/locations', [LocationController::class, 'storeLocation'])->name('locations.store');
    Route::get('/locations/{location}', [LocationController::class, 'locationShow'])->name('locations.show');
    Route::get('/locations/{location}/edit', [LocationController::class, 'editLocation'])->name('locations.edit');
    Route::put('/locations/{location}', [LocationController::class, 'updateLocation'])->name('locations.update');
    Route::delete('/locations/{location}', [LocationController::class, 'deleteLocation'])->name('locations.destroy');

    // loan
    Route::get('/loans', [LoanController::class, 'loanIndex'])->name('loans.index');
    Route::get('/loans/{loan}', [LoanController::class, 'loanShow'])->name('loans.show');
    Route::get('/loans/create', [LoanController::class, 'loanCreate'])->name('loans.create');
    Route::post('/loans', [LoanController::class, 'storeLoan'])->name('loans.store');
    Route::put('/loans/{loan}', [LoanController::class, 'updateLoan'])->name('loans.update');

    // feedback
    Route::get('/feedback', [FeedbackController::class, 'feedbackIndex'])->name('feedback.index');
    Route::get('/publications/{publication}/feedback/create', [FeedbackController::class, 'feedbackCreate'])->name('feedback.create');
    Route::post('/feedback', [FeedbackController::class, 'storeFeedback'])->name('feedback.store');
    Route::get('/feedback/{feedback}', [FeedbackController::class, 'feedbackShow'])->name('feedback.show');
    Route::get('/feedback/{feedback}/edit', [FeedbackController::class, 'feedbackEdit'])->name('feedback.edit');
    Route::put('/feedback/{feedback}', [FeedbackController::class, 'updateFeedback'])->name('feedback.update');
    Route::delete('/feedback/{feedback}', [FeedbackController::class, 'deleteFeedback'])->name('feedback.destroy');

    // Article
    Route::get('/articles', [ArticleController::class, 'articleIndex'])->name('articles.index');
    Route::get('/articles/create', [ArticleController::class, 'createArticle'])->name('articles.create');
    Route::post('/articles/image/upload', [ArticleController::class, 'uploadImage'])->name('articles.image.upload');
    Route::post('/articles', [ArticleController::class, 'storeArticle'])->name('articles.store');

    Route::get('/articles/{article}', [ArticleController::class, 'articleShow'])->name('articles.show');
    Route::get('/articles/{article}/edit', [ArticleController::class, 'editArticle'])->name('articles.edit');
    Route::put('/articles/{article}', [ArticleController::class, 'updateArticle'])->name('articles.update');
    Route::delete('/articles/{article}', [ArticleController::class, 'deleteArticle'])->name('articles.destroy');
});

require __DIR__ . '/auth.php';
