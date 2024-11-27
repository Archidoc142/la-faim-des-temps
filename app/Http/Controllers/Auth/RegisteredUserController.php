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
use App\Services\QuickBooksService;

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
        $qbService = new QuickBooksService();

        $request->merge([
            "email" => strtolower($request->email)
        ]);

        $request->validate([
            'prenom' => 'required|max:64|regex:/^[\p{Lu}][\p{Ll}]+(-[\p{Lu}][\p{Ll}]+)*$/u',
            'nom' => 'required|max:64|regex:/^[\p{Lu}][\p{Ll}]+([ -][\p{Lu}][\p{Ll}]+)*$/u',
            'email' => 'required|string|regex:/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/|max:100|unique:'.User::class,
            'telephone' => 'nullable|numeric|digits:10',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ],[
            'nom.required' => __("auth.nom.required"),
            'nom.max' => __("auth.nom.max"),
            'nom.regex' => __("auth.nom.regex"),

            'prenom.required' => __("auth.prenom.required"),
            'prenom.max' => __("auth.prenom.max"),
            'prenom.regex' => __("auth.prenom.regex"),

            'email.required' => __("auth.email.required"),
            'email.regex' => __("auth.email.regex"),

            'telephone.digits' => __("auth.telephone.digits"),
        ]);

        $user = User::create([
            'nom' => $request->nom,
            'prenom' => $request->prenom,
            'email' => $request->email,
            'telephone' => $request->telephone,
            'password' => Hash::make($request->password),
            'id_role' => 1,
            "type" => 0
        ]);

        $qbService->sendCustomer($user);

        event(new Registered($user));

        Auth::login($user);

        if($request->redirectToPanier)
            return redirect("/panier?loggedIn=1");

        return redirect(route('accueil', absolute: false));
    }
}
