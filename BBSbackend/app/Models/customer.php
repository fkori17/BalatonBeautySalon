<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Laravel\Sanctum\HasApiTokens;


class Customer extends Model
{
    use HasApiTokens;
    protected $hidden = ['password'];

    function treatment() {
        return $this->hasMany(Treatment::class, 'customer_id', 'id');
    }
    //
}
