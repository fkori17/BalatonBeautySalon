<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class service extends Model
{
    function service_treatment_link() {
        return $this->hasMany(service_treatment_link::class, 'service_id', 'id');
    }
    //
}
