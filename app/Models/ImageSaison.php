<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImageSaison extends Model
{
    use HasFactory;

    protected $table = 'image_saison';
    public $timestamps = false;

    protected $fillable = [
        'id_image',
        'id_saison'
    ];
}
