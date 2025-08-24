<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Inertia\Inertia;


class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public function __construct()
    {
        Inertia::share([
            'notifications' => function () {
                $user = auth()->user();
                return $user
                    ? $user->unreadNotifications()->latest()->take(10)->get()
                    : [];
            },
        ]);
    }

}
