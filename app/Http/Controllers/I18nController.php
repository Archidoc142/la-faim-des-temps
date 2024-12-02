<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class I18nController extends Controller
{
    public function fr()
    {
        $urlFR = resource_path() . "/translations/fr/global.json";
        $jsonFR = json_decode(file_get_contents($urlFR));

        return response()->json(
            $jsonFR
        );
    }

    public function en()
    {
        $urlEN = resource_path() . "/translations/en/global.json";
        $jsonEN = json_decode(file_get_contents($urlEN));

        return response()->json(
            $jsonEN
        );
    }
}
