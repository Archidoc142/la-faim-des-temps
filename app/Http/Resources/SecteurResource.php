<?php

namespace App\Http\Resources;

use App\Models\SecteurCode;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SecteurResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $codes = $this->secteurCodes();
        $tarifLivraison = $this->tarifLivraison()->montant;

        return [
            "nom" => $this->nom,
            "montant" => $tarifLivraison,
            "codes" => $codes->pluck('code')->all()
        ];
    }
}
