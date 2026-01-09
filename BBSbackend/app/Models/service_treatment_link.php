<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service_treatment_link extends Model
{
    function treatment() {
        return $this->belongsTo(Treatment::class, 'treatment_id');
    }

    function service() {
        return $this->belongsTo(Service::class, 'service_id');
    }
    //
}
