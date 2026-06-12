<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;

class HealthController extends Controller
{
    /**
     * Get the health status of the application components.
     */
    public function show(): JsonResponse
    {
        $databaseStatus = 'disconnected';
        try {
            DB::connection()->getPdo();
            $databaseStatus = 'connected';
        } catch (\Throwable $e) {
            report($e);
        }

        $redisStatus = 'disconnected';
        try {
            Redis::connection()->ping();
            $redisStatus = 'connected';
        } catch (\Throwable $e) {
            report($e);
        }

        $isHealthy = $databaseStatus === 'connected' && $redisStatus === 'connected';
        $status = $isHealthy ? 'healthy' : 'unhealthy';
        $statusCode = $isHealthy ? 200 : 503;

        return response()->json([
            'status' => $status,
            'database' => $databaseStatus,
            'redis' => $redisStatus,
        ], $statusCode);
    }
}
