<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Producteur extends Model
{
    use HasFactory;

    protected $table = 'producteur';
    protected $primaryKey = 'id';
    public $timestamps = false;

    protected $fillable = [
        'nom',
        'adresse',
        'url',
        'id_image'
    ];

    public function lang($lang)
    {
        $id = Langue::where('code', $lang)->first()->id;

        return $this->belongsToMany(Langue::class, 'producteur_langue', 'id_producteur', 'id_langue')
        ->where('id_langue', $id)
        ->withPivot('description')->first();
    }

    public function langue()
    {
        return $this->belongsToMany(Langue::class, 'producteur_langue', 'id_producteur', 'id_langue')
                    ->withPivot('description');
    }

    public function image()
    {
        return $this->belongsTo(Image::class, 'id_image', 'id');
    }
}
