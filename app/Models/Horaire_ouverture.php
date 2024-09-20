<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class horaire_ouverture extends Model
{
    use HasFactory;

    protected $table = 'horaire_ouverture';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'jour',
        'ouvert',
    ];
}
