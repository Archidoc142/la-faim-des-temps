<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class ProduitLangue extends Pivot
{
    protected $table = 'ProduitLangue';
    protected $primaryKey = 'id';
    public $incrementing = true;
    public $timestamps = false;
}
