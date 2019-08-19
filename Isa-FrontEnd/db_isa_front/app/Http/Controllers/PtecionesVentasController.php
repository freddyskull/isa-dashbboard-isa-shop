<?php

namespace App\Http\Controllers;

use App\ptecionesVentas;
use Illuminate\Http\Request;

class PtecionesVentasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $data = new ptecionesVentas();
        $data->user_id         = $request->user_id;
        $data->userName        = $request->userName;
        $data->codID           = $request->codID;
        $data->totalBs         = $request->totalBs;
        $data->totalDolar      = $request->totalDolar;
        $data->status          = $request->status;
        $data->items           = $request->items;
        $data->divisa          = $request->divisa;
        $data->nombre          = $request->nombre;
        $data->correo          = $request->correo;
        $data->direccion       = $request->direccion;
        $data->postalZip       = $request->postalZip;
        $data->ced             = $request->ced;
        $data->nota            = $request->nota;
        $data->numRef          = $request->numRef;
        $data->banco           = $request->banco;
        $data->iva             = $request->iva;
        $data->save();
        return ['producto creado' => true];
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\ptecionesVentas  $ptecionesVentas
     * @return \Illuminate\Http\Response
     */
    public function show(ptecionesVentas $ptecionesVentas)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\ptecionesVentas  $ptecionesVentas
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, ptecionesVentas $ptecionesVentas)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\ptecionesVentas  $ptecionesVentas
     * @return \Illuminate\Http\Response
     */
    public function destroy(ptecionesVentas $ptecionesVentas)
    {
        //
    }
}
