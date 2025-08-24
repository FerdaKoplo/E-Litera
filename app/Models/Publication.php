<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Publication extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'author',
        'type',
        'category_id',
        'location_id',
        'download_count',
        'pdf_url',
        'image_url'
    ];

    protected $casts = [
        'category_id' => 'integer',
        'location_id' => 'integer',
    ];

    public function getImageUrlAttribute()
    {
        return $this->attributes['image_url']
            ? asset($this->attributes['image_url'])
            : null;
    }

    public function getIsAvailableAttribute()
    {
        return !$this->loans()
            ->whereIn('status', ['pending', 'borrowed'])
            ->exists();
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id');
    }

    public function location(): BelongsTo
    {
        return $this->belongsTo(Location::class, 'location_id');
    }

    public function loans(): HasMany
    {
        return $this->hasMany(Loan::class);
    }

    public function feedbacks(): HasMany
    {
        return $this->hasMany(Feedback::class);
    }
}
