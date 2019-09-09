<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('productos', 'ProductosController');
Route::apiResource('categorias', 'CategoryController');
Route::apiResource('prom_dia', 'PromocionesDelDiaController');
Route::apiResource('promociones', 'PromocionesController');
Route::apiResource('slider', 'SliderController');
