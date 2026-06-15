<?php

namespace App\Http\Controllers;

use App\Actions\Dashboard\GetDashboardStatsAction;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the authenticated user dashboard.
     */
    public function index(Request $request, GetDashboardStatsAction $statsAction): Response
    {
        return Inertia::render('dashboard', [
            'stats' => Inertia::optional(fn () => $statsAction->execute($request->user())),
            'recent_links' => Inertia::optional(fn () => clone $request->user()->links()
                ->orderBy('created_at', 'desc')
                ->take(5)
                ->withSum('dailyStats as clicks_count', 'clicks_count')
                ->get()),
        ]);
    }
}
