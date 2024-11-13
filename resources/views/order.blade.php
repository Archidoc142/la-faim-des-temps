<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>La faims des temps</title>

    </head>
    <body class="font-sans antialiased">
        <main class="ml-264 pl-8 pr-6">
            <div>
                <p>Nous avons bien reçu votre demande de récupération de mot de passe pour accéder à votre compte.</p>
                <p>Pour réinitialiser votre mot de passe, cliquez simplement sur le lien ci-dessous :</p>
                <a href="http://localhost:8000/reset-mdp">Réinitialiser mon mot de passe</a>
                <p>Si vous n'avez pas fait cette demande, vous pouvez ignorer cet email.</p>
                <p>Si vous avez des questions ou avez besoin d'assistance supplémentaire, n'hésitez pas à nous contacter.</p>
                <p>Au plaisir,</p>
                <p>L'équipe de La faim des temps</p>
            </div>

            <img src="{{URL::asset('/img/logo-big.jpg')}}" alt="profile Pic" height="200" width="200">
        </main>
    </body>
</html>
