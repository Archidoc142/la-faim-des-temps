<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class FormatLangue extends Pivot
{
    protected $table = 'FormatLangue';
    protected $primaryKey = 'id';
    public $incrementing = true;
    public $timestamps = false;
}
