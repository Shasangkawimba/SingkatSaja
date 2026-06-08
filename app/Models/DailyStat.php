<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable(['link_id', 'date', 'clicks_count'])]
class DailyStat extends Model
{
    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'date' => 'date',
            'clicks_count' => 'integer',
        ];
    }

    /**
     * Get the link associated with the daily statistics.
     */
    public function link(): BelongsTo
    {
        return $this->belongsTo(Link::class);
    }
}
