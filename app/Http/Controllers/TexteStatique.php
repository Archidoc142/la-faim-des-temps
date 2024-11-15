<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Redirect;

class TexteStatique extends Controller
{
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $urlFR = resource_path() . "/translations/fr/global.json";
        $urlEN = resource_path() . "/translations/en/global.json";

        // pour chaque élément du request
        for ($i = 0; $i < count($request->all()); $i++) {
            $dataRecu = $request[$i];

            /* FRANÇAIS */
            $FRjsonString = file_get_contents($urlFR);
            $FRdata = json_decode($FRjsonString, true);

            $FRdata[$dataRecu['groupe']][$dataRecu['target']] = $dataRecu['fr'];

            $newFRJsonString = json_encode($FRdata, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
            file_put_contents($urlFR, $newFRJsonString);

            /* ANGLAIS */
            $ENjsonString = file_get_contents($urlEN);
            $ENdata = json_decode($ENjsonString, true);

            $ENdata[$dataRecu['groupe']][$dataRecu['target']] = $dataRecu['en'];

            $newENJsonString = json_encode($ENdata, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
            file_put_contents($urlEN, $newENJsonString);
        }

        return redirect()->back();
    }
}
