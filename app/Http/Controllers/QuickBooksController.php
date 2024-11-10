<?php

namespace App\Http\Controllers;

use App\Models\QBToken;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use QuickBooksOnline\API\DataService\DataService;
use App\Services\QuickBooksService;

class QuickBooksController extends Controller
{
    public function index(Request $request)
    {
        $quickBooksService = new QuickBooksService();

        $tokensValid = false;

        /*if(QBToken::exists())
        {
            $tokensValid = $quickBooksService->refreshTokens();
        }*/

        $tokensValid = $quickBooksService->revokeTokens();

        $OAuth2LoginHelper = $quickBooksService->initOAuth2LoginHelper();
        // Get the Authorization URL from the SDK
        $authUrl = $OAuth2LoginHelper->getAuthorizationCodeURL();

        return Inertia::render('Admin/QuickBooksAuth', [
            'url' => $authUrl,
            'tokensValid' => $tokensValid
        ]);
    }

    public function callback(Request $request)
    {
        $quickBooksService = new QuickBooksService();

        $authCode = $request->query('code');
        $realmId = $request->query('realmId');

        $OAuth2LoginHelper = $quickBooksService->initOAuth2LoginHelper();

        $accessTokenObj = $OAuth2LoginHelper->exchangeAuthorizationCodeForToken($authCode, $realmId);

        $quickBooksService->storeTokens($accessTokenObj);
        $quickBooksService->initItems();

        $authUrl = $OAuth2LoginHelper->getAuthorizationCodeURL();

        return Inertia::render('Admin/QuickBooksAuth', [
            'url' => $authUrl,
            'tokensValid' => true
        ]);
    }
}
