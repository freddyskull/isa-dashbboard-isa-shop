<?php

namespace App\Http\Controllers;

use App\slider;
use Illuminate\Http\Request;

class SliderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = slider::all();
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
        $data = new slider();
        $data->slider           = $request->slider;
        $data->titlesConfig     = $request->titlesConfig;
        $data->subImgConfig     = $request->subImgConfig;
        $data->save();
        return ['slider creado' => true];
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\slider  $slider
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data = slider::findOrFail($id);
        return $data;
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\slider  $slider
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $data = slider::findOrFail($id);
        $data->slider           = $request->slider;
        $data->titlesConfig     = $request->titlesConfig;
        $data->subImgConfig     = $request->subImgConfig;
        $data->save();
        return ['slider actualizado' => true];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\slider  $slider
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $data = slider::find($id);
        $data->delete();
        return ['slider eliminado' => true];
    }
}
