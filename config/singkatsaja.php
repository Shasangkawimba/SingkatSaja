<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Reserved Aliases
    |--------------------------------------------------------------------------
    |
    | These short codes are reserved for application routing and system flows.
    | Users cannot create custom aliases matching any of these values.
    |
    */
    'reserved_aliases' => [
        'login',
        'register',
        'logout',
        'dashboard',
        'settings',
        'analytics',
        'links',
        'api',
        'admin',
    ],

    /*
    |--------------------------------------------------------------------------
    | Abuse Protection & Quotas
    |--------------------------------------------------------------------------
    |
    | Configuration options for link generation limits and analytics
    | click event deduplication windows.
    |
    */
    'rate_limits' => [
        'links_per_hour' => 30,
    ],

    'deduplication' => [
        'window_seconds' => 60,
    ],
];
