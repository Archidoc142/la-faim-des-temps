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
        //dd($id, $date);

        if ($date == null && $id == 1) {

            /* ACTIF */
            $day = Carbon::parse('last friday');
            $db_date = DatesMenu::find(2);
            $db_date->date = $day;
            $db_date->save();

            //$lund = Carbon::parse('last monday');
            $day->addDays(3);
            $db_date = DatesMenu::find(3);
            $db_date->date = $day;
            $db_date->save();

            /* PROCHAIN */
            $day = Carbon::parse('this friday');
            $db_date = DatesMenu::find(4);
            $db_date->date = $day;
            $db_date->save();

            //$lund = Carbon::parse('this monday');
            $day->addDays(3);
            $db_date = DatesMenu::find(3);
            $db_date = DatesMenu::find(5);
            $db_date->date = $day;
            $db_date->save();

            /* RETOUR */
            $db_date = DatesMenu::find(1);
            $db_date->date = null;
            $db_date->save();

        } else if ($date == "prochain" && $id == 1) {

            /* ACTIF */
            $lund = Carbon::parse('this monday');   //lundi actif
            $db_date = DatesMenu::find(3);
            $db_date->date = $lund;
            //dump("lun actif", $lund);
            $db_date->save();

            $lund->subDays(3);  //vendredi actif
            $db_date = DatesMenu::find(2);
            $db_date->date = $lund;
            //dump("vend actif", $lund);
            $db_date->save();

            /* PROCHAIN */
            $vend = Carbon::parse('next friday');   //prochain vendredi
            $db_date = DatesMenu::find(4);
            $db_date->date = $vend;
            //dump("next vend", $vend);
            $db_date->save();

            $vend->addDays(3);  //prochain lundi
            $db_date = DatesMenu::find(5);
            $db_date->date = $vend;
            //dd("next lund", $vend);
            $db_date->save();

            /* RETOUR */
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
                /* ACTIF */
                $db_date = DatesMenu::find(2);  //vendredi
                $db_date->date = $carbon_date;
                $db_date->save();

                $carbon_date->addDays(3);  //lundi
                $db_date = DatesMenu::find(3);
                $db_date->date = $carbon_date;
                $db_date->save();

                /* PROCHAIN */
                $carbon_date->addDays(4);  //prochain vendredi
                $db_date = DatesMenu::find(4);
                $db_date->date = $carbon_date;
                $db_date->save();

                $carbon_date->addDays(3);   //prochain lundi
                $db_date = DatesMenu::find(5);
                $db_date->date = $carbon_date;
                $db_date->save();
            }
        }

        //return redirect("/menu");
    }
}
