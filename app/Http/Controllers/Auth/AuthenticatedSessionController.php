<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Mail\Order;
use App\Models\GoogleId;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;
use App\Services\QuickBooksService;
use App\Models\QBToken;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Mail;
use Laravel\Socialite\Facades\Socialite;

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

        //tentative de création de compte QuickBooks si aucun compte n'est lié et que l'utilisateur n'est pas admin
        if(QBToken::exists() && $request->user()->role->nom != "admin" && $request->user()->id_qb === null)
            $quickBooksService->sendToQB($request->user());

        if($request->redirectToPanier)
            return redirect("/panier?loggedIn=1");

        return redirect("/?loggedIn=1");
    }

    public function googleLogin(Request $request)
    {
        if(isset($request->target))
            return Socialite::driver('google')
                    ->with(["state" => "panier"])
                    ->redirect();

        return Socialite::driver('google')
            ->redirect();
    }

    public function google(Request $request)
    {
        $googleUser = Socialite::driver('google')->stateless()->user();
        $userExists = GoogleId::where('client_id', $googleUser->id)->exists();
        $user = null;

        $googleId = GoogleId::firstOrCreate(
            ['client_id' => $googleUser->id]
        );

        if(!$userExists)
        {
            $user = User::create(
                [
                    'email' => $googleUser->email,
                    'nom' => $googleUser->user['family_name'],
                    'prenom' => $googleUser->user['given_name'],
                    'google_token' => $googleUser->token,
                    'type' => 1,
                    'id_role' => 1,
                    'type' => 1,
                    'id_google' => $googleId->id
                ]);
        }
        else
        {
            $user = User::where("email", $googleUser->email)->first();
            $user->google_token = $user->token;
            $user->save();
        }

        if(is_null($user->id_qb))
        {
            $qbService = new QuickBooksService();
            $qbService->sendCustomer($user);

            event(new Registered($user));
        }

        Auth::login($user);

        $state = $request->input("state");

        if($state == "panier")
            return redirect("/panier?loggedIn=1");

        return redirect("/?loggedIn=1");
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/?isLogout=1');
    }
}
