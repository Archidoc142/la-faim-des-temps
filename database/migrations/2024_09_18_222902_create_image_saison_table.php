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
        Schema::create('image_saison', function (Blueprint $table) {
            $table->primary(['id_image', 'id_saison']);
            $table->unsignedBigInteger('id_image');
            $table->unsignedBigInteger('id_saison');
        });

        Schema::table('image_saison', function (Blueprint $table) {
            $table->foreign('id_image')->references('id')->on('image');
            $table->foreign('id_saison')->references('id')->on('saison');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('image_saison');
    }
};
