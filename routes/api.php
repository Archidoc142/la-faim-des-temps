<?php

use App\Http\Controllers\CommandeController;
use Illuminate\Support\Facades\Route;

Route::post('/webhook', [CommandeController::class, 'webhook'])->name('stripe-webhook');
