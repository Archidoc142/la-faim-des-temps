<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Format extends Model
{
    use HasFactory;
    protected $table = 'format';
    protected $primaryKey = 'id';
    public $timestamps = false;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'montant',
        'nom',
        'description'
    ];

    public function langues()
    {
        return $this->belongsToMany(Langue::class, 'format_langue', 'id_format', 'id_langue')
                    ->withPivot('description', 'nom');
    }

    public function user()
    {
        return $this->belongsTo(Produit::class);
    }

}
