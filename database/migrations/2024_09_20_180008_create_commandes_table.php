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
            $table->string('allergenes', length: 128)->nullable();
            $table->boolean('livraison');
            $table->float('frais_livraison');
            $table->float('total');
            $table->bigInteger('id_adresse')->unsigned()->nullable();
            $table->bigInteger('id_utilisateur')->unsigned();
            $table->bigInteger('id_etat_commande')->unsigned();
            $table->bigInteger('id_type_commande')->unsigned();

            // pour Stripe
            $table->string('session_id')->nullable();
            $table->string('stripe_id')->nullable();

            $table->bigInteger('qb_id')->nullable();
            $table->bigInteger('qb_invoice_id')->nullable();

            $table->timestamps();
        });

        Schema::table('commande', function (Blueprint $table) {
            $table->foreign('id_adresse')->references('id')->on('adresse');
            $table->foreign('id_utilisateur')->references('id')->on('users');
            $table->foreign('id_etat_commande')->references('id')->on('etat_commande');
            $table->foreign('id_type_commande')->references('id')->on('type_commande');
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
