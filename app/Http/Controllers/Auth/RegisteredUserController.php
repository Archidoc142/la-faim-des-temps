<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\GoogleId;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use App\Services\QuickBooksService;
use Exception;
use Laravel\Socialite\Facades\Socialite;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    private function storeToQB($user)
    {
        $quickBooksService = new QuickBooksService();

        if($quickBooksService->refreshTokens())

        try {
            $resultingCustomerObj = $quickBooksService->sendToQB($user);
        } catch (Exception $e) {
            // Do sommething with the exception
        }
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'prenom' => 'required|max:64|regex:/^[A-ZÀ-Ü][a-zà-ù-]+$/',
            'nom' => 'required|max:64|regex:/^[A-ZÀ-Ü][a-zà-ù-]+$/',
            'email' => 'required|string|lowercase|email|max:128|unique:'.User::class,
            'telephone' => 'nullable|numeric|digits:10',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ],[
            'nom.required' => 'Veuillez entrer un nom de famille.',
            'nom.max' => 'Le nom de famille ne peut pas dépasser 64 caractères.',
            'nom.regex' => 'Le format du nom de famille entré est invalide.',

            'prenom.required' => 'Veuillez entrer un prénom.',
            'prenom.max' => 'Le prénom ne peut pas dépasser 64 caractères.',
            'prenom.regex' => 'Le format du prénom entré est invalide.',

            'email.required' => 'Veuillez entrer un courriel.',
            'email.regex' => 'Le format du courriel entré est invalide.',

            'telephone.digits' => 'Le numéro de téléphone doit respecter le format (xxx) xxx-xxxx.',
        ]);

        $user = User::create([
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'email' => $request->email,
            'telephone' => $request->telephone,
            'password' => Hash::make($request->password),
            'id_role' => 1
        ]);

        $this->storeToQB($user);

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('accueil', absolute: false));
    }

    public function google(Request $request)
    {
        $user = Socialite::driver('google')->user();

        $userExists = GoogleId::where('client_id', $user->id)->exists();

        $googleId = GoogleId::firstOrCreate(
            ['client_id' => $user->id]
        );

        $user = User::updateOrCreate(
        [
            'email' => $user->email,
        ],
        [
            'nom' => $user->user['family_name'],
            'prenom' => $user->user['given_name'],
            'google_token' => $user->token,
            'type' => 1,
            'id_role' => 1,
            'type' => 1,
            'id_google' => $googleId->id
        ]);

        if(!$userExists)
        {
            $this->storeToQB($user);
            event(new Registered($user));
        }

        Auth::login($user);

        return redirect(route('accueil', absolute: false));
    }
}
