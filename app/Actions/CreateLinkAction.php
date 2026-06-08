<?php

namespace App\Actions;

use App\Models\Link;
use App\Models\User;
use Illuminate\Support\Facades\Redis;

class CreateLinkAction
{
    public function __construct(
        protected GenerateShortCodeAction $generateShortCode
    ) {}

    /**
     * Create a link and cache it in Redis.
     */
    public function execute(User $user, array $data): Link
    {
        $shortCode = $data['short_code'] ?? $this->generateShortCode->execute();

        /** @var Link $link */
        $link = $user->links()->create([
            'short_code' => $shortCode,
            'destination_url' => $data['destination_url'],
            'expires_at' => $data['expires_at'] ?? null,
        ]);

        $this->cacheLink($link);
        $this->incrementRateLimit($user);

        return $link;
    }

    /**
     * Increment the user's hourly creation limit key in Redis.
     */
    protected function incrementRateLimit(User $user): void
    {
        $redisKey = "rl:create:user:{$user->id}";
        $count = Redis::incr($redisKey);
        if ($count == 1) {
            Redis::expire($redisKey, 3600);
        }
    }

    /**
     * Cache the link details in Redis.
     */
    private function cacheLink(Link $link): void
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
            Redis::set($redisKey, $payload);
        }
    }
}
