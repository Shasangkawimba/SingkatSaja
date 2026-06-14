<?php

namespace App\Actions\Dashboard;

use App\Models\DailyStat;
use App\Models\Link;
use App\Models\User;

class GetDashboardStatsAction
{
    /**
     * Gather dashboard stats for the given user.
     */
    public function execute(User $user): array
    {
        $linkIdsQuery = Link::select('id')->where('user_id', $user->id);

        $totalLinks = Link::where('user_id', $user->id)->count();

        $activeLinks = Link::where('user_id', $user->id)
            ->where(function ($query) {
                $query->whereNull('expires_at')
                    ->orWhere('expires_at', '>', now());
            })
            ->count();

        $totalClicks = (int) DailyStat::whereIn('link_id', $linkIdsQuery)->sum('clicks_count');

        $clicksToday = (int) DailyStat::whereIn('link_id', $linkIdsQuery)
            ->whereDate('date', today())
            ->sum('clicks_count');

        return [
            'total_links' => $totalLinks,
            'active_links' => $activeLinks,
            'total_clicks' => $totalClicks,
            'clicks_today' => $clicksToday,
        ];
    }
}
