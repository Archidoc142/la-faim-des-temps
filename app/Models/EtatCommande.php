<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EtatCommande extends Model
{
    use HasFactory;

    protected $table = 'etat_commande';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'nom',
    ];
}
