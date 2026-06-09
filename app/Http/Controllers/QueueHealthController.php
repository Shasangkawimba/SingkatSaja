<?php

namespace App\Http\Controllers;

use App\Actions\GetQueueHealthAction;
use Illuminate\Http\JsonResponse;

class QueueHealthController extends Controller
{
    /**
     * Get the health status of the queue system.
     */
    public function show(GetQueueHealthAction $action): JsonResponse
    {
        $health = $action->execute();

        $statusCode = $health['status'] === 'healthy' ? 200 : 503;

        return response()->json($health, $statusCode);
    }
}
