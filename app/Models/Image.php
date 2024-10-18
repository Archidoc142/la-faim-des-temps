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
    ];

    public function saisons() {
        return $this->belongsToMany(Saison::class, 'image_saison', 'id_image', 'id_saison');
    }
}
