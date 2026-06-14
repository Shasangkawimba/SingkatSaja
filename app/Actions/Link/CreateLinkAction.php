<?php

namespace App\Actions\Link;

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
        $isCustomAlias = isset($data['short_code']) && $data['short_code'] !== '';
        $maxAttempts = 3;
        $attempts = 0;

        do {
            try {
                $shortCode = $data['short_code'] ?? $this->generateShortCode->execute();

                /** @var Link $link */
                $link = $user->links()->create([
                    'short_code' => $shortCode,
                    'destination_url' => $data['destination_url'],
                    'expires_at' => $data['expires_at'] ?? null,
                ]);

                break;
            } catch (\Illuminate\Database\QueryException $e) {
                $isUniqueViolation = $e->getCode() === '23505' 
                    || str_contains($e->getMessage(), 'unique constraint') 
                    || str_contains($e->getMessage(), 'UNIQUE constraint failed');

                if ($isUniqueViolation && !$isCustomAlias && ++$attempts < $maxAttempts) {
                    continue;
                }

                throw $e;
            }
        } while (true);

        try {
            $this->cacheLink($link);
            $this->incrementRateLimit($user);
        } catch (\Throwable $e) {
            report($e);
        }

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
