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
            {{$user->nom}}
        </main>
    </body>
</html>
