<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Image extends Model
{
    use HasFactory;

    protected $table = 'image';
    protected $primaryKey = 'id';
    public $timestamps = false;

    public function saisons() {
        return $this->belongsToMany(Saison::class);
    }

    public function producteurs() {
        return $this->hasMany(Producteur::class);
    }
}
