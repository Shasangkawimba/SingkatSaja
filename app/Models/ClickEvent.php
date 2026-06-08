<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

#[Fillable([
    'link_id',
    'browser',
    'device_type',
    'platform',
    'country',
    'referer',
    'ip_address',
    'user_agent',
    'clicked_at',
])]
class ClickEvent extends Model
{
    /**
     * Disable updated_at but customize created_at to clicked_at.
     */
    public const CREATED_AT = 'clicked_at';
    public const UPDATED_AT = null;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'clicked_at' => 'datetime',
        ];
    }

    /**
     * Get the link associated with the click event.
     */
    public function link(): BelongsTo
    {
        return $this->belongsTo(Link::class);
    }
}
