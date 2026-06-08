<?php

namespace App\Jobs;

use App\Models\ClickEvent;
use App\Services\UserAgentParser;
use Carbon\Carbon;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\DB;

class LogClickJob implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(
        public array $payload
    ) {}

    /**
     * Execute the job.
     */
    public function handle(UserAgentParser $parser): void
    {
        $parsed = $parser->parse($this->payload['user_agent'] ?? null);
        $clickedAt = Carbon::createFromTimestamp($this->payload['timestamp'] ?? time());
        $dateStr = $clickedAt->toDateString();

        DB::transaction(function () use ($parsed, $clickedAt, $dateStr) {
            // 1. Ingest ClickEvent record
            ClickEvent::create([
                'link_id' => $this->payload['link_id'],
                'browser' => $parsed['browser'],
                'device_type' => $parsed['device_type'],
                'platform' => $parsed['platform'],
                'country' => null, // Placeholder for GeoIP lookup features
                'referer' => $this->payload['referer'] ?? null,
                'ip_address' => $this->payload['ip_address'] ?? null,
                'user_agent' => $this->payload['user_agent'] ?? null,
                'clicked_at' => $clickedAt,
            ]);

            // 2. Incremental upsert on daily pre-aggregates (PostgreSQL/SQLite compatible)
            DB::statement("
                INSERT INTO daily_stats (link_id, date, clicks_count, created_at, updated_at)
                VALUES (:link_id, :date, 1, :created_at, :updated_at)
                ON CONFLICT (link_id, date)
                DO UPDATE SET clicks_count = daily_stats.clicks_count + 1, updated_at = EXCLUDED.updated_at
            ", [
                'link_id' => $this->payload['link_id'],
                'date' => $dateStr,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        });
    }
}
