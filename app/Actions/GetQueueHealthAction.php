<?php

namespace App\Actions;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Queue;
use Illuminate\Support\Facades\Redis;

class GetQueueHealthAction
{
    /**
     * Execute the queue health check.
     *
     * @return array{
     *     status: string,
     *     connection: string,
     *     queue_status: string,
     *     pending_jobs: int,
     *     failed_jobs: int,
     *     timestamp: int
     * }
     */
    public function execute(): array
    {
        $connection = config('queue.default', 'redis');
        $queueName = 'analytics';

        // 1. Check queue status (ping redis or database check)
        $queueStatus = 'inactive';
        try {
            if ($connection === 'redis') {
                Redis::connection()->ping();
            } else {
                DB::connection()->getPdo();
            }
            $queueStatus = 'active';
        } catch (\Exception $e) {
            // Log or handle exception as needed
        }

        // 2. Fetch pending jobs count
        $pendingJobs = 0;
        try {
            $pendingJobs = Queue::connection($connection)->size($queueName);
        } catch (\Exception $e) {
            $queueStatus = 'error';
        }

        // 3. Fetch failed jobs count for the dedicated queue
        $failedJobs = 0;
        try {
            $failedJobs = DB::table('failed_jobs')
                ->where('queue', $queueName)
                ->count();
        } catch (\Exception $e) {
            // Fallback if failed_jobs table is missing or errors
        }

        $isHealthy = $queueStatus === 'active';

        return [
            'status' => $isHealthy ? 'healthy' : 'unhealthy',
            'connection' => $connection,
            'queue_status' => $queueStatus,
            'pending_jobs' => $pendingJobs,
            'failed_jobs' => $failedJobs,
            'timestamp' => now()->timestamp,
        ];
    }
}
