<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use App\Models\User;
use App\Services\QuickBooksService;
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
            'prenom' => 'required|max:64|regex:/^[\p{Lu}][\p{Ll}]+(-[\p{Lu}][\p{Ll}]+)*$/u',
            'nom' => 'required|max:64|regex:/^[\p{Lu}][\p{Ll}]+(-[\p{Lu}][\p{Ll}]+)*$/u',
            'telephone' => 'nullable|numeric|digits:10'
        ];

        $messages = [
            'nom.required' => __("auth.nom.required"),
            'nom.max' => __("auth.nom.max"),
            'nom.regex' => __("auth.nom.regex"),

            'prenom.required' => __("auth.prenom.required"),
            'prenom.max' => __("auth.prenom.max"),
            'prenom.regex' => __("auth.prenom.regex"),

            'telephone.digits' => __("auth.telephone.digits"),
            'telephone.numeric' => __("auth.telephone.digits")
        ];

        if($client->email != $request->email)
        {
            $rules['email'] = 'required|string|lowercase|regex:/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/|max:100|unique:'.User::class;
            $messages['email.required'] = __("auth.email.required");
            $messages['email.email'] = __("auth.email.email");
            $messages['email.regex'] = __("auth.email.regex");
            $messages['email.unique'] = __("auth.email.unique");
        }

        $validation = Validator::make($request->all(), $rules, $messages);

        if ($validation->fails())
            return back()->withErrors($validation->errors())->withInput();

        $client->nom = $request->nom;
        $client->prenom = $request->prenom;
        $client->email = $request->email;
        $client->telephone = $request->telephone;

        $client->save();

        if(!is_null($client->id_qb))
        {
            $qbService = new QuickBooksService();
            $qbService->updateCustomer($client);
        }

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
