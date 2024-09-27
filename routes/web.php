<?php

use App\Http\Controllers\ClientController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProducteurController;
use App\Http\Controllers\ProduitController;
use App\Http\Controllers\PanierController;
use App\Http\Middleware\EnsureUserIsAdmin;
use App\Http\Middleware\EnsureUserIsLoggedIn;
use App\Models\Produit;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Accueil', []);
})->name('accueil');

Route::get('/menu', [ProduitController::class, 'index']);

Route::get('/panier', [PanierController::class, 'index'])->middleware(EnsureUserIsLoggedIn::class);

Route::get('/compte', function () {
    return Inertia::render('Compte', []);
})->middleware(EnsureUserIsLoggedIn::class);

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::middleware(EnsureUserIsAdmin::class)->group(function() {
    Route::get('/admin', function() { return redirect()->route('admin.clients');})->name('admin.accueil');

    Route::controller(ClientController::class)->group(function() {
        Route::get('/admin/clients', 'index')->name('admin.clients');
        Route::get('/admin/client/{id}', 'show')->name('admin.client');
    });
});

Route::get('/producteurs', [ProducteurController::class, 'index']);

require __DIR__.'/auth.php';
