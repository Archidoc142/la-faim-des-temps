<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommandeResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'livraison' => $this->livraison,
            'frais_livraison' => $this->frais_livraison,
            'total' => $this->total,
            'adresse' => $this->adresse,
            'user' => $this->user,
            'etat_commande' => $this->etat_commande,
            'created_at' => date('Y/m/d', strtotime($this->created_at))
        ];
    }
}
