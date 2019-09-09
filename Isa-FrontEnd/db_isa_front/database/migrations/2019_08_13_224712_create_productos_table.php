<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('productos', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->integer('id_isa_backend');
            $table->string('chat_id')->nullable();
            $table->integer('promo')->nullable();
            $table->string('name');
            $table->string('description')->nullable();
            $table->longText('img')->nullable();
            $table->longText('img_alt')->nullable();
            $table->integer('stock');
            $table->integer('priceS');
            $table->float('priceSD', 8, 2);
            $table->integer('IVA');
            $table->longText('precio_ancla')->nullable();;
            $table->integer('category_id');
            $table->integer('infoAddStatus')->nullable();
            $table->longText('infoAdd')->nullable();
            $table->longText('tags')->nullable();
            $table->longText('color_data')->nullable();
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
        Schema::dropIfExists('productos');
    }
}
