<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CommandeProduit extends Pivot
{
    protected $table = 'commande_produit';
    protected $primaryKey = 'id';
    public $incrementing = true;
    public $timestamps = false;
    protected $fillable= [
        'id_produit',
        'id_commande',
        'id_format',
        'prix_vente'
    ];

    public function produit(): BelongsTo
    {
        return $this->belongsTo(Produit::class, 'id_produit');
    }

    public function commande(): BelongsTo
    {
        return $this->belongsTo(Commande::class, 'id_commande');
    }

    public function format(): BelongsTo
    {
        return $this->belongsTo(Format::class, 'id_format');
    }
}
