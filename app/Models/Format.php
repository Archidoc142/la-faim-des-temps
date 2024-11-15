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
        'description',
        'nom_interne'
    ];

    public function langue($lang)
    {
        $id = Langue::where('code', $lang)->first()->id;

        return $this->belongsToMany(Langue::class, 'format_langue', 'id_format', 'id_langue')
                    ->withPivot('description', 'nom')
                    ->where('id_langue', $id)
                    ->first();
    }

    public static function FormatsWithLang()
    {
        return Format::whereHas('langue')->get();
    }

}
