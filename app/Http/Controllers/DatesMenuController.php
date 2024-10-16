<?php

namespace App\Http\Controllers;

use App\Models\DatesMenu;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

use Symfony\Component\HttpFoundation\Response;


class DatesMenuController extends Controller
{
    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request/*, string $id, string $date*/)
    {
        $date = $request->date;
        $id = $request->id;
        //dump($id, $date);

        if ($date == null && $id == 1) {

            $vend = Carbon::parse('last friday');
            $db_date = DatesMenu::find(2);
            $db_date->date = $vend;
            $db_date->save();

            $lund = Carbon::parse('last monday');
            $db_date = DatesMenu::find(3);
            $db_date->date = $lund;
            $db_date->save();

            $db_date = DatesMenu::find(1);
            $db_date->date = null;
            $db_date->save();

        } else {
            $date_sep = []; //[0] = année, [1] = mois, [2] = jour
            foreach (explode('-', $date) as $elem) {
                array_push($date_sep, $elem);
            }

            //TESTS (donnera une erreur de format)
                     /*   foreach (explode('/', $date) as $elem) {
                            array_push($date_sep, $elem);
                        }*/


//dd("s");


            //valider le format de la date
            if (count($date_sep) == 1 || Str::length($date_sep[0]) != 4 || Str::length($date_sep[1]) != 2 || Str::length($date_sep[2]) != 2)
                return back()->withErrors('La date doit être séparée avec des tirets sous forme de AAAA-MM-JJ. Ex : 2010-03-25');

            $carbon_date = Carbon::create($date_sep[0], $date_sep[1], $date_sep[2]);

            if ($id === 3) {
                if(!$carbon_date->isMonday())
                    return back()->withErrors('La date sélectionnée n\'est pas un lundi.');

            } else {
                if(!$carbon_date->isFriday())
                    return back()->withErrors('La date sélectionnée n\'est pas un vendredi.');
            }

            $db_date = DatesMenu::find($id);
            $db_date->date = $carbon_date;
            $db_date->save();

            if($id === 1) {

                $db_date = DatesMenu::find(2);  //vendredi
                $db_date->date = $carbon_date;
                $db_date->save();

                $db_date = DatesMenu::find(3);  //lundi
                $carbon_date->addDays(3);
                $db_date->date = $carbon_date;
                $db_date->save();
            }
        }

        //return redirect("/menu");
    }
}
