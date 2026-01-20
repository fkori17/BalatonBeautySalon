<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ServiceTreatmentLink extends Model
{
    protected $table = 'service_treatment_links';
    public $timestamps = false;
    protected $fillable = [
        'treatment_id',
        'service_id',
        'piece'
    ];
    public function service()
    {
        return $this->belongsTo(Service::class, 'service_id');
    }
}
