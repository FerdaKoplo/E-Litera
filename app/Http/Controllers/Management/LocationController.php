<?php

namespace App\Http\Controllers\Management;

use App\Http\Controllers\Controller;
use App\Models\Location;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LocationController extends Controller
{
        public function locationIndex()
    {
        $this->authorize('view locations');

        $locations = Location::all();

        return Inertia::render('Dashboard/Locations/Index', [
            'locations' => $locations
        ]);
    }

    public function locationShow(Location $location)
    {
        $this->authorize('view locations');

        return Inertia::render('Dashboard/Locations/Show', [
            'location' => $location
        ]);
    }

    public function createLocation()
    {
        $this->authorize('create locations');

        return Inertia::render('Dashboard/Locations/Create');
    }

    public function storeLocation(Request $request)
    {
        $this->authorize('create locations');

        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        Location::create($validated);

        return redirect()->route('locations.index')
            ->with('success', 'Location created successfully.');
    }

    public function editLocation(Location $location)
    {
        $this->authorize('edit locations');

        return Inertia::render('Dashboard/Locations/Edit', [
            'location' => $location
        ]);
    }

    public function updateLocation(Request $request, Location $location)
    {
        $this->authorize('edit locations');

        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $location->update($validated);

        return redirect()->route('locations.index')
            ->with('success', 'Location updated successfully.');
    }

    public function deleteLocation(Location $location)
    {
        $this->authorize('delete locations');

        $location->delete();

        return redirect()->route('locations.index')
            ->with('success', 'Location deleted successfully.');
    }
}
