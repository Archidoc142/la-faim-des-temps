<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

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

    public function lang($lang)
    {
        $id = Langue::where('code', $lang)->first()->id;

        return $this->belongsToMany(Langue::class, 'produit_langue', 'id_produit', 'id_langue')
        ->where('id_langue', $id)
        ->withPivot('description')->first();
    }

    public function langue()
    {
        return $this->belongsToMany(Langue::class, 'produit_langue', 'id_produit', 'id_langue')
        ->withPivot('description');
    }

    public function formats() {
        return $this->belongsToMany(Format::class, 'produit_format', 'id_produit', 'id_format')->get();
    }

    public static function ProduitsWithLang()
    {
        return Produit::whereHas('langue')->get();
    }

    public static function ProduitsDansMenu() {
        return Produit::where('dansMenu', 1)->get();
    }

}
