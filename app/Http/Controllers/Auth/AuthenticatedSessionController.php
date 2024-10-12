<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use App\Services\QuickBooksService;
use App\Models\QBToken;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        $quickBooksService = new QuickBooksService();

        //If token exist refesh it, else display a error 
        if(QBToken::exists()) 
            $quickBooksService->refreshTokens();

        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $quickBooksService = new QuickBooksService();

        $request->authenticate();

        $request->session()->regenerate();

        //tentative de création de compte QuickBooks si aucun compte n'est lié
        if($request->user()->qb_id === null)
            $quickBooksService->sendToQB($request->user());

        return redirect()->intended(route('accueil', absolute: false));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
