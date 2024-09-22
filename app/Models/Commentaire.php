<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Commentaire extends Model
{
    use HasFactory;

    protected $table = 'commentaire';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'date_heure_publication',
        'note',
        'masque',
        'id_utlistateur'
    ];

    public function utilisateur(): BelongsTo
    {
        return $this->belongsTo(User::class, 'id_utlistateur');
    }
}
