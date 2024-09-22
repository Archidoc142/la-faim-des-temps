<?php

namespace App\Models;

use GuzzleHttp\Client;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Commande extends Model
{
    use HasFactory;

    protected $table = 'commande';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'date_heure',
        'livraison',
        'frais_livraison',
        'total',
        'id_adresse',
        'id_utilisateur',
        'id_etat_commande'
    ];

    public function adresse(): BelongsTo
    {
        return $this->belongsTo(Adresse::class, 'id_adresse');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'id_utilisateur');
    }

    public function etat_commande(): BelongsTo
    {
        return $this->belongsTo(EtatCommande::class, 'id_etat_commande');
    }
}
