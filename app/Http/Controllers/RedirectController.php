<?php

namespace App\Http\Controllers;

use App\Actions\ResolveShortCodeAction;
use App\Jobs\LogClickJob;
use Illuminate\Http\Request;

class RedirectController extends Controller
{
    /**
     * Resolve the short code and redirect the client to the destination.
     */
    public function redirect(Request $request, string $short_code, ResolveShortCodeAction $resolveShortCode)
    {
        $link = $resolveShortCode->execute($short_code);

        if (!$link) {
            abort(404);
        }

        // Perform click deduplication check before dispatching background job to protect queue load
        $ip = $request->ip() ?? 'unknown';
        $redisKey = "dedup:{$link->id}:{$ip}";
        $window = config('singkatsaja.deduplication.window_seconds', 60);

        $shouldDispatch = true;
        try {
            $acquired = \Illuminate\Support\Facades\Redis::set($redisKey, 1, 'EX', $window, 'NX');
            if (!$acquired) {
                $shouldDispatch = false;
            }
        } catch (\Throwable $e) {
            // Fallback: If Redis is offline, continue to dispatch to avoid losing analytics data
            report($e);
        }

        if ($shouldDispatch) {
            LogClickJob::dispatch([
                'link_id' => $link->id,
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'referer' => $request->header('referer'),
                'timestamp' => now()->timestamp,
            ]);
        }

        return redirect()->away($link->destination_url, 302);
    }
}
