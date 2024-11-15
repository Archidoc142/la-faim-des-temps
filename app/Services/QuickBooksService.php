<?php
namespace App\Services;

use App\Models\QBToken;
use App\Models\User;
use App\Http\Models\Commande;
use App\Models\ProduitFormat;
use App\Models\QBId;
use App\Models\TarifLivraison;
use Exception;
use Illuminate\Support\Facades\Crypt;
use QuickBooksOnline\API\DataService\DataService;
use QuickBooksOnline\API\Facades\Customer;
use QuickBooksOnline\API\Facades\Invoice;
use QuickBooksOnline\API\Facades\Item;
use QuickBooksOnline\API\Facades\Account;
use Illuminate\Http\Request;
use QuickBooksOnline\API\Exception\ServiceException;
use QuickBooksOnline\API\Facades\Deposit;
use QuickBooksOnline\API\Facades\Payment;
use TypeError;

class QuickBooksService
{
    public function sendCustomer(User $user)
    {
        $quickBooksService = new QuickBooksService();

        if($quickBooksService->refreshTokens())
        {
            return $quickBooksService->sendToQB($user);
        }

        return false;
    }

    private function getIncomeAccountObj($dataService)
    {
        $accountArray = $dataService->Query("select * from Account where Name like '%40000 Ventes%'");
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
            "Name" => "40000 Ventes"
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
        if(isset($resultingCustomerObj)) {
            $objId = intval($resultingCustomerObj->Id);

            // //On ajoute l'id de la table QB_id du client à la table User
            $user->id_qb = $objId;
            $user->save();
        }

        //TO DO: créer un affichage pour les erreurs
        $error = $dataService->getLastError();
        if($error)
            return false;

        return $objId;
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

        return !$error;
    }

    private function sendInvoiceEmail($invoice, $email)
    {
        $dataService = $this->configureDataService();
        $dataService->SendEmail($invoice, $email);   //Envoie de la facture par courriel au client, la personnalisation du courriel en question ce fais dans la configuration de QB
        //$dataService->SendEmail($invoice, 'dragonwhites.minecraftgaming@gmail.com');   //Envoie de la même facture au propriétaire en guise de notification
    }

    //Cette fonction permet de créer une facture dans QuickBooks
    //l'envoi de la facture par courriel au client est fait automatiquement
    public function createInvoice($commande, $items, $sendEmail) {
        try
        {
            $dataService = $this->configureDataService();

            $salesTermQuery = $dataService->Query("select * from Term where Name LIKE '%Due%'");

            if(is_null($salesTermQuery))
                $salesTermQuery = $dataService->Query("select * from Term where Name LIKE '%Payable%'");

            $customerIdQb = $commande->user->id_qb;

            if(is_null($customerIdQb))
            {
                $customerIdQb = $this->sendCustomer($commande->user);

                if(!$customerIdQb)
                    return false;
            }

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
                "PrivateNote" => (is_null($commande->allergenes) ? "Aucun allergène" : "Allergènes : " . $commande->allergenes )
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

            $error = $dataService->getLastError();

            if(!$error)
            {
                $commande->qb_id = $resultingInvoiceObj->Id;
                $commande->qb_invoice_id = intval($resultingInvoiceObj->DocNumber); // non, ce n'est pas une erreur...
                $commande->save();

                if($sendEmail)
                    $this->sendInvoiceEmail($resultingInvoiceObj, $commande->user->email);
            }

            return !$error;
        }
        catch(TypeError | Exception $e)
        {
            return false;
        }
    }

    public function refreshTokens()
    {
        if(QBToken::exists())
        {
            $OAuth2LoginHelper = $this->initOAuth2LoginHelper();
            $oldRefreshToken = QBToken::getToken('refresh');

            try
            {
                $accessTokenObj = $OAuth2LoginHelper->refreshAccessTokenWithRefreshToken($oldRefreshToken);
                $this->storeTokens($accessTokenObj);
                return true;
            }
            catch(ServiceException $e)
            {
                return false;
            }
        }
        else
        {
            return false;
        }
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
            'QBORealmID' => env("QB_REALM_ID"),                 //valeur à changer pour déploiement
            'accessTokenKey' => QBToken::getToken("access"),
            'refreshTokenKey' => QBToken::getToken("refresh")
        ));
    }

    private function getBankAccount($dataService)
    {
        $bankAccounts = $dataService->Query("select * from Account where Name like '%10000 Compte chèques (5020)%'");

        $error = $dataService->getLastError();
        if ($error) {
            dd($error);
        } else {
            if (is_array($bankAccounts) && sizeof($bankAccounts) > 0) {
                return current($bankAccounts);
            }
        }

        // Create Income Account
        $bankAccountRequestObj = Account::create([
            "AccountType" => 'Bank',
            "AccountSubType" => 'Checking',
            "Name" => "10000 Compte chèques (5020)"
        ]);
        $bankAccountObject = $dataService->Add($bankAccountRequestObj);
        $error = $dataService->getLastError();
        if ($error) {
            dd($error);
        } else {
            return $bankAccountObject;
        }

    }

    public function sendPayment($user, $commande)
    {
        try
        {
            $dataService = $this->configureDataService();

            $bankAccount = $this->getBankAccount($dataService);

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

            if (!$error) {
                $invoice = $dataService->Query("SELECT * FROM Invoice WHERE Id='" . $commande->qb_id . "'" );
                $this->sendInvoiceEmail($invoice[0], $user->email);
            }

            return !$error;
        }
        catch(Exception | TypeError $e)
        {
            return false;
        }
    }

    public function revokeTokens()
    {
        $OAuth2LoginHelper = $this->initOAuth2LoginHelper();

        //$refreshToken = QBToken::getToken("refresh");
        $accessToken = QBToken::getToken("access");

        $revokeResult = $OAuth2LoginHelper->revokeToken($accessToken);
        //$revokeResult = $OAuth2LoginHelper->revokeToken($refreshToken);

        if($revokeResult){
            dd("RefreshToken Token revoked.");
        }
    }
}
