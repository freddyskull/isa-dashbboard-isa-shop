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
        $data->id_isa_fontEnd  = $request->id_isa_fontEnd;
        $data->name            = $request->name;
        $data->chat_id         = $request->chat_id;
        $data->description     = $request->description;
        $data->stock           = $request->stock;
        $data->priceS          = $request->priceS;
        $data->priceSD         = $request->priceSD;
        $data->precio_ancla    = $request->precio_ancla;
        $data->infoAddStatus   = $request->infoAddStatus;
        $data->infoAdd         = $request->infoAdd;
        $data->tags            = $request->tags;
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
        $data->id_isa_fontEnd  = $request->id_isa_fontEnd;
        $data->name            = $request->name;
        $data->chat_id         = $request->chat_id;
        $data->description     = $request->description;
        $data->stock           = $request->stock;
        $data->priceS          = $request->priceS;
        $data->priceSD         = $request->priceSD;
        $data->precio_ancla    = $request->precio_ancla;
        $data->infoAddStatus   = $request->infoAddStatus;
        $data->infoAdd         = $request->infoAdd;
        $data->tags            = $request->tags;
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
