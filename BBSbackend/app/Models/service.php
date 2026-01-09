<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    function service_treatment_link() {
        return $this->hasMany(Service_treatment_link::class, 'service_id', 'id');
    }
    //
}
