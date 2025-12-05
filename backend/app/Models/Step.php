<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Step extends Model
{
    protected $fillable = [
        'goal_id',
        'step',
        'completed',
    ];

    public function goal(): BelongsTo {
        return $this->belongsTo(Goal::class);
    }
}
