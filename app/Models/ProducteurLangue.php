<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class ProducteurLangue extends Pivot
{
    protected $table = 'producteur_langue';
    protected $primaryKey = 'id';
    public $incrementing = true;
    public $timestamps = false;

    protected $fillable= [
        'id_producteur',
        'id_langue',
        'description'
    ];

    public function producteur(): BelongsTo
    {
        return $this->belongsTo(Producteur::class, 'id_producteur');
    }

    public function langue(): BelongsTo
    {
        return $this->belongsTo(Langue::class, 'id_langue');
    }
}
