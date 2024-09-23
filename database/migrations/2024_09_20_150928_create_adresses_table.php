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
        Schema::create('adresse', function (Blueprint $table) {
            $table->id();
            $table->smallInteger('no_civique');
            $table->string('rue', length: 128);
            $table->smallInteger('appartement')->nullable();
            $table->char('code_postal', length: 6);
            $table->bigInteger('id_secteur_code')->unsigned();
            $table->timestamps();
        });

        Schema::table('adresse', function (Blueprint $table) {
            $table->foreign('id_secteur_code')->references('id')->on('secteur_code');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('adresse');
    }
};
