<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\FormatLangue;

class CommandeProduitResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $nom_format = FormatLangue::where('id_format', $this->id_format)
            ->where('id_langue', 1)
            ->value('nom');;

        return [
            'id' => $this->id,
            'produit' => $this->produit,
            'commande' => $this->commande,
            'format' => $this->format,
            'prix_vente' => $this->prix_vente,
            'nom_format' => $nom_format
        ];
    }
}
