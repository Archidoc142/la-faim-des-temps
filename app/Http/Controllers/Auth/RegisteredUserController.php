<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\QBToken;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use QuickBooksOnline\API\DataService\DataService;
use QuickBooksOnline\API\Facades\Customer;

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
            'telephone' => 'nullable|numeric|digits:10',
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

        try {
            $user = User::create([
                'nom' => $request->nom,
                'prenom' => $request->prenom,
                'email' => $request->email,
                'telephone' => $request->telephone,
                'password' => Hash::make($request->password),
                'id_role' => 1
            ]);
        } catch (Exception $e) {
            // Do sommething with the exception
        }

        try {
            $this->sendToQB($user);
        } catch (Exception $e) {
            // Do sommething with the exception
        }

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('accueil', absolute: false));
    }

    private function sendToQB(User $user)
    {
        //Configuration de la connection à l'API de QuickBooks
        $config = include(app_path() . '/config.php');

        $dataService = DataService::Configure(array(
            'auth_mode' => 'oauth2',
            'ClientID' => $config['client_id'],
            'ClientSecret' =>  $config['client_secret'],
            'RedirectURI' => $config['oauth_redirect_uri'],
            'scope' => $config['oauth_scope'],
            'baseUrl' => "development",
            'QBORealmID' => "9341453160686081",                 //valeur à changer pour déploiement
            'accessTokenKey' => QBToken::getToken("access"),
            'refreshTokenKey' => QBToken::getToken("refresh")
        ));

        $userPhone = "";
        if(isset($user->telephone)) {
            $userPhone = $user->telephone;
        }

        $QBuserObj = Customer::create([
            "GivenName" => $user->prenom, 
            "FamilyName" => $user->nom, 
            "PrimaryEmailAddr" => [
                "Address" => $user->email
            ],
            "PrimaryPhone" => [
                "FreeFormNumber" => $userPhone
            ]
        ]);

        //code from : https://github.com/intuit/QuickBooks-V3-PHP-SDK/blob/master/src/_Samples/CustomerCreate.php
        $resultingCustomerObj = $dataService->Add($QBuserObj);

        //TO DO: créer un affichage pour les erreurs
        $error = $dataService->getLastError();
        if ($error) {
            echo "The Status code is: " . $error->getHttpStatusCode() . "\n";
            echo "The Helper message is: " . $error->getOAuthHelperError() . "\n";
            echo "The Response message is: " . $error->getResponseBody() . "\n";
        } else {
            echo ($resultingCustomerObj);
        }
    }

}
