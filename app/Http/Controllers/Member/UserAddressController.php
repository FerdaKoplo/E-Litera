<?php

namespace App\Http\Controllers\Member;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class UserAddressController extends Controller
{
    public function updateAddress(Request $request)
    {
        $validated = $request->validate([
            'full_address' => 'nullable|string|max:255',
            'province_id' => 'nullable|integer',
            'province_name' => 'nullable|string|max:100',
            'city_id' => 'nullable|integer',
            'city_name' => 'nullable|string|max:100',
            'district_id' => 'nullable|integer',
            'district_name' => 'nullable|string|max:100',
            'sub_district_id' => 'nullable|integer',
            'sub_district_name' => 'nullable|string|max:100',
            'postal_code' => 'nullable|string|max:10',
        ]);

           $user = $request->user();

    $address = $user->address()->updateOrCreate(
        ['user_id' => $user->id],
        $validated
    );


        return redirect()->back()->with('success', 'address updated successfully');
    }
}
