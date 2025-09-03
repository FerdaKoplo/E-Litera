<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
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


Route::middleware(['auth', 'role:super-admin|librarian'])->group(function () {
    Route::get('/dashboard', [\App\Http\Controllers\Management\DashboardController::class, 'index'])->name('dashboard.admin');
    // Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    // Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    // Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // category
    Route::get('/categories', [\App\Http\Controllers\Management\CategoryController::class, 'categoryIndex'])->name('categories.index');
    Route::get('/categories/create', [\App\Http\Controllers\Management\CategoryController::class, 'createCategory'])->name('categories.create');
    Route::post('/categories', [\App\Http\Controllers\Management\CategoryController::class, 'storeCategory'])->name('categories.store');
    Route::get('/categories/{category}/edit', [\App\Http\Controllers\Management\CategoryController::class, 'categoryEdit'])->name('categories.edit');
    Route::put('/categories/{category}', [\App\Http\Controllers\Management\CategoryController::class, 'updateCategory'])->name('categories.update');
    Route::delete('/categories/{category}', [\App\Http\Controllers\Management\CategoryController::class, 'deleteCategory'])->name('categories.destroy');

    // publications
    Route::get('/publications', [\App\Http\Controllers\Management\PublicationController::class, 'publicationIndex'])->name('publications.index');
    Route::get('/publications/create', [\App\Http\Controllers\Management\PublicationController::class, 'publicationCreate'])->name('publications.create');
    Route::post('/publications', [\App\Http\Controllers\Management\PublicationController::class, 'storePublication'])->name('publications.store');
    Route::get('/publications/{publication}', [\App\Http\Controllers\Management\PublicationController::class, 'publicationShow'])->name('publications.show');
    Route::get('/publications/{publication}/edit', [\App\Http\Controllers\Management\PublicationController::class, 'editPublication'])->name('publications.edit');
    Route::patch('/publications/{publication}', [\App\Http\Controllers\Management\PublicationController::class, 'updatePublication'])->name('publications.update');
    Route::delete('/publications/{publication}', [\App\Http\Controllers\Management\PublicationController::class, 'deletePublication'])->name('publications.destroy');

    // location
    Route::get('/locations', [\App\Http\Controllers\Management\LocationController::class, 'locationIndex'])->name('locations.index');
    Route::get('/locations/create', [\App\Http\Controllers\Management\LocationController::class, 'createLocation'])->name('locations.create');
    Route::post('/locations', [\App\Http\Controllers\Management\LocationController::class, 'storeLocation'])->name('locations.store');
    Route::get('/locations/{location}', [\App\Http\Controllers\Management\LocationController::class, 'locationShow'])->name('locations.show');
    Route::get('/locations/{location}/edit', [\App\Http\Controllers\Management\LocationController::class, 'editLocation'])->name('locations.edit');
    Route::put('/locations/{location}', [\App\Http\Controllers\Management\LocationController::class, 'updateLocation'])->name('locations.update');
    Route::delete('/locations/{location}', [\App\Http\Controllers\Management\LocationController::class, 'deleteLocation'])->name('locations.destroy');

    // loan
    Route::get('/loans', [\App\Http\Controllers\Management\LoanController::class, 'loanIndex'])->name('loans.index');
    Route::put('/loans/{loan}', [\App\Http\Controllers\Management\LoanController::class, 'updateLoan'])->name('loans.update');

    // feedback
    // Route::get('/feedback', [FeedbackController::class, 'feedbackIndex'])->name('feedback.index');
    // Route::get('/publications/{publication}/feedback/create', [FeedbackController::class, 'feedbackCreate'])->name('feedback.create');
    // Route::post('/feedback', [FeedbackController::class, 'storeFeedback'])->name('feedback.store');
    // Route::get('/feedback/{feedback}', [FeedbackController::class, 'feedbackShow'])->name('feedback.show');
    // Route::get('/feedback/{feedback}/edit', [FeedbackController::class, 'feedbackEdit'])->name('feedback.edit');
    // Route::put('/feedback/{feedback}', [FeedbackController::class, 'updateFeedback'])->name('feedback.update');
    // Route::delete('/feedback/{feedback}', [FeedbackController::class, 'deleteFeedback'])->name('feedback.destroy');

    // delivery
    Route::get('/delivery', [\App\Http\Controllers\Management\DeliveryController::class, 'deliveryIndex'])->name('delivery.index');
    Route::get('/delivery/{delivery}/edit', [\App\Http\Controllers\Management\DeliveryController::class, 'editDelivery'])->name('delivery.edit');
    Route::put('/delivery/{delivery}/edit', [\App\Http\Controllers\Management\DeliveryController::class, 'updateDelivery'])->name('delivery.update');


    // Article
    Route::get('/articles', [\App\Http\Controllers\Management\ArticleController::class, 'articleIndex'])->name('articles.index');
    Route::get('/articles/create', [\App\Http\Controllers\Management\ArticleController::class, 'createArticle'])->name('articles.create');
    Route::post('/articles/image/upload', [\App\Http\Controllers\Management\ArticleController::class, 'uploadImage'])->name('articles.image.upload');
    Route::post('/articles', [\App\Http\Controllers\Management\ArticleController::class, 'storeArticle'])->name('articles.store');
    Route::get('/articles/{article}', [\App\Http\Controllers\Management\ArticleController::class, 'articleShow'])->name('articles.show');
    Route::get('/articles/{article}/edit', [\App\Http\Controllers\Management\ArticleController::class, 'editArticle'])->name('articles.edit');
    Route::put('/articles/{article}', [\App\Http\Controllers\Management\ArticleController::class, 'updateArticle'])->name('articles.update');
    Route::delete('/articles/{article}', [\App\Http\Controllers\Management\ArticleController::class, 'deleteArticle'])->name('articles.destroy');


    Route::post('/notifications/{id}/read', function ($id) {
        $user = auth()->user();
         /** @var \Illuminate\Notifications\DatabaseNotification|null $notification */
        $notification = $user->unreadNotifications()->find($id);

        if ($notification) {
            $notification->markAsRead();
        }

        return redirect()->back();
    })->name('notifications.read');
});


