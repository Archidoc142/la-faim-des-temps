<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Produit extends Model
{
    use HasFactory;
    protected $table = 'produit';
    protected $primaryKey = 'id';
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'dansMenu',
        'nom',
        'description'
    ];

    public function langues()
    {
        return $this->belongsToMany(Langue::class, 'produit_langue', 'id_produit', 'id_langue')
                    ->withPivot('description');
    }

    public function description() {
        return ProduitLangue::select('description')->get();
    }

    public function formats() {
       // return Format::all();
        return $this->hasMany(Format::class);
    }
}
