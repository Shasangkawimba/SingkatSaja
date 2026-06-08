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

        // Dispatch background job for analytics collection without blocking redirect
        LogClickJob::dispatch([
            'link_id' => $link->id,
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'referer' => $request->header('referer'),
            'timestamp' => now()->timestamp,
        ]);

        return redirect()->away($link->destination_url, 302);
    }
}
