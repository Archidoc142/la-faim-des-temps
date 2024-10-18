<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Encryption\DecryptException;
use Illuminate\Support\Facades\Crypt;

class QBToken extends Model
{
    use HasFactory;

    protected $table = 'qb_tokens';
    public $timestamps = false;

    protected $fillable = [
        'type',
        'encrypted_token',
        'expiration_date'
    ];

    public static function getToken($type)
    {
        if($type == "access" || $type == "refresh")
        {
            $token = QBToken::where('type', $type)->first();
            $token = $token->encrypted_token;

            try
            {
                $decryptedToken = Crypt::decryptString($token);
            }
            catch (DecryptException $e)
            {
                dd("Decryption error : " . $e);
            }

            return $decryptedToken;
        }

        return "";

    }

}
