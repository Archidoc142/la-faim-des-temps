<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class QBRealmId extends Model
{
    protected $table = 'qb_realm_id';

    protected $primaryKey = 'id';
    public $timestamps = false;
    protected $fillable = ['id'];
}
