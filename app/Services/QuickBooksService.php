<?php
namespace App\Services;

use App\Models\QBToken;
use App\Models\User;
use App\Http\Models\Commande;
use App\Models\ProduitFormat;
use App\Models\QBId;
use App\Models\TarifLivraison;
use Illuminate\Support\Facades\Crypt;
use QuickBooksOnline\API\DataService\DataService;
use QuickBooksOnline\API\Facades\Customer;
use QuickBooksOnline\API\Facades\Invoice;
use QuickBooksOnline\API\Facades\Item;
use QuickBooksOnline\API\Facades\Account;
use Illuminate\Http\Request;
use QuickBooksOnline\API\Facades\Deposit;
use QuickBooksOnline\API\Facades\Payment;

class QuickBooksService
{
    private function getGUID()
    {
        if (function_exists('com_create_guid')){
            return com_create_guid();
        }else{
            mt_srand((double)microtime()*10000);//optional for php 4.2.0 and up.
            $charid = strtoupper(md5(uniqid(rand(), true)));
            $hyphen = chr(45);// "-"
            $uuid = // "{"
                $hyphen.substr($charid, 0, 8);
            return $uuid;
        }
    }

    private function getIncomeAccountObj($dataService)
    {
        $accountArray = $dataService->Query("select * from Account where AccountType='Income' and AccountSubType='SalesOfProductIncome'");
        $error = $dataService->getLastError();
        if ($error) {
            dd($error);
        } else {
            if (is_array($accountArray) && sizeof($accountArray) > 0) {
                return current($accountArray);
            }
        }

        // Create Income Account
        $incomeAccountRequestObj = Account::create([
            "AccountType" => 'Income',
            "AccountSubType" => 'SalesOfProductIncome',
            "Name" => "IncomeAccount-" . $this->getGUID()
        ]);
        $incomeAccountObject = $dataService->Add($incomeAccountRequestObj);
        $error = $dataService->getLastError();
        if ($error) {
            dd($error);
        } else {
            echo "Created Income Account with Id={$incomeAccountObject->Id}.\n\n";
            return $incomeAccountObject;
        }

    }

    public function initItems()
    {
        $dataService = $this->configureDataService();

        // À REMPLACER PAR LE BON COMPTE EN PRODUCTION
        $incomeAccount = $this->getIncomeAccountObj($dataService);

        $items = ProduitFormat::all();

        foreach($items as $item)
        {
            $itemQb = $dataService->Query("SELECT * FROM Item WHERE Name='" . $item->nomInterne() . "'" );
            if(is_null($itemQb))
            {
                $newItem = Item::create([
                    "Name" => $item->nomInterne(),
                    "Type" => "Service",
                    "IncomeAccountRef"=> ["value"=>  $incomeAccount->Id]
                ]);

                $itemQb = $dataService->Add($newItem);
                $item->id_qb = $itemQb->Id;
            }
            else
            {
                $item->id_qb = $itemQb[0]->Id;
            }

            $item->save();
        }

        $this->getFraisLivraisonItem();
    }

    public function getFraisLivraisonItem()
    {
        $dataService = $this->configureDataService();
        $incomeAccount = $this->getIncomeAccountObj($dataService);

        $itemLivraisonQb = $dataService->Query("SELECT * FROM Item WHERE Name='Frais de livraison'" );

        if(is_null($itemLivraisonQb))
        {
            $newItem = Item::create([
                "Name" => "Frais de livraison",
                "Type" => "Service",
                "IncomeAccountRef"=> ["value"=>  $incomeAccount->Id]
            ]);

            $itemLivraisonQb = $dataService->Add($newItem);
            return $itemLivraisonQb;
        }
        else
        {
            return $itemLivraisonQb[0];
        }
    }

