<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ServiceTreatmentLink extends Model
{
    protected $table = 'service_treatment_links';

    public function treatment()
    {
        return $this->belongsTo(Treatment::class, 'treatment_id');
    }

    public function service()
    {
        return $this->belongsTo(Service::class, 'service_id');
    }
}
