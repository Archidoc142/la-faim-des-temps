<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class Produit_Langue extends Pivot
{
    protected $table = 'produit_langue';
    protected $primaryKey = 'id';
    public $incrementing = true;
    public $timestamps = false;
}
