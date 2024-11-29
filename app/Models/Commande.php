<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Commande extends Model
{
    use HasFactory;

    protected $table = 'commande';
    protected $primaryKey = 'id';
    public $timestamps = true;
    protected $fillable = [
        'livraison',
        'frais_livraison',
        'total',
        'id_adresse',
        'id_utilisateur',
        'id_etat_commande',
        'id_type_commande',

        'status',
        'session_id',
        'stripe_id',
        'qb_id',
        'qb_invoice_id'
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

    public function type_commande(): BelongsTo
    {
        return $this->belongsTo(TypeCommande::class, 'id_type_commande');
    }

    public function ProduitsCommande() : BelongsToMany
    {
        return $this->belongsToMany(Produit::class, 'commande_produit', 'id_commande', 'id_produit')->withPivot('id_format', 'prix_vente');
    }
}
