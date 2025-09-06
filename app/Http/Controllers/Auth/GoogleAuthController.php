<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Auth;
use Laravel\Socialite\Facades\Socialite;
use Str;
use Throwable;

class GoogleAuthController extends Controller
{
    public function redirect()
    {
        return Socialite::driver('google')->redirect();
    }

    public function callback()
    {
        try {
            $googleUser = Socialite::driver('google')->user();
        } catch (Throwable $e) {
            return redirect('/')->with('error', 'Google authentication failed.');
        }

        $user = User::firstOrCreate(
            ['email' => $googleUser->email],
            [
                'name' => $googleUser->name,
                'password' => bcrypt(Str::random(16)),
                'email_verified_at' => now(),
            ]
        );

        if (!$user->hasRole('member')) {
            $user->assignRole('member');
        }

        Auth::login($user);

        return redirect()->route('dashboard.member');
    }
}
