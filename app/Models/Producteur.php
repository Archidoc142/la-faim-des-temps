<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Producteur extends Model
{
    use HasFactory;

    protected $table = 'producteur';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'nom',
        'adresse',
        'telephone',
        'id_image'
    ];

    public function langues()
    {
        return $this->belongsToMany(Langue::class, 'producteur_langue', 'id_producteur', 'id_langue')
                    ->withPivot('description');
    }

    public function image()
    {
        return $this->belongsTo(Image::class, 'id_image', 'id');
    }
}
