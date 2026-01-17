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
}
