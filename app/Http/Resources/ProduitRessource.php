<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProduitRessource extends JsonResource
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
            "id_produit" => $this->id_produit,
            "id_langue" => $this->id_langue,
            "description" => $this->description,
            "nom" => $this->produit->nom,
        ];
    }
}
