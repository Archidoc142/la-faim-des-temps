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
        return [
            "id" => $this->id,
            "src" => $this->nom_fichier,
            "legende" => [
                "fr" => $this->langues($this->id)[0]->legende,
                "en" => $this->langues($this->id)[1]->legende,
            ],
            "saisons" => $this->saisons(),
        ];
    }
}
