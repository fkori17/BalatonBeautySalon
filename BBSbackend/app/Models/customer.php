<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class customer extends Model
{
    function treatment() {
        return $this->hasMany(treatment::class, 'customer_id', 'id');
    }
    //
}
