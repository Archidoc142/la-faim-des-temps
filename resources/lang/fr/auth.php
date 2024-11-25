<?php

return [

    /*
    |----------------------------------------------------------------------
    | Lignes de langage d'authentification
    |----------------------------------------------------------------------
    |
    | Les lignes suivantes sont utilisées pendant l'authentification pour divers
    | messages que nous devons afficher à l'utilisateur. Vous êtes libre de modifier
    | ces lignes de langage en fonction des besoins de votre application.
    |
    */

    'failed' => 'Ces identifiants ne correspondent pas à nos enregistrements.',
    'password' => 'Le mot de passe fourni est incorrect.',
    'throttle' => 'Trop de tentatives de connexion. Veuillez réessayer dans :seconds secondes.',

    'nom' => [
        "required" => "Veuillez entrer un nom de famille.",
        "max" => "Le nom de famille ne peut pas dépasser 64 caractères.",
        "regex" => "Le format du nom de famille entré est invalide."
    ],
    'prenom' => [
        "required" => "Veuillez entrer un prénom.",
        "max" => "Le prénom ne peut pas dépasser 64 caractères.",
        "regex" => "Le format du prénom entré est invalide."
    ],
    'email' => [
        "required" => "Veuillez entrer un courriel.",
        "regex" => "Le format du courriel entré est invalide.",
        "unique" => "Le courriel appartient déjà à un autre client.",
        "email" => "Veuillez entrer un courriel valide."
    ],
    'telephone' => [
        "digits" => "Le numéro de téléphone doit contenir 10 chiffres."
    ],



];
