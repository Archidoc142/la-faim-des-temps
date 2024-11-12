<?php

use App\Http\Controllers\AccueilController;
use App\Http\Controllers\AdresseController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\CommandeController;
use App\Http\Controllers\DatesMenuController;
use App\Http\Controllers\CommentaireController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProducteurController;
use App\Http\Controllers\ProduitController;
use App\Http\Controllers\PanierController;
use App\Http\Controllers\SaisonController;
use App\Http\Controllers\TarifLivraisonController;
use App\Http\Controllers\TexteStatique;
use App\Http\Middleware\EnsureUserIsAdmin;
use App\Http\Middleware\EnsureUserIsLoggedIn;
use App\Http\Resources\CommentaireResource;
use App\Http\Controllers\FormatController;
use App\Models\Commentaire;
use App\Models\Produit;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [AccueilController::class, 'accueil'])->name('accueil');

Route::get('/histoire', function () {
    return Inertia::render('Histoire');
})->name('histoire');

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

Route::post('/dates-menu', [DatesMenuController::class, 'update']);

Route::middleware(EnsureUserIsAdmin::class)->group(function() {
    Route::get('/admin', function() { return redirect()->route('admin.clients');})->name('admin.accueil');

    Route::post('/menu/modifier', [ProduitController::class, 'update'])->name('menu.update');

    Route::post('/modifier-texte', [TexteStatique::class, 'update']);


    Route::controller(ImageController::class)->group(function() {
        Route::get('/admin/images', 'index')->name('admin.images');
        Route::post('/admin/image', 'store');
        Route::post('/admin/del-image', 'destroy');
    });

    Route::controller(ClientController::class)->group(function() {
        Route::get('/admin/clients', 'index')->name('admin.clients');
        Route::get('/admin/client/{id}', 'show')->name('admin.client');
        Route::post('/admin/client/update', 'update')->name('admin.client.update');
    });

    Route::controller(CommandeController::class)->group(function() {
        Route::get('/admin/commandes', 'index')->name('admin.commandes');
        Route::get('/admin/commande/{id}', 'show')->name('admin.commande');
    });

    Route::controller(CommentaireController::class)->group(function() {
        Route::get('admin/commentaires', 'indexAdmin')->middleware(EnsureUserIsLoggedIn::class)->name("admin.commentaires");
        Route::patch('admin/commentaire/toggle/{id}', 'update')->middleware(EnsureUserIsLoggedIn::class)->name("admin.commentaire.update");
        Route::delete('admin/commentaire/destroy/{id}', 'destroy')->middleware(EnsureUserIsLoggedIn::class)->name("admin.commentaire.destroy");
    });

    Route::controller(TarifLivraisonController::class)->group(function() {
        Route::get('admin/tarifs', 'index')->middleware(EnsureUserIsLoggedIn::class)->name("admin.tarifs");
        Route::post('admin/tarif/updateTarif', 'updateTarif')->middleware(EnsureUserIsLoggedIn::class)->name("admin.tarif.updateTarif");
        Route::post('admin/tarif/updateFormat', 'updateFormat')->middleware(EnsureUserIsLoggedIn::class)->name("admin.tarif.updateFormat");
    });

    Route::controller(FormatController::class)->group(function() {
        Route::post('/admin/tarif', 'store');
    });

    Route::controller(ProducteurController::class)->group(function() {
        Route::post('/producteurs', 'store')->name('envoiNewProducteur');
        Route::post('/admin/producteur/update', 'update')->name('updateProducteur');
        Route::post('/admin/producteur/delete', 'destroy');
    });
});

Route::get('/producteurs', [ProducteurController::class, 'index']);

Route::get('/valeurs', function () {
    return Inertia::render('Valeur/Valeurs', []);
})->name('valeurs');

Route::delete('/adresse/{id}', [AdresseController::class, 'destroy']);
Route::post('/adresse', [AdresseController::class, 'store']);

require __DIR__.'/auth.php';
