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
        Schema::dropIfExists('ProduitLangue');

        Schema::create('ProduitLangue', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('id_produit')->unsigned();
            $table->bigInteger('id_langue')->unsigned();
            $table->string('description');
        });

        Schema::table('ProduitLangue', function (Blueprint $table) {
            $table->foreign('id_produit')->references('id')->on('produit');
            $table->foreign('id_langue')->references('id')->on('langue');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ProduitLangue');
    }
};
