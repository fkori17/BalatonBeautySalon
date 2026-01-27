<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Service extends Model
{
    public $timestamps = false;
    protected $fillable = ['name', 'price', 'active'];
    protected $casts = [
        'active' => 'boolean',
    ];

    public function treatments()
    {
        return $this->belongsToMany(
            Treatment::class,
            'service_treatment_links',
            'service_id',
            'treatment_id'
        )->withPivot('piece');
    }
}
