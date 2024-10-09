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
    public $timestamps = true;
    protected $fillable = [
        'note',
        'masque',
        'commentaire',
        'id_utilistateur'
    ];

    public function utilisateur(): BelongsTo
    {
        return $this->belongsTo(User::class, 'id_utlistateur');
    }
}
