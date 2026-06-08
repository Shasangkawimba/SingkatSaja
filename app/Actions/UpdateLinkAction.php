<?php

namespace App\Actions;

use App\Models\Link;
use Illuminate\Support\Facades\Redis;

class UpdateLinkAction
{
    /**
     * Update a link and refresh its Redis cache.
     */
    public function execute(Link $link, array $data): Link
    {
        $link->update([
            'destination_url' => $data['destination_url'],
            'expires_at' => $data['expires_at'] ?? null,
        ]);

        $this->refreshCache($link);

        return $link;
    }

    /**
     * Refresh the link details in Redis.
     */
    private function refreshCache(Link $link): void
    {
        $redisKey = "short:{$link->short_code}";
        $payload = json_encode([
            'id' => $link->id,
            'destination_url' => $link->destination_url,
            'expires_at' => $link->expires_at?->toIso8601String(),
        ]);

        if ($link->expires_at) {
            $ttl = max(1, $link->expires_at->timestamp - time());
            Redis::setex($redisKey, $ttl, $payload);
        } else {
            // Overwriting with standard set clears any previous TTL
            Redis::set($redisKey, $payload);
        }
    }
}
