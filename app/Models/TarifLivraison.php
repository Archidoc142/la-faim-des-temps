<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TarifLivraison extends Model
{
    use HasFactory;

    protected $table = 'TarifLivraison';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'nom',
        'montant',
    ];
}
