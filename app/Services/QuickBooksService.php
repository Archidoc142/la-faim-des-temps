<?php
namespace App\Services;

use App\Models\QBToken;
use App\Models\User;
use App\Http\Models\Commande;
use App\Models\QBId;
use Illuminate\Support\Facades\Crypt;
use QuickBooksOnline\API\DataService\DataService;
use QuickBooksOnline\API\Facades\Customer;
use QuickBooksOnline\API\Facades\Invoice;
use QuickBooksOnline\API\Facades\Item;
use Illuminate\Http\Request;

class QuickBooksService
{
    //Cette fonctione permet de créer un utilisateur dans QuickBooks et de lier son ID QuickBooks à la table User
    public function sendToQB(User $user)
    {
        //Configuration de la connection à l'API de QuickBooks
        $config = include(app_path() . '/config.php');

        $dataService = $this->configureDataService();

        $userPhone = "";
        if(isset($user->telephone)) {
            $userPhone = $user->telephone;
        }

        //Toujours définir le champs DisplayName avec une valeur unique (ici l'adresse courriel),
        //car QuickBooks ne permet pas de créer un client avec un DisplayName déjà existant (concaténation du prénom + nom fais de base)
        $QBuserObj = Customer::create([
            "GivenName" => $user->prenom, 
            "FamilyName" => $user->nom, 
            "PrimaryEmailAddr" => [
                "Address" => $user->email
            ],
            "DisplayName" => $user->email,  //pour créer le compte on utilise l'email en displayName pour avoir un nom unique (requis de QuickBooks), mais une fois l'id de QuickBooks créé, update le displayName avec le nom complet + #id_qb
            "PrimaryPhone" => [
                "FreeFormNumber" => $userPhone
            ]
        ]);

        $resultingCustomerObj = $dataService->Add($QBuserObj);

        //Si l'ajout du client à QuickBooks est un succès, on ajoute son ID QuickBooks à la table QB_id s'il n'existe pas déjà,
        // sinon on ne fait pas de lien avec QuickBooks (une tentative création de compte QuickBooks est faites à chaque connexion s'il n'y a pas de compte lié)
        if($resultingCustomerObj !== null) {
            $objId = intval($resultingCustomerObj->Id);

            // //On ajoute l'id de la table QB_id du client à la table User
            $user->id_qb = $objId;
            $user->save();

            $this->updateCustomer($user);
        }

        //TO DO: créer un affichage pour les erreurs
        $error = $dataService->getLastError();
        if ($error) {
            return "The Status code is: " . $error->getHttpStatusCode() . "\n" .
               "The Helper message is: " . $error->getOAuthHelperError() . "\n" .
               "The Response message is: " . $error->getResponseBody() . "\n";
        } else {
            return $resultingCustomerObj;
        }   
    }

    //Cette fonction permet de faire une update des information client dans quickbooks
    public function updateCustomer(User $user)
    {
        $config = include(app_path() . '/config.php');

        $dataService = $this->configureDataService();

        $userPhone = "";
        if(isset($user->telephone)) {
            $userPhone = $user->telephone;
        }

        $customer = $dataService->FindbyId('customer', $user->id_qb);
        $QBuserObj = Customer::update($customer, [
            "GivenName" => $user->prenom, 
            "FamilyName" => $user->nom, 
            "PrimaryEmailAddr" => [
                "Address" => $user->email
            ],
            "DisplayName" => $user->prenom. " ". $user->nom . " #" . $user->id_qb,
            "PrimaryPhone" => [
                "FreeFormNumber" => $userPhone
            ]
        ]);

        $resultingCustomerObj = $dataService->Update($QBuserObj);

        //TO DO: créer un affichage pour les erreurs
        $error = $dataService->getLastError();
        if ($error) {
            return "The Status code is: " . $error->getHttpStatusCode() . "\n" .
               "The Helper message is: " . $error->getOAuthHelperError() . "\n" .
               "The Response message is: " . $error->getResponseBody() . "\n";
        } else {
            return $resultingCustomerObj;
        }   
    }