Route::middleware(['auth', 'role:member'])->group(function () {
    Route::get('/member/home', [\App\Http\Controllers\Member\HomeController::class, 'index'])->name('home');

    Route::get('/member/dashboard', [\App\Http\Controllers\Member\DashboardController::class, 'index'])->name('dashboard.member');
    Route::get('/member/profile', [ProfileController::class, 'index'])->name('profile.index');

    Route::get('/member/articles', [\App\Http\Controllers\Member\ArticleController::class, 'articleIndex'])->name('articles.member.index');
    Route::get('/member/articles/{article}', [\App\Http\Controllers\Member\ArticleController::class, 'articleShow'])->name('articles.member.show');

    // publications
    Route::get('/member/publications', [\App\Http\Controllers\Member\PublicationController::class, 'publicationIndex'])->name('publications.member.index');
    Route::get('/member/publication/{publication}', [\App\Http\Controllers\Member\PublicationController::class, 'publicationShow'])->name('publications.member.show');

    // loans
    Route::get('/member/loans', [\App\Http\Controllers\Member\LoanController::class, 'viewLoan'])->name('member.loans.view');
    Route::post('/loans', [\App\Http\Controllers\Member\LoanController::class, 'storeLoan'])->name('member.loans.store');


    // delivery
    Route::get('/member/delivery', [\App\Http\Controllers\Member\DeliveryController::class, 'deliveryIndex'])->name('member.delivery.index');

    // feedback
    Route::get('/publications/{publication}/feedback', [\App\Http\Controllers\Member\FeedbackController::class, 'viewFeedback'])
    ->name('member.feedback.view');
    Route::post('/feedback', [\App\Http\Controllers\Member\FeedbackController::class, 'storeFeedback'])->name('member.feedback.store');

    // Route::post('/notifications/{id}/read', function ($id) {
    //     $user = auth()->user();
    //      /** @var \Illuminate\Notifications\DatabaseNotification|null $notification */
    //     $notification = $user->unreadNotifications()->find($id);

    //     if ($notification) {
    //         $notification->markAsRead();
    //     }

    //     return redirect()->back();
    // })->name('notifications.read');
});
require __DIR__ . '/auth.php';
