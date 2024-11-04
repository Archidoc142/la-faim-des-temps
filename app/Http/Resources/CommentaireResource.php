<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommentaireResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'utilisateur_objet' => $this->utilisateur,
            'utilisateur' => $this->utilisateur->prenom . " " . $this->utilisateur->nom,
            'note' => $this->note,
            'commentaire' => $this->commentaire,
            'masque' => $this->masque,
        ];
    }
}
