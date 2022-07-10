<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employer extends Model
{
    use HasFactory;
    /**
     * fillable fields
     */
    protected $fillable = [
        'user_id',
        'role',
        'school_degree',
    ];
}
