<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(Request $request): RedirectResponse
    {
        //dd($request);
        $client = Auth::user();

        $rules = [
            'prenom' => 'required|max:64|regex:/^[A-ZÀ-Ü][a-zà-ù-]+$/',
            'nom' => 'required|max:64|regex:/^[A-ZÀ-Ü][a-zà-ù-]+$/',
            'telephone' => 'nullable|numeric|digits:10'
        ];

        $messages = [
            'nom.required' => 'Veuillez entrer un nom de famille.',
            'nom.max' => 'Le nom de famille ne peut pas dépasser 64 caractères.',
            'nom.regex' => 'Le format du nom de famille entré est invalide.',

            'prenom.required' => 'Veuillez entrer un prénom.',
            'prenom.max' => 'Le prénom ne peut pas dépasser 64 caractères.',
            'prenom.regex' => 'Le format du prénom entré est invalide.',

            'telephone.digits' => 'Le numéro de téléphone doit contenir 10 chiffres.',
            'telephone.numeric' => 'Le numéro de téléphone doit contenir 10 chiffres.'
        ];

        if($client->email != $request->email)
        {
            $rules['email'] = 'required|string|lowercase|email|max:128|unique:'.User::class;
            $messages['email.required'] = 'Veuillez entrer un courriel.';
            $messages['email.email'] = 'Veuillez entrer un courriel valide.';
            $messages['email.regex'] = 'Le format du courriel entré est invalide.';
            $messages['email.unique'] = 'Le courriel appartient déjà à un autre client.';
        }

        $validation = Validator::make($request->all(), $rules, $messages);

        if ($validation->fails())
            return back()->withErrors($validation->errors())->withInput();

        $client->nom = $request->nom;
        $client->prenom = $request->prenom;
        $client->email = $request->email;
        $client->telephone = $request->telephone;

        $client->save();

        return Redirect::route('profile.edit');
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