    //Cette fonction permet de créer une facture dans QuickBooks
    //l'envoi de la facture par courriel au client est fait automatiquement
    public function createInvoice($commande, $items) {
        $config = include(app_path() . '/config.php');

        $dataService = $this->configureDataService();

        $invoiceObj = Invoice::create([
            "Line" => [
                [
                    "Amount" => $commande->total,
                    "DetailType" => "SalesItemLineDetail",
                    "SalesItemLineDetail" => [
                        "ItemRef" => [
                            "value" => "1",
                            "name" => "Services"
                        ]
                    ]
                ]
            ],
            "CustomerRef" => [
                "value" => $commande->user->id_qb
            ],
            "BillEmail" => [
                "Address" => $commande->user->email
            ],
            "EmailStatus" => "NeedToSend"
        ]);

        $resultingInvoiceObj = $dataService->Add($invoiceObj);

        $emailSendStatus = $dataService->SendEmail($resultingInvoiceObj, $commande->user->email);   //Envoie de la facture par courriel au client, la personnalisation du courriel en question ce fais dans la configuration de QB

        //TO DO: créer un affichage pour les erreurs
        $error = $dataService->getLastError();
        if ($error) {
            return "The Status code is: " . $error->getHttpStatusCode() . "\n" .
               "The Helper message is: " . $error->getOAuthHelperError() . "\n" .
               "The Response message is: " . $error->getResponseBody() . "\n";
        } else {
            return $resultingInvoiceObj;
        }
    }

    //Cette fonction permet de créer un item dans QuickBooks pour ensuite l'ajouter à la facture
    private function createItem($service, $name, $price, /*et d'autres paramètres */){}

    public function refreshTokens()
    {
        $OAuth2LoginHelper = $this->initOAuth2LoginHelper();

        $oldRefreshToken = QBToken::getToken('refresh');

        $accessTokenObj = $OAuth2LoginHelper->refreshAccessTokenWithRefreshToken($oldRefreshToken);

        $this->storeTokens($accessTokenObj);

        //Pour tester si les tokens sont bien refresh
        // return Inertia::render('Admin/QuickBooksAuth', [
        //     'url' => QBToken::getToken("access")
        // ]);

    }

    public function initOAuth2LoginHelper()
    {
        $config = include(app_path() . '/config.php');

        //Ne pas utilsier la fonction configureDataService() car les tokens n'existe pas encore ou sont expirés
        $dataService = DataService::Configure(array(
            'auth_mode' => 'oauth2',
            'ClientID' => $config['client_id'],
            'ClientSecret' =>  $config['client_secret'],
            'RedirectURI' => $config['oauth_redirect_uri'],
            'scope' => $config['oauth_scope'],
            'baseUrl' => "development"
        ));

        return $dataService->getOAuth2LoginHelper();
    }

    public function storeTokens($accessTokenObj)
    {
        $accessTokenValue = $accessTokenObj->getAccessToken();
        $refreshTokenValue = $accessTokenObj->getRefreshToken();

        $accessTokenExpiration = str_replace("/", "-", $accessTokenObj->getAccessTokenExpiresAt());
        $refreshTokenExpiration = str_replace("/", "-", $accessTokenObj->getRefreshTokenExpiresAt());

        QBToken::truncate();

        QBToken::create([
            'type' => 'access',
            'encrypted_token' => Crypt::encryptString($accessTokenValue),
            'expiration_date' => $accessTokenExpiration
        ]);

        QBToken::create([
            'type' => 'refresh',
            'encrypted_token' => Crypt::encryptString($refreshTokenValue),
            'expiration_date' => $refreshTokenExpiration
        ]);
    }

    private function configureDataService()
    {
        $config = include(app_path() . '/config.php');

        return DataService::Configure(array(
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
    }
}