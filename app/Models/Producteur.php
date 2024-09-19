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
}
