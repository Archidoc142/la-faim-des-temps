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
        Schema::create('commande_produit', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('id_produit')->unsigned();
            $table->bigInteger('id_commande')->unsigned();
            $table->bigInteger('id_format')->unsigned();
            $table->float('prix_vente');
        });

        Schema::table('commande_produit', function (Blueprint $table) {
            $table->foreign('id_produit')->references('id')->on('produit');
            $table->foreign('id_commande')->references('id')->on('commande');
            $table->foreign('id_format')->references('id')->on('format');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('commande_produit');
    }
};
