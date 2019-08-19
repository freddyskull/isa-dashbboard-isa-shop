<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePromocionesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('promociones', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('id_isa_backend');
            $table->string('chat_id')->nullable();
            $table->integer('promo')->nullable();
            $table->string('nombre');
            $table->string('descripcion')->nullable();
            $table->longText('img');
            $table->longText('img_alt')->nullable();
            $table->integer('stock');
            $table->integer('precioBs');
            $table->float('precioDolar', 8, 2);
            $table->integer('IVA');
            $table->json('precio_ancla');
            $table->integer('category_id');
            $table->integer('infoAddStatus')->nullable();
            $table->json('infoAdd')->nullable();
            $table->json('tags')->nullable();
            $table->json('color_data')->nullable();
            $table->integer('rate')->nullable();
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
        Schema::dropIfExists('promociones');
    }
}
