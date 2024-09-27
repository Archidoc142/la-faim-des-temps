<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\Pivot;

class FormatLangue extends Pivot
{
    protected $table = 'format_langue';
    protected $primaryKey = 'id';
    public $incrementing = true;
    public $timestamps = false;

    public function format(): BelongsTo
    {
        return $this->belongsTo(Format::class, 'id_format');
    }
}
