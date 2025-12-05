<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Goal extends Model
{
    protected $fillable = [
        'user_id',
        'goal',
        'deadline',
    ];

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function steps(): HasMany {
        return $this->hasMany(Step::class);
    }
}
