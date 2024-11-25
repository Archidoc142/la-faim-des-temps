<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Authentication Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines are used during authentication for various
    | messages that we need to display to the user. You are free to modify
    | these language lines according to your application's requirements.
    |
    */

    'failed' => 'These credentials do not match our records.',
    'password' => 'The provided password is incorrect.',
    'throttle' => 'Too many login attempts. Please try again in :seconds seconds.',

    'nom' => [
        "required" => "Please enter a last name.",
        "max" => "The last name must not exceed 64 characters.",
        "regex" => "The last name format is invalid.",
    ],
    'prenom' => [
        "required" => "Please enter a first name.",
        "max" => "The first name must not exceed 64 characters.",
        "regex" => "The first name format is invalid."
    ],
    'email' => [
        "required" => "Please enter an email address.",
        "regex" => "The email address format is invalid.",
        "unique" => "The email address is already taken.",
        "email" => "Please enter a valid email address."
    ],
    'telephone' => [
        "digits" => "The phone number must contain 10 digits."
    ],
    "adresse" => [

    ]
];
