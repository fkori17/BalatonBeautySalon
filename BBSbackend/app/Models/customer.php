<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Customer extends Authenticatable
{
    use HasApiTokens;

    protected $table = 'customers';
    protected $hidden = ['password'];

     protected $fillable = [
        'email',
        'password',
        'name',
        'phone',
        'loyal'
    ];

    public function treatment(): HasMany
    {
        return $this->hasMany(Treatment::class, 'customer_id', 'id');
    }
}
