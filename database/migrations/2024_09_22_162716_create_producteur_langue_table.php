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
        Schema::create('producteur_langue', function (Blueprint $table) {
            $table->primary(['id_producteur', 'id_langue']);
            $table->unsignedBigInteger('id_producteur');
            $table->unsignedBigInteger('id_langue');
            $table->string('description');
        });

        Schema::table('producteur_langue', function (Blueprint $table) {
            $table->foreign('id_producteur')->references('id')->on('producteur');
            $table->foreign('id_langue')->references('id')->on('langue');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('producteur_langue');
    }
};
