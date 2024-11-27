<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\Pivot;

class LegendeLangue extends Pivot
{
    protected $table = 'legende_langue';
    protected $primaryKey = 'id';
    public $incrementing = true;
    public $timestamps = false;

    public function langue()
    {
        return $this->belongsToMany(Langue::class, 'legende_langue', 'id_image', 'id_langue')
        ->withPivot('legende');
    }
}
