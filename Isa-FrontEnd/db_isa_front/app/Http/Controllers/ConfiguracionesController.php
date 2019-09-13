<?php

namespace App\Http\Controllers;

use App\configuraciones;
use Illuminate\Http\Request;

class ConfiguracionesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = configuraciones::all();
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
        $data = new configuraciones();
        $data->titulo       = $request->titulo;
        $data->logo         = $request->logo;
        $data->dolarPrice   = $request->dolarPrice;
        $data->save();
        return ['configuracion creada' => true];
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\configuraciones  $configuraciones
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data = configuraciones::findOrFail($id);
        return $data;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\configuraciones  $configuraciones
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = configuraciones::findOrFail($id);
        $data->titulo       = $request->titulo;
        $data->logo         = $request->logo;
        $data->dolarPrice   = $request->dolarPrice;
        $data->save();
        return ['configuracion editada' => true];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\configuraciones  $configuraciones
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = configuraciones::find($id);
        $data->delete();
        return ['configuracion eliminado' => true];
    }
}
