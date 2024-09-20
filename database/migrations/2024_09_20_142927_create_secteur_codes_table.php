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
        Schema::create('secteur_code', function (Blueprint $table) {
            $table->id();
            $table->char('code', length: 3);
            $table->bigInteger('id_secteur')->unsigned();
            $table->timestamps();
        });

        Schema::table('secteur_code', function (Blueprint $table) {
            $table->foreign('id_secteur')->references('id')->on('secteur');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('secteur_code');
    }
};
