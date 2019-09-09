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
            $table->integer('id_isa_front');
            $table->string('chat_id')->nullable();
            $table->string('description')->nullable();
            $table->integer('stock');
            $table->integer('priceS');
            $table->integer('priceSD');
            $table->longText('precio_ancla')->nullable();
            $table->integer('infoAddStatus')->nullable();
            $table->longText('infoAdd')->nullable();
            $table->longText('tags')->nullable();
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
