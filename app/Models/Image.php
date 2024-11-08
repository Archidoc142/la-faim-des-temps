<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;

    protected $table = 'image';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'nom_fichier',
        'legende',
        'vitrine',
        'saisonnier',
        'id_image',
        'id_saison'
    ];

    public function saisons()
    {
        return $this->belongsToMany(Saison::class, 'image_saison', 'id_image', 'id_saison')
            ->where('id_image', $this->id)
            ->get()
            ->pluck('id')
            ->all();
    }

    public function saison($saison_actuelle)
    {
        return $this->belongsToMany(Saison::class, 'image_saison', 'id_image', 'id_saison')
            ->where('id_image', $this->id)
            ->where('id_saison', $saison_actuelle)
            ->first();
    }

    public function langue($lang)
    {
        $id = Langue::where('code', $lang)->first()->id;

        return $this->belongsToMany(Langue::class, 'legende_langue', 'id_image', 'id_langue')
            ->withPivot('legende')
            ->where('id_langue', $id)
            ->first();
    }

    public function langues()
    {
        return $this->belongsToMany(Langue::class, 'legende_langue', 'id_image', 'id_langue')
        ->withPivot('legende');
    }
}
