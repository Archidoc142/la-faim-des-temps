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
        Schema::create('commentaire', function (Blueprint $table) {
            $table->id();
            $table->timestamp('date_heure_publication');
            $table->integer('note');
            $table->string('commentaire', length: 255);
            $table->boolean('masque');
            $table->bigInteger('id_utilisateur')->unsigned();
            $table->timestamps();
        });

        Schema::table('commentaire', function (Blueprint $table) {
            $table->foreign('id_utilisateur')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('commentaire');
    }
};
