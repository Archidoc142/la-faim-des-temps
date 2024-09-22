<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Langue extends Model
{
    use HasFactory;

    protected $table = 'langue';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $guarded = ['id'];
}
