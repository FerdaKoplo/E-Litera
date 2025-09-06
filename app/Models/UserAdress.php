<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserAdress extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'full_address',
        'province_id',
        'province_name',
        'city_id',
        'city_name',
        'district_id',
        'district_name',
        'sub_district_id',
        'sub_district_name',
        'postal_code',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }


}


