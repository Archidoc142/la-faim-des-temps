<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

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
}
