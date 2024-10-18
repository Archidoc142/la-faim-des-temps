<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tarif extends Model
{
    use HasFactory;

    protected $table = 'tarif';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'nom',
        'montant',
    ];
}
