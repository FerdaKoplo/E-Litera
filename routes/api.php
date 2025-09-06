<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Http;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/provinces', function () {
    $response = Http::get('https://alamat.thecloudalert.com/api/provinsi/get/');
    return $response->json();
});

Route::get('/cities/{provinceId}', function ($provinceId) {
    $response = Http::get('https://alamat.thecloudalert.com/api/kabkota/get/', [
        'd_provinsi_id' => $provinceId,
    ]);
    return $response->json();
});

Route::get('/districts/{cityId}', function ($cityId) {
    $response = Http::get('https://alamat.thecloudalert.com/api/kecamatan/get/', [
        'd_kabkota_id' => $cityId,
    ]);
    return $response->json();
});

Route::get('/subdistricts/{districtId}', function ($districtId) {
    $response = Http::get('https://alamat.thecloudalert.com/api/kelurahan/get/', [
        'd_kecamatan_id' => $districtId,
    ]);
    return $response->json();
});

Route::get('/postal-codes/{subDistrictId}', function ($subDistrictId, Request $request) {
    $cityId = $request->query('city_id');

    $response = Http::get('https://alamat.thecloudalert.com/api/kodepos/get/', [
        'd_kelurahan_id' => $subDistrictId,
        'd_kabkota_id' => $cityId,
    ]);
    return $response->json();
});
