<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProducteurResource extends JsonResource
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
            "nom" => $this->nom,
            "url" => $this->url,
            "description" => [
                "fr" => $this->lang("fr")->pivot->description,
                "en" => $this->lang("en")->pivot->description
            ],
            "image" => $this->image,
            "adresse" => $this->adresse
        ];
    }
}
