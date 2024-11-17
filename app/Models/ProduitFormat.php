<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProduitFormat extends Model
{
    use HasFactory;
    protected $table = 'produit_format';
    public $timestamps = false;

    protected $fillable = [
        'id_qb'
    ];

    public function produit()
    {
        return $this->belongsTo(Produit::class, 'id_produit')->first();
    }

    public function format()
    {
        return $this->belongsTo(Format::class, 'id_format')->first();
    }

    public function nomInterne()
    {
        $produit = $this->belongsTo(Produit::class, 'id_produit')->first();
        $format = $this->belongsTo(Format::class, 'id_format')->first();

        $nom = $produit->nom;
        if($format->nom_interne)
            $nom .= " " . $format->nom_interne;

        return $nom;
    }

}
