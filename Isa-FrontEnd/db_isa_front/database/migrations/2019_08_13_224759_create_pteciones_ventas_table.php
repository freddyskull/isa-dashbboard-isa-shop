<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePtecionesVentasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pteciones_ventas', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('user_id');
            $table->string('userName');
            $table->string('codID');
            $table->integer('totalBs');
            $table->float('totalDolar', 8, 2);
            $table->string('status');
            $table->longText('items');
            $table->string('divisa');
            $table->string('nombre');
            $table->string('correo');
            $table->longText('direccion');
            $table->integer('postalZip');
            $table->string('ced');
            $table->string('nota')->nullable();
            $table->string('numRef')->nullable();
            $table->string('banco')->nullable();
            $table->float('iva', 8, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pteciones_ventas');
    }
}
