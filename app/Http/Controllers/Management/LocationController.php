<?php

namespace App\Http\Controllers\Management;

use App\Http\Controllers\Controller;
use App\Models\Location;
use Illuminate\Http\Request;
use Inertia\Inertia;

class LocationController extends Controller
{

     public function locationSearch(Request $request)
    {
        $search = $request->query('q');

        $results = Location::query()
            ->where('name', 'like', "%{$search}%")
            ->limit(5)
            ->get(['id', 'name']);

        return response()->json($results);
    }
    public function locationIndex(Request $request)
    {
        $this->authorize('view locations');

        $search = $request->search;

        $query = Location::query();

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%");
            });
        }

        $locations = $query->paginate(10);

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
