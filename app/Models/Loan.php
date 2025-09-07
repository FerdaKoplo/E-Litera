<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Loan extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'publication_id',
        'start_date',
        'due_date',
        'status',
        'fine_amount'
    ];

    protected $casts = [
    'start_date' => 'date:Y-m-d',
    'due_date' => 'date:Y-m-d',
];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function publication(): BelongsTo
    {
        return $this->belongsTo(Publication::class);
    }

    public function deliveries(): HasMany
    {
        return $this->hasMany(Delivery::class);
    }


}
