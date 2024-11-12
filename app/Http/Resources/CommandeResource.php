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
        $phone = $this->telephone;
        if (is_null($phone))
            $formattedPhone = "---";
        else
            $formattedPhone = "(" . substr($phone, 0, 3) . ") " . substr($phone, 3, 3) . "-" . substr($phone, 6, 4);

        return [
            'id' => $this->id,
            'qb_invoice_id' => $this->qb_invoice_id,
            'livraison' => $this->livraison,
            'frais_livraison' => $this->frais_livraison,
            'total' => $this->total,
            'adresse' => $this->adresse,
            'user' => $this->user,
            'phone' => $formattedPhone,
            'etat_commande' => $this->etat_commande,
            'created_at' => date('Y/m/d', strtotime($this->created_at))
        ];
    }
}
