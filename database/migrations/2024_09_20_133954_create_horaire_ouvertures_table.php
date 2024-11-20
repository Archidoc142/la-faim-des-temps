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
        Schema::create('HoraireOuverture', function (Blueprint $table) {
            $table->id();
            $table->string('jour_fr', length: 16);
            $table->string('jour_en', length: 16);
            $table->boolean('ouvert');
            $table->string('heure_ouverture', length: 32)->nullable();
            $table->string('heure_fermeture', length: 32)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('HoraireOuverture');
    }
};
