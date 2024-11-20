<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HoraireOuverture extends Model
{
    use HasFactory;

    protected $table = 'HoraireOuverture';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'jour_fr',
        'jour_en',
        'ouvert',
    ];
}
