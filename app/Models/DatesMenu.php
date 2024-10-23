<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DatesMenu extends Model
{
    use HasFactory;

    protected $table = 'dates_menu';
    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = [
        'date',
    ];
}
