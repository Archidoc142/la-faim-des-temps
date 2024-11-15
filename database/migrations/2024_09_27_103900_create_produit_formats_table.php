<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('produit_format', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('id_produit')->unsigned();
            $table->bigInteger('id_format')->unsigned();
            $table->integer('id_qb')->unsigned()->nullable();
        });

        Schema::table('produit_format', function (Blueprint $table) {
            $table->foreign('id_produit')->references('id')->on('produit');
            $table->foreign('id_format')->references('id')->on('format');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produit_formats');
    }
};