    //Cette fonctione permet de créer un utilisateur dans QuickBooks et de lier son ID QuickBooks à la table User
    public function sendToQB(User $user)
    {
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

    private function sendInvoiceEmail($invoice, $email)
    {
        $dataService = $this->configureDataService();
        $dataService->SendEmail($invoice, $email);   //Envoie de la facture par courriel au client, la personnalisation du courriel en question ce fais dans la configuration de QB
    }

    //Cette fonction permet de créer une facture dans QuickBooks
    //l'envoi de la facture par courriel au client est fait automatiquement
    public function createInvoice($commande, $items, $sendEmail) {
        $dataService = $this->configureDataService();

        $salesTermQuery = $dataService->Query("select * from Term where Name LIKE '%Due%'");
        if(is_null($salesTermQuery))
            $salesTermQuery = $dataService->Query("select * from Term where Name LIKE '%Payable%'");

        $salesTerm = current($salesTermQuery);
        $invoiceData = [
            "Line" => $items,
            "CustomerRef" => [
                "value" => $commande->user->id_qb
            ],
            "BillEmail" => [
                "Address" => $commande->user->email
            ],
            "EmailStatus" => "NeedToSend",
            "DueDate" => date("Y-m-d", strtotime('next thursday')),
            "SalesTermRef" => [ "value" => strval($salesTerm->Id) ],
        ];

        if($commande->livraison)
        {
            $invoiceData["BillAddr"] = [
                "Line1" => $commande->user->prenom . " " . $commande->user->nom,
                "Line2" => $commande->adresse->no_civique . " " . $commande->adresse->rue
            ];

            if($commande->adresse->appartement)
            {
                $invoiceData["BillAddr"]["Line3"] = "Appt " . $commande->adresse->appartement;
                $invoiceData["BillAddr"]["Line4"] = "Sherbrooke, QC  " . $commande->adresse->code_postal;
            }
            else
            {
                $invoiceData["BillAddr"]["Line3"] = "Sherbrooke, QC  " . $commande->adresse->code_postal;
            }
        }

        $invoiceObj = Invoice::create($invoiceData);

        $resultingInvoiceObj = $dataService->Add($invoiceObj);

        //dump($dataService->getLastError());

        $commande->qb_id = $resultingInvoiceObj->Id;
        $commande->qb_invoice_id = intval($resultingInvoiceObj->DocNumber); // non, ce n'est pas une erreur...
        $commande->save();

        if($sendEmail)
            $this->sendInvoiceEmail($resultingInvoiceObj, $commande->user->email);

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

    public function refreshTokens()
    {
        $OAuth2LoginHelper = $this->initOAuth2LoginHelper();

        $oldRefreshToken = QBToken::getToken('refresh');

        $accessTokenObj = $OAuth2LoginHelper->refreshAccessTokenWithRefreshToken($oldRefreshToken);

        $this->storeTokens($accessTokenObj);

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

    public function getAllAccounts()
    {
        $dataService = $this->configureDataService();

        $accountArray = $dataService->Query("select * from Term where Name LIKE '%Due%'");

        if(is_null($accountArray))
            $accountArray = $dataService->Query("select * from Term where Name LIKE '%Due%'");


        dd($accountArray);

    }
    public function sendPayment($user, $commande)
    {
        $dataService = $this->configureDataService();

        $bankAccountArray = $dataService->Query("select * from Account where AccountType='Bank' and AccountSubType='Checking'");
        $bankAccount = current($bankAccountArray);

        $paymentData = [
            "CustomerRef" => [ "value" => strval($user->id_qb) ],
            "TotalAmt" => $commande->total,
            "Line" => [
                [
                    "Amount" => $commande->total,
                    "LinkedTxn" => [
                    [
                        "TxnId" => strval($commande->qb_id),
                        "TxnType" => "Invoice"
                    ]],
                ]
            ],
            "DepositToAccountRef" => [ "value" => strval($bankAccount->Id) ]
        ];

        $payment = Payment::create($paymentData);

        $dataService->Add($payment);

        $error = $dataService->getLastError();

        if ($error) {
            dd($error);
            echo "The Status code is: " . $error->getHttpStatusCode() . "\n";
            echo "The Helper message is: " . $error->getOAuthHelperError() . "\n";
            echo "The Response message is: " . $error->getResponseBody() . "\n";
        }
        else
        {
            //dump($resultingDeposit);
            $invoice = $dataService->Query("SELECT * FROM Invoice WHERE Id='" . $commande->qb_id . "'" );
            $this->sendInvoiceEmail($invoice[0], $user->email);
        }
    }
}
