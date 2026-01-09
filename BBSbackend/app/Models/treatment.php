<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Treatment extends Model
{
    function customer() {
        return $this->belongsTo(Customer::class, 'customer_id');
    }

    function service_treatment_link() {
        return $this->hasMany(Service_treatment_link::class, 'treatment_id', 'id');
    }
}
