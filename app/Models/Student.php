<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;
    /**
     * fillable fields
     */
    protected $fillable = [
        'user_id',
        'process_nr',
        'course',
        'course_code',
    ];
}
