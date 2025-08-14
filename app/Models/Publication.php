<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Publication extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'author',
        'type',
        'category_id',
        'location_id',
        'download_count'
    ];
}
