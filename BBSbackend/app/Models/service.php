<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    public function treatments()
    {
        return $this->belongsToMany(
            Treatment::class,
            'service_treatment_links',
            'service_id',
            'treatment_id'
        )->withPivot('piece');
    }
    //
}
