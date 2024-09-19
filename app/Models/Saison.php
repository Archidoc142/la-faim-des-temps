<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Saison extends Model
{
    use HasFactory;
    
    protected $table = 'saison';
    protected $primaryKey = 'id';
    public $timestamps = false;

    public function images() {
        return $this->belongsToMany(Image::class);
    }
}
