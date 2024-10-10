<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GoogleId extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'client_id'
    ];

    public $timestamps = false;

}
