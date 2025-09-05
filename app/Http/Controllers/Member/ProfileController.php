<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use Auth;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function updateProfile(Request $request){
          $user = Auth::user();

        $validated = $request->validate([
            'name' => 'string|max:255',
            'phone_number' => 'nullable|string|max:20',
            'instagram' => 'nullable|string|max:100',
            'facebook' => 'nullable|string|max:100',
        ]);

        $update =  $user->update($validated);


        return redirect()->back()->with('success', 'Profile updated successfully!');
    }
}
