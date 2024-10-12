<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QBId extends Model
{
    use HasFactory;

    protected $table = 'qb_id';
    public $timestamps = false;

    protected $fillable = [
        'id',
        'client_id'
    ];
}
