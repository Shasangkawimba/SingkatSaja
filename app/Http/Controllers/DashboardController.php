<?php

namespace App\Http\Controllers;

use App\Actions\GetDashboardStatsAction;
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
        $stats = $statsAction->execute($request->user());

        return Inertia::render('dashboard', [
            'stats' => $stats,
        ]);
    }
}
