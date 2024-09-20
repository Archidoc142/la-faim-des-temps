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
        Schema::create('commande', function (Blueprint $table) {
            $table->id();
            $table->date('date_heure');
            $table->string('allergenes', length: 128)->nullable();
            $table->boolean('livraison');
            $table->float('frais_livraison');
            $table->float('total');
            $table->bigInteger('id_adrese')->unsigned();
            $table->bigInteger('id_utilisateur')->unsigned();
            $table->bigInteger('id_etat_commande')->unsigned();
            $table->timestamps();
        });

        Schema::table('commande', function (Blueprint $table) {
            $table->foreign('id_adrese')->references('id')->on('adresse');
            $table->foreign('id_utilisateur')->references('id')->on('users');
            $table->foreign('id_etat_commande')->references('id')->on('etat_commande');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('commande');
    }
};
