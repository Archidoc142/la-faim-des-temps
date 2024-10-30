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

        if(QBToken::exists())
            $quickBooksService->refreshTokens();

        $OAuth2LoginHelper = $quickBooksService->initOAuth2LoginHelper();

        // Get the Authorization URL from the SDK
        $authUrl = $OAuth2LoginHelper->getAuthorizationCodeURL();

        return Inertia::render('Admin/QuickBooksAuth', [
            'url' => $authUrl
        ]);
    }

    public function callback(Request $request)
    {
        $quickBooksService = new QuickBooksService();

        // code=AB11727226985uyneVIYtksvUYbbkEKYTxHNWow0R1pHkRVEag&realmId=9341453160686081&state=JQFHZ

        $authCode = $request->query('code');
        $realmId = $request->query('realmId');

        $OAuth2LoginHelper = $quickBooksService->initOAuth2LoginHelper();

        $accessTokenObj = $OAuth2LoginHelper->exchangeAuthorizationCodeForToken($authCode, $realmId);

        $quickBooksService->storeTokens($accessTokenObj);

        $quickBooksService->exportAllItems();

        return Inertia::render('Admin/QuickBooksAuth', [
            'url' => QBToken::getToken("access")
        ]);
    }
}
