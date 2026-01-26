<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerSelectController extends Controller
{
    public function index()
    {
        return Customer::select('id', 'name', 'email')
            ->orderBy('name')
            ->get();
    }
}
