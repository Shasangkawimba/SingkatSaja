<?php

namespace App\Actions;

use App\Models\Link;
use Illuminate\Support\Facades\Redis;

class DeleteLinkAction
{
    /**
     * Delete a link (soft delete) and remove its Redis cache.
     */
    public function execute(Link $link): void
    {
        try {
            Redis::del("short:{$link->short_code}");
        } catch (\Throwable $e) {
            report($e);
        }

        $link->delete();
    }
}
