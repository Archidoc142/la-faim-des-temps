<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ImageResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $saisons = [false, false, false, false];

        if($this->saisonnier)
        {
            $saisonsBd = $this->saisons();

            foreach($saisonsBd as $saison)
            {
                $saisons[$saison - 1] = true;
            }
        }

        return [
            "id" => $this->id,
            "src" => $this->nom_fichier,
            "legende" => [
                "fr" => $this->langues($this->id)[0]->legende,
                "en" => $this->langues($this->id)[1]->legende,
            ],
            "saisonnier" => $this->saisonnier,
            "saisons" => $saisons,
        ];
    }
}
