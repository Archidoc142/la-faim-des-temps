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
        'description'
    ];
}
