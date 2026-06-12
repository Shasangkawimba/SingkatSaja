<?php

namespace App\Http\Controllers;

use App\Actions\ResolveShortCodeAction;
use App\Services\AnalyticsService;
use Illuminate\Http\Request;

class RedirectController extends Controller
{
    /**
     * Resolve the short code and redirect the client to the destination.
     */
    public function redirect(
        Request $request,
        string $short_code,
        ResolveShortCodeAction $resolveShortCode,
        AnalyticsService $analyticsService
    ) {
        $link = $resolveShortCode->execute($short_code);

        if (!$link) {
            abort(404);
        }

        // Perform click deduplication check before running analytics to protect database load
        $ip = $request->ip() ?? 'unknown';
        $redisKey = "dedup:{$link->id}:{$ip}";
        $window = config('singkatsaja.deduplication.window_seconds', 60);

        $shouldRecord = true;
        try {
            $acquired = \Illuminate\Support\Facades\Redis::set($redisKey, 1, 'EX', $window, 'NX');
            if (!$acquired) {
                $shouldRecord = false;
            }
        } catch (\Throwable $e) {
            // Fallback: If Redis is offline, continue to record to avoid losing analytics data
            report($e);
        }

        if ($shouldRecord) {
            $analyticsService->recordClick(
                $link->id,
                $request->ip(),
                $request->userAgent(),
                $request->header('referer'),
                now()->timestamp
            );
        }

        return redirect()->away($link->destination_url, 302);
    }
}
