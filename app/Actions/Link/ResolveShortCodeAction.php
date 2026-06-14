<?php

namespace App\Actions\Link;

use App\Models\Link;
use Carbon\Carbon;
use Illuminate\Support\Facades\Redis;

class ResolveShortCodeAction
{
    /**
     * Resolve the short code to its destination URL.
     * Returns null if not found or expired.
     */
    public function execute(string $shortCode): ?Link
    {
        $redisKey = "short:{$shortCode}";

        // 1. Check Redis first
        $cached = Redis::get($redisKey);

        if ($cached) {
            $data = json_decode($cached, true);

            // Validate expiration date from cache
            if (isset($data['expires_at'])) {
                $expiresAt = Carbon::parse($data['expires_at']);
                if ($expiresAt->isPast()) {
                    Redis::del($redisKey);
                    return null;
                }
            }

            // Hydrate a lightweight model representation from cache to avoid database hit
            $link = new Link();
            $link->id = $data['id'];
            $link->short_code = $shortCode;
            $link->destination_url = $data['destination_url'];
            if (isset($data['expires_at'])) {
                $link->expires_at = Carbon::parse($data['expires_at']);
            }
            $link->exists = true;

            return $link;
        }

        // 2. Cache miss: fallback to PostgreSQL
        /** @var Link|null $link */
        $link = Link::where('short_code', $shortCode)
            ->whereNull('deleted_at')
            ->first();

        if (!$link) {
            return null;
        }

        // Validate expiration date
        if ($link->expires_at && $link->expires_at->isPast()) {
            return null;
        }

        // 3. Rebuild Redis cache
        $payload = json_encode([
            'id' => $link->id,
            'destination_url' => $link->destination_url,
            'expires_at' => $link->expires_at?->toIso8601String(),
        ]);

        if ($link->expires_at) {
            $ttl = max(1, $link->expires_at->timestamp - time());
            Redis::setex($redisKey, $ttl, $payload);
        } else {
            Redis::set($redisKey, $payload);
        }

        return $link;
    }
}
