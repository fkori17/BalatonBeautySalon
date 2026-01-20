<?php

namespace App\Models;
use App\Models\ServiceTreatmentLink;
use Illuminate\Database\Eloquent\Model;

class Treatment extends Model
{
    function customer() {
        return $this->belongsTo(Customer::class, 'customer_id');
    }
    
    public function services()
    {
        return $this->belongsToMany(
            Service::class,
            'service_treatment_links',
            'treatment_id',
            'service_id'
        )->withPivot('piece');
    }

    function serviceLinks() {
        return $this->hasMany(ServiceTreatmentLink::class, 'treatment_id', 'id');
    }
}   
