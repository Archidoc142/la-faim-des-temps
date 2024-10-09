<?php

namespace App\Http\Controllers;

use App\Models\QBToken;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use QuickBooksOnline\API\DataService\DataService;

class QuickBooksController extends Controller
{
    public function index(Request $request)
    {
        if(QBToken::exists()) 
            $this->refreshTokens();

        $OAuth2LoginHelper = $this->initOAuth2LoginHelper();

        // Get the Authorization URL from the SDK
        $authUrl = $OAuth2LoginHelper->getAuthorizationCodeURL();

        return Inertia::render('Admin/QuickBooksAuth', [
            'url' => $authUrl
        ]);
    }

    public function callback(Request $request)
    {
        // code=AB11727226985uyneVIYtksvUYbbkEKYTxHNWow0R1pHkRVEag&realmId=9341453160686081&state=JQFHZ

        $authCode = $request->query('code');
        $realmId = $request->query('realmId');

        $OAuth2LoginHelper = $this->initOAuth2LoginHelper();

        $accessTokenObj = $OAuth2LoginHelper->exchangeAuthorizationCodeForToken($authCode, $realmId);

        $this->storeTokens($accessTokenObj);

        return Inertia::render('Admin/QuickBooksAuth', [
            'url' => QBToken::getToken("access")
        ]);
    }

    public function refreshTokens()
    {
        $OAuth2LoginHelper = $this->initOAuth2LoginHelper();

        $oldRefreshToken = QBToken::getToken('refresh');

        $accessTokenObj = $OAuth2LoginHelper->refreshAccessTokenWithRefreshToken($oldRefreshToken);

        $this->storeTokens($accessTokenObj);

        return Inertia::render('Admin/QuickBooksAuth', [
            'url' => QBToken::getToken("access")
        ]);

    }

    private function initOAuth2LoginHelper()
    {
        $config = include(app_path() . '/config.php');

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

    private function storeTokens($accessTokenObj)
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
}
