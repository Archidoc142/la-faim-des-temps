<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FormatRessource extends JsonResource
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
            "id_format" => $this->id_format,
            "id_langue" => $this->id_langue,
            "nom" => $this->nom,
            "montant" => $this->format->montant,
        ];
    }
}
