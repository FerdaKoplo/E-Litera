<?php

namespace App\Models\Chat;

use App\Models\User;
use Crypt;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;

    protected $fillable = [
        'conversation_id',
        'user_id',
        'body',
        'read_at'
    ];

    // Automatically encrypt before saving
    public function setBodyAttribute($value)
    {
        $this->attributes['body'] = $value ? Crypt::encryptString($value) : null;
    }

    // Automatically decrypt when retrieving
    public function getBodyAttribute($value)
    {
        return $value ? Crypt::decryptString($value) : null;
    }

    // Relationships
    public function conversation()
    {
        return $this->belongsTo(Conversation::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
