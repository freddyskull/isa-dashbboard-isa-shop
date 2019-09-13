<?php

namespace App\Http\Controllers;

use App\productos;
use Illuminate\Http\Request;

class ProductosController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $productos = productos::all();
        return $productos;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = new productos();
        $data->id_isa_backend  = $request->id_isa_backend;
        $data->chat_id         = $request->chat_id;
        $data->promo           = $request->promo;
        $data->name            = $request->name;
        $data->description     = $request->description;
        $data->img             = $request->img;
        $data->img_alt         = $request->img_alt;
        $data->stock           = $request->stock;
        $data->priceS          = $request->priceS;
        $data->priceSD         = $request->priceSD;
        $data->IVA             = $request->IVA;
        $data->precio_ancla    = $request->precio_ancla;
        $data->category_id     = $request->category_id;
        $data->infoAddStatus   = $request->infoAddStatus;
        $data->infoAdd         = $request->infoAdd;
        $data->tags            = $request->tags;
        $data->color_data      = $request->color_data;
        $data->rate            = $request->rate;
        $data->save();
        return ['producto creado' => true];
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\productos  $productos
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data = productos::findOrFail($id);
        return $data;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\productos  $productos
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = productos::findOrFail($id);
        $data->id_isa_backend  = $request->id_isa_backend;
        $data->chat_id         = $request->chat_id;
        $data->promo           = $request->promo;
        $data->name            = $request->name;
        $data->description     = $request->description;
        $data->img             = $request->img;
        $data->img_alt         = $request->img_alt;
        $data->stock           = $request->stock;
        $data->priceS          = $request->priceS;
        $data->priceSD         = $request->priceSD;
        $data->IVA             = $request->IVA;
        $data->precio_ancla    = $request->precio_ancla;
        $data->category_id     = $request->category_id;
        $data->infoAddStatus   = $request->infoAddStatus;
        $data->infoAdd         = $request->infoAdd;
        $data->tags            = $request->tags;
        $data->color_data      = $request->color_data;
        $data->rate            = $request->rate;
        $data->save();
        return ['producto actualizado' => true];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\productos  $productos
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = productos::find($id);
        $data->delete();
        return ['producto eliminado' => true];
    }
}
