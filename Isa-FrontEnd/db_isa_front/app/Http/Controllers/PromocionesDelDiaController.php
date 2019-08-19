<?php

namespace App\Http\Controllers;

use App\promocionesDelDia;
use Illuminate\Http\Request;

class PromocionesDelDiaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = promocionesDelDia::all();
        return $data;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = new promocionesDelDia();
        $data->id_isa_backend  = $request->id_isa_backend;
        $data->nombre          = $request->nombre;
        $data->descripcion     = $request->descripcion;
        $data->img             = $request->img;
        $data->img_alt         = $request->img_alt;
        $data->stock           = $request->stock;
        $data->precioBs        = $request->precioBs;
        $data->precioDolar     = $request->precioDolar;
        $data->IVA             = $request->IVA;
        $data->precio_ancla    = $request->precio_ancla;
        $data->infoAddStatus   = $request->infoAddStatus;
        $data->infoAdd         = $request->infoAdd;
        $data->tags            = $request->tags;
        $data->color_data      = $request->color_data;
        $data->save();
        return ['promo creada' => true];
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\promocionesDelDia  $promocionesDelDia
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data = promocionesDelDia::findOrFail($id);
        return $data;
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\promocionesDelDia  $promocionesDelDia
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = promocionesDelDia::findOrFail($id);
        $data->id_isa_backend  = $request->id_isa_backend;
        $data->nombre          = $request->nombre;
        $data->descripcion     = $request->descripcion;
        $data->img             = $request->img;
        $data->img_alt         = $request->img_alt;
        $data->stock           = $request->stock;
        $data->precioBs        = $request->precioBs;
        $data->precioDolar     = $request->precioDolar;
        $data->IVA             = $request->IVA;
        $data->precio_ancla    = $request->precio_ancla;
        $data->infoAddStatus   = $request->infoAddStatus;
        $data->infoAdd         = $request->infoAdd;
        $data->tags            = $request->tags;
        $data->color_data      = $request->color_data;
        $data->save();
        return ['promo actualizada' => true];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\promocionesDelDia  $promocionesDelDia
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = promocionesDelDia::find($id);
        $data->delete();
        return ['producto eliminado' => true];
    }
}
