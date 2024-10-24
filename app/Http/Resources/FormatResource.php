<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FormatResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "montant" => $this->montant,
            "nom" =>
            [
                "fr" => $this->langue("fr")->pivot->nom,
                "en" => $this->langue("en")->pivot->nom
            ],
            "description" =>
            [
                "fr" => $this->langue("fr")->pivot->description,
                "en" => $this->langue("en")->pivot->description
            ],
        ];
    }
}
