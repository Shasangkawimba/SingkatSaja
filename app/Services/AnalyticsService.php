<?php

namespace App\Services;

use App\Models\ClickEvent;
use App\Models\DailyStat;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class AnalyticsService
{
    public function __construct(protected UserAgentParser $userAgentParser)
    {
    }

    /**
     * Record a click event and update daily stats.
     */
    public function recordClick(int $linkId, ?string $ipAddress, ?string $userAgent, ?string $referer, int $timestamp): void
    {
        $parsed = $this->userAgentParser->parse($userAgent);
        $clickedAt = Carbon::createFromTimestamp($timestamp);
        $dateStr = $clickedAt->toDateString();

        DB::transaction(function () use ($linkId, $parsed, $clickedAt, $dateStr, $referer, $ipAddress, $userAgent) {
            // 1. Ingest ClickEvent record
            ClickEvent::create([
                'link_id' => $linkId,
                'browser' => $parsed['browser'],
                'device_type' => $parsed['device_type'],
                'platform' => $parsed['platform'],
                'country' => null,
                'referer' => $referer,
                'ip_address' => $ipAddress,
                'user_agent' => $userAgent,
                'clicked_at' => $clickedAt,
            ]);

            // 2. Incremental upsert on daily pre-aggregates
            DB::statement("
                INSERT INTO daily_stats (link_id, date, clicks_count, created_at, updated_at)
                VALUES (:link_id, :date, 1, :created_at, :updated_at)
                ON CONFLICT (link_id, date)
                DO UPDATE SET clicks_count = daily_stats.clicks_count + 1, updated_at = EXCLUDED.updated_at
            ", [
                'link_id' => $linkId,
                'date' => $dateStr,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        });
    }
}
