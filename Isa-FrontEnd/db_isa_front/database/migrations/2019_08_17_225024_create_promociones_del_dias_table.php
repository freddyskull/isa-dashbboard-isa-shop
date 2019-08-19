<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePromocionesDelDiasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('promociones_del_dias', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('id_isa_backend');
            $table->string('nombre');
            $table->longText('descripcion');
            $table->longText('img');
            $table->longText('img_alt')->nullable();
            $table->integer('stock');
            $table->integer('precioBs');
            $table->float('precioDolar', 8, 2);
            $table->integer('IVA');
            $table->json('precio_ancla');
            $table->integer('infoAddStatus')->nullable();
            $table->json('infoAdd')->nullable();
            $table->json('tags')->nullable();
            $table->json('color_data')->nullable();
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
        Schema::dropIfExists('promociones_del_dias');
    }
}
