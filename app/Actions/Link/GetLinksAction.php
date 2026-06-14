<?php

namespace App\Actions\Link;

use App\Models\Link;
use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

class GetLinksAction
{
    /**
     * Retrieve paginated links for the user.
     */
    public function execute(User $user, array $filters = []): LengthAwarePaginator
    {
        $sort = $filters['sort'] ?? 'newest';
        $perPage = $filters['per_page'] ?? 15;

        $query = Link::where('user_id', $user->id)
            ->withSum('dailyStats as clicks_count', 'clicks_count');

        switch ($sort) {
            case 'oldest':
                $query->orderBy('created_at', 'asc');
                break;
            case 'most_clicked':
                $query->orderByDesc('clicks_count')
                    ->orderByDesc('created_at');
                break;
            case 'newest':
            default:
                $query->orderBy('created_at', 'desc');
                break;
        }

        return $query->paginate($perPage)->withQueryString();
    }
}
