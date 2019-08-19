<?php

namespace App\Http\Controllers;

use App\promociones;
use Illuminate\Http\Request;

class PromocionesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $promociones = promociones::all();
        return $promociones;
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = new promociones();
        $data->id_isa_backend  = $request->id_isa_backend;
        $data->chat_id         = $request->chat_id;
        $data->promo           = $request->promo;
        $data->nombre          = $request->nombre;
        $data->descripcion     = $request->descripcion;
        $data->img             = $request->img;
        $data->img_alt         = $request->img_alt;
        $data->stock           = $request->stock;
        $data->precioBs        = $request->precioBs;
        $data->precioDolar     = $request->precioDolar;
        $data->IVA             = $request->IVA;
        $data->precio_ancla    = $request->precio_ancla;
        $data->category_id     = $request->category_id;
        $data->infoAddStatus   = $request->infoAddStatus;
        $data->infoAdd         = $request->infoAdd;
        $data->tags            = $request->tags;
        $data->color_data      = $request->color_data;
        $data->rate            = $request->rate;
        $data->save();
        return ['promocion creada' => true];
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\promociones  $promociones
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data = promociones::findOrFail($id);
        return $data;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\promociones  $promociones
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = promociones::findOrFail($id);
        $data->id_isa_backend  = $request->id_isa_backend;
        $data->chat_id         = $request->chat_id;
        $data->promo           = $request->promo;
        $data->nombre          = $request->nombre;
        $data->descripcion     = $request->descripcion;
        $data->img             = $request->img;
        $data->img_alt         = $request->img_alt;
        $data->stock           = $request->stock;
        $data->precioBs        = $request->precioBs;
        $data->precioDolar     = $request->precioDolar;
        $data->IVA             = $request->IVA;
        $data->precio_ancla    = $request->precio_ancla;
        $data->category_id     = $request->category_id;
        $data->infoAddStatus   = $request->infoAddStatus;
        $data->infoAdd         = $request->infoAdd;
        $data->tags            = $request->tags;
        $data->color_data      = $request->color_data;
        $data->rate            = $request->rate;
        $data->save();
        return ['promocion actualizada' => true];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\promociones  $promociones
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = promociones::find($id);
        $data->delete();
        return ['producto eliminado' => true];
    }
}
