<?php

namespace App\Actions;

use App\Models\ClickEvent;
use App\Models\DailyStat;
use App\Models\Link;
use Illuminate\Support\Facades\DB;

class GetLinkAnalyticsAction
{
    /**
     * Gather analytics for the link.
     */
    public function execute(Link $link): array
    {
        // Add aggregate sum to link model for convenience
        $link->clicks_count = (int) DailyStat::where('link_id', $link->id)->sum('clicks_count');

        return [
            'link' => $link,
            'stats_7_days' => $this->getDailyStatsForDays($link, 7),
            'stats_30_days' => $this->getDailyStatsForDays($link, 30),
            'top_browsers' => $this->getTopDimension($link, 'browser'),
            'top_platforms' => $this->getTopDimension($link, 'platform'),
            'top_devices' => $this->getTopDimension($link, 'device_type'),
        ];
    }

    /**
     * Get aggregate statistics for a given number of days, populating empty dates with 0.
     */
    protected function getDailyStatsForDays(Link $link, int $days): array
    {
        $startDate = now()->subDays($days - 1)->toDateString();

        $stats = DailyStat::where('link_id', $link->id)
            ->where('date', '>=', $startDate)
            ->orderBy('date', 'asc')
            ->pluck('clicks_count', 'date')
            ->toArray();

        $formatted = [];
        for ($i = $days - 1; $i >= 0; $i--) {
            $date = now()->subDays($i)->toDateString();
            $formatted[] = [
                'date' => $date,
                'clicks_count' => $stats[$date] ?? 0,
            ];
        }

        return $formatted;
    }

    /**
     * Query top clicks counts grouped by a specific dimension.
     */
    protected function getTopDimension(Link $link, string $column, int $limit = 5): array
    {
        return ClickEvent::where('link_id', $link->id)
            ->select($column, DB::raw('count(*) as clicks_count'))
            ->groupBy($column)
            ->orderByDesc('clicks_count')
            ->limit($limit)
            ->get()
            ->toArray();
    }
}
