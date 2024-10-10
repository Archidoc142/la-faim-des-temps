<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Adresse extends Model
{
    use HasFactory;

    protected $table = 'adresse';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'no_civique',
        'rue',
        'code_postal',
        'id_secteur_code',
        'appartement',
        'visible'
    ];

    public function secteur_code(): BelongsTo
    {
        return $this->belongsTo(SecteurCode::class, 'id_secteur_code');
    }
}
