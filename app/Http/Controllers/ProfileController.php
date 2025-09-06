<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
   public function index(Request $request) {
    $user = $request->user()->load('address');

    return Inertia::render('Member/Profile/Index', [
        'auth' => [
            'user' => $user,
        ],
          'address' => $user->address ? [
            'id' => $user->address->id,
            'full_address' => $user->address->full_address,
            'province_id' => $user->address->province_id,
            'province_name' => $user->address->province_name,
            'city_id' => $user->address->city_id,
            'city_name' => $user->address->city_name,
            'district_id' => $user->address->district_id,
            'district_name' => $user->address->district_name,
            'sub_district_id' => $user->address->sub_district_id,
            'sub_district_name' => $user->address->sub_district_name,
            'postal_code' => $user->address->postal_code,
        ] : null,
    ]);
}

    public function edit(Request $request): Response
    {
        return Inertia::render('Dashboard/Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
