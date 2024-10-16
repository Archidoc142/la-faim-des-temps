<?php

namespace App\Http\Resources;

use App\Models\SecteurCode;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AdressesResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $montant = null;

        $code = substr($this->code_postal, 0, 3);
        $secteur = SecteurCode::where('code', $code)->value('id_secteur');

        // secteur / 1 - Fleurimont / 2 - Centre-ville Sherbrooke / 3 - Rock Forest
        if ($secteur == 2) {
            $montant = 7;
        } else {
            $montant = 10;
        }

        return [
            "id" => $this->id,
            "nom" => $this->no_civique . " " . $this->rue,
            "no_app" => $this->appartement,
            "montant" => $montant,
            "visible" => $this->visible,
            "code_postal" => $this->code_postal
        ];
    }
}
