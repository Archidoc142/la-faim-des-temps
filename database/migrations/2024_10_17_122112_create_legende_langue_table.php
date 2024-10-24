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
        Schema::create('legende_langue', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('id_image')->unsigned();
            $table->bigInteger('id_langue')->unsigned();
            $table->string('legende');
        });

        Schema::table('legende_langue', function (Blueprint $table) {
            $table->foreign('id_image')->references('id')->on('image');
            $table->foreign('id_langue')->references('id')->on('langue');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('legende_langue');
    }
};
