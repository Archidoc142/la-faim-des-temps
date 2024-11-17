<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ImageAccueilResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */

    public function is_payage($nom_fichier) {
        list($width, $height) = getimagesize(public_path('img/' . $nom_fichier));
        return $width > $height;
    }

    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "src" => $this->nom_fichier,
            "legende" => [
                "fr" => $this->langue("fr")->pivot->legende,
                "en" => $this->langue("en")->pivot->legende,
            ],
            "is_paysage" => $this->is_payage($this->nom_fichier),
        ];
    }
}
