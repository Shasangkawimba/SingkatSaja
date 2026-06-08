# Architecture Decisions

- Database: PostgreSQL
- Cache: Redis
- Queue: Redis
- Auth: Laravel Fortify
- Frontend: Inertia + React + TypeScript
- Runtime: Octane + FrankenPHP
- Custom Alias uses short_code column
- Dashboard reads daily_stats
- Redirect engine uses Redis-first lookup
- Links use soft deletes
- Reserved aliases are blocked