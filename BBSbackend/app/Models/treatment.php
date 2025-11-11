<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class treatment extends Model
{
    function customer() {
        return $this->belongsTo(customer::class, 'customer_id');
    }

    function service_treatment_link() {
        return $this->hasMany(service_treatment_link::class, 'treatment_id', 'id');
    }
}
