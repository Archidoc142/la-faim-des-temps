<?php

use App\Http\Controllers\CommandeController;
use App\Http\Controllers\I18nController;
use Illuminate\Support\Facades\Route;

Route::post('/webhook', [CommandeController::class, 'webhook'])->name('stripe-webhook');
Route::get('/lang/fr/global', [I18nController::class, 'fr']);
Route::get('/lang/en/global', [I18nController::class, 'en']);
