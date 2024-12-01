<?php

namespace App\Http\Resources;

use App\Models\LegendeLangue;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ImageAccueilResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */


    public function toArray(Request $request): array
    {
        $legendesExist = LegendeLangue::where("id_image", $this->id)->exists();

        return [
            "id" => $this->id,
            "src" => $this->nom_fichier,
            "legende" => [
                "fr" => $legendesExist ? $this->langue("fr")->pivot->legende : "",
                "en" => $legendesExist ? $this->langue("en")->pivot->legende : "",
            ]
        ];
    }
}
