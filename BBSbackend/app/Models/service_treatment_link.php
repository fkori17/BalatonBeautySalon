<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class service_treatment_link extends Model
{
    function treatment() {
        return $this->belongsTo(treatment::class, 'treatment_id');
    }

    function service() {
        return $this->belongsTo(service::class, 'service_id');
    }
    //
}
