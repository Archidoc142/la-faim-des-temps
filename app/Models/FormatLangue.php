<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class FormatLangue extends Pivot
{
    protected $table = 'format_langue';
    protected $primaryKey = 'id';
    public $incrementing = true;
    public $timestamps = false;
}
