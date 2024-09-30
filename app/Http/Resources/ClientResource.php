<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ClientResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $phone = $this->telephone;
        if(is_null($phone))
            $formattedPhone = "---";
        else
            $formattedPhone = "(" . substr($phone, 0, 3) . ") " . substr($phone, 3, 3) . "-" . substr($phone, 6, 4);

        return [
            "id" => $this->id,
            "nom" => $this->nom,
            "prenom" => $this->prenom,
            "telephone" => $formattedPhone,
            "telephone_plain" => $phone,
            "email" => $this->email,
            "created_at" => date('Y/m/d', strtotime($this->created_at)),
            "created_at_hour" => date('Y/m/d H:i', strtotime($this->created_at))
        ];
    }
}
