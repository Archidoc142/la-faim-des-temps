<?php
namespace App\Services;

use App\Models\QBToken;
use Illuminate\Support\Facades\Crypt;
use QuickBooksOnline\API\DataService\DataService;

class QuickBooksService
{
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