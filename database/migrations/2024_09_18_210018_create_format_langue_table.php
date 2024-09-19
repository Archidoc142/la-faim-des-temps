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
        Schema::create('format_langue', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('id_format')->unsigned();
            $table->bigInteger('id_langue')->unsigned();
            $table->string('nom');
            $table->string('description');
        });

        Schema::table('format_langue', function (Blueprint $table) {
            $table->foreign('id_format')->references('id')->on('formats');
            $table->foreign('id_langue')->references('id')->on('langues');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('format_langue');
    }
};
