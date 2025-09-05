<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use Auth;
use Illuminate\Http\Request;

class ProfileController extends Controller
{

     public function updateEmail(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'email' => 'required|email|unique:users,email,' . $user->id,
            'password' => 'required|current_password',
        ]);

        $user->update([
            'email' => $validated['email'],
        ]);

        $user->email_verified_at = null;
        $user->save();

        return back()->with('success', 'Email updated successfully. Please verify your new email.');
    }

    public function updatePassword(Request $request)
    {
        $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => ['required', 'string', 'min:8', 'confirmed'], // requires password_confirmation field
        ]);

        $user = Auth::user();
        $user->update([
            'password' => bcrypt($request->password),
        ]);

        return back()->with('success', 'Password updated successfully!');
    }

    public function updateAvatar(Request $request)
    {
        $request->validate([
            'avatar' => 'required|image|max:2048',
        ]);

        $path = $request->file('avatar')->store('avatars', 'public');

        $user = Auth::user();
        $user->update([
            'avatar' => $path,
        ]);

        return back()->with('success', 'Avatar updated successfully!');
    }

    public function updateProfile(Request $request){
          $user = Auth::user();

        $validated = $request->validate([
            'name' => 'string|max:255',
            'phone_number' => 'nullable|string|max:20',
            'instagram' => 'nullable|string|max:100',
            'facebook' => 'nullable|string|max:100',
        ]);

        $user->update($validated);


        return redirect()->back()->with('success', 'Profile updated successfully!');
    }
}
