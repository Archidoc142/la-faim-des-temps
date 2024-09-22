<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SecteurCode extends Model
{
    use HasFactory;

    protected $table = 'secteur_code';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'code',
        'id_secteur'
    ];

    public function secteur(): BelongsTo
    {
        return $this->belongsTo(SecteurCode::class, 'id_secteur');
    }
}
