<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
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
            'telephone' => 'numeric|digits:10',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ],[
            'nom.required' => 'Veuillez entrer un nom de famille.',
            'nom.max' => 'Le nom de famille ne peut pas dépasser 64 caractères.',
            'nom.regex' => 'Le format du nom de famille entré est invalide.',

            'prenom.required' => 'Veuillez entrer un prénom.',
            'prenom.max' => 'Le prénom ne peut pas dépasser 64 caractères.',
            'prenom.regex' => 'Le format du prénom entré est invalide.',

            'courriel.required' => 'Veuillez entrer un courriel.',
            'courriel.regex' => 'Le format du courriel entré est invalide.',

            'telephone.digits' => 'Le numéro de téléphone doit respecter le format (xxx) xxx-xxxx.',
        ]);

        $user = User::create([
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'email' => $request->email,
            'telephone' => $request->telephone,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('accueil', absolute: false));
    }
}
