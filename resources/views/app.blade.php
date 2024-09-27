<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'La faim des temps') }}</title>

        <!-- Fonts -->
        <link href="https://fonts.googleapis.com/css2?family=Montaga&display=swap" rel="stylesheet"> <!-- Font de titre-->
        <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet"> <!-- Font de base-->
        <link href="https://fonts.googleapis.com/css2?family=Imperial+Script&display=swap" rel="stylesheet"> <!-- Font du menu -->
        <link href="https://fonts.googleapis.com/css2?family=Angkor&display=swap" rel="stylesheet"> <!-- Font Nos valeurs -->

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased bg-[#031b3e]">
        @inertia
    </body>
</html>
