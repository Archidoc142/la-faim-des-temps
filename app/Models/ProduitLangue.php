<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

class ProduitLangue extends Pivot
{
    protected $table = 'produit_langue';
    protected $primaryKey = 'id';
    public $incrementing = true;
    public $timestamps = false;

    public function produit(): BelongsTo
    {
        return $this->belongsTo(Produit::class, 'id_produit');
    }

    public function langue(): BelongsTo
    {
        return $this->belongsTo(Langue::class, 'id_langue');
    }
}
