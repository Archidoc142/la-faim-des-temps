<?php

namespace App\Http\Middleware;

use App\Http\Resources\UserResource;
use App\Models\HoraireOuverture;
use App\Models\DatesMenu;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): string|null
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = null;

        $dateToShow = null;
        $canCommand = false;

        $date_de_retour = DatesMenu::where('nom', 'date_retour')->first()->date;

        date_default_timezone_set('America/Toronto');
        $date        = new \DateTimeImmutable();
        $lundi16h    = strtotime('monday this week 16:00');
        $vendredi12h = strtotime('friday this week 12:00');
        $vendredi0h  = strtotime('friday this week 00:00');

        if ($date->getTimestamp() <= $lundi16h || $date->getTimestamp() >= $vendredi12h) {

            if ($date->format('N') >= 5) {
                // Avant Lundi
                $dateToShow = strtotime("next Monday");
            } else {
                // Durant Lundi
                $dateToShow = strtotime("monday");
            }

            $canCommand = true;

        } else {
            if ($date->getTimestamp() >= $vendredi0h) {
                $dateToShow = strtotime("today");
            } else {
                $dateToShow = strtotime("next friday");
            }
        }

        if (isset($date_de_retour)) {
            if ($date->getTimestamp() < $date_de_retour) {
                $dateToShow = strtotime($date_de_retour);
                $canCommand = false;
            }
        }

        if(!is_null($request->user()))
        {
            $user = new UserResource($request->user());
        }

        if(isset($_COOKIE["lng"]))
            App::setLocale($_COOKIE["lng"]);
        else
            App::setLocale(session("locale", config("app.locale")));

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user
            ],
            'horaire' => HoraireOuverture::all(),
            'dateToShow' =>  date('c', $dateToShow),
            'canCommand' => $canCommand,
        ];
    }
}
