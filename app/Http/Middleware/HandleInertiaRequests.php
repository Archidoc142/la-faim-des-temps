<?php

namespace App\Http\Middleware;

use App\Http\Resources\UserResource;
use App\Models\HoraireOuverture;
use Illuminate\Http\Request;
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

        date_default_timezone_set('America/Toronto');
        $date        = new \DateTimeImmutable();
        $lundi16h    = strtotime('monday this week 16:00');
        $vendredi12h = strtotime('friday this week 12:00');

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
            $dateToShow = strtotime("next friday");
        }

        if(!is_null($request->user()))
        {
            $user = new UserResource($request->user());
        }

        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user
            ],
            'horaire' => HoraireOuverture::all(),
            'dateToShow' =>  date('c', $dateToShow),
            'canCommand' => $canCommand
        ];
    }
}
