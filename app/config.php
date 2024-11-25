<?php
return array(
    'authorizationRequestUrl' => 'https://appcenter.intuit.com/connect/oauth2',
    'tokenEndPointUrl' => 'https://oauth.platform.intuit.com/oauth2/v1/tokens/bearer',
    'client_id' => config("app.quickbooks.client_id"),
    'client_secret' => config("app.quickbooks.client_secret"),
    'oauth_scope' => 'com.intuit.quickbooks.accounting openid profile email phone address',
    'oauth_redirect_uri' => config("app.url") . '/admin/quickbooks/callback',
)
?>
