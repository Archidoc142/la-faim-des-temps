<?php

use App\Http\Controllers\AdresseController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\CommandeController;
use App\Http\Controllers\DatesMenuController;
use App\Http\Controllers\CommentaireController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProducteurController;
use App\Http\Controllers\ProduitController;
use App\Http\Controllers\PanierController;
use App\Http\Middleware\EnsureUserIsAdmin;
use App\Http\Middleware\EnsureUserIsLoggedIn;
use App\Http\Resources\CommentaireResource;
use App\Models\Commentaire;
use App\Models\Produit;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Accueil', [
        'commentaires' => CommentaireResource::collection(
            Commentaire::where('masque', true)
            ->whereNotNull('commentaire')
            ->limit(10)
            ->get())
    ]);
})->name('accueil');

Route::get('/menu', [ProduitController::class, 'index'])->name('menu.index');

Route::get('/panier', [PanierController::class, 'index'])->middleware(EnsureUserIsLoggedIn::class);
Route::post('/commande', [CommandeController::class, 'store'])->middleware(EnsureUserIsLoggedIn::class)->name('envoiCommande');

Route::get('/avis', [CommentaireController::class, 'index'])->middleware(EnsureUserIsLoggedIn::class);
Route::post('/avis', [CommentaireController::class, 'store'])->middleware(EnsureUserIsLoggedIn::class);

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

    Route::post('/menu/modifier', [ProduitController::class, 'update'])->name('menu.update');
    Route::post('/dates-menu', [DatesMenuController::class, 'update']);

    Route::controller(ClientController::class)->group(function() {
        Route::get('/admin/clients', 'index')->name('admin.clients');
        Route::get('/admin/client/{id}', 'show')->name('admin.client');
        Route::post('/admin/client/update', 'update')->name('admin.client.update');
    });

    Route::controller(CommandeController::class)->group(function() {
        Route::get('/admin/commandes', 'index')->name('admin.commandes');
    });

    Route::get('admin/commentaires', [CommentaireController::class, 'indexAdmin'])->middleware(EnsureUserIsLoggedIn::class)->name("admin.commentaires");
});

Route::get('/producteurs', [ProducteurController::class, 'index']);

Route::get('/valeurs', function () {
    return Inertia::render('Valeur/Valeurs', []);
})->name('valeurs');

Route::delete('/adresse/{id}', [AdresseController::class, 'destroy']);
Route::post('/adresse', [AdresseController::class, 'store']);

require __DIR__.'/auth.php';
