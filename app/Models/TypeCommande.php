<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TypeCommande extends Model
{
    protected $table = 'type_commande';
    protected $primaryKey = 'id';
    public $timestamps = false;
}
