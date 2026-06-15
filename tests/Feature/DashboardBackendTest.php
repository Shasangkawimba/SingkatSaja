<?php

use App\Models\Link;
use App\Models\User;
use App\Models\DailyStat;
use App\Models\ClickEvent;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;

uses(RefreshDatabase::class);

test('dashboard stats loads correctly via Inertia index page', function () {
    $user = User::factory()->create();

    // Create 3 links, one expired
    $link1 = Link::create([
        'user_id' => $user->id,
        'short_code' => 'active1',
        'destination_url' => 'https://example.com',
    ]);
    $link2 = Link::create([
        'user_id' => $user->id,
        'short_code' => 'active2',
        'destination_url' => 'https://example.com',
    ]);
    $link3 = Link::create([
        'user_id' => $user->id,
        'short_code' => 'expired1',
        'destination_url' => 'https://example.com',
        'expires_at' => now()->subDay(),
    ]);

    // Create daily stats
    DailyStat::create([
        'link_id' => $link1->id,
        'date' => today()->toDateString(),
        'clicks_count' => 10,
    ]);
    DailyStat::create([
        'link_id' => $link2->id,
        'date' => today()->subDay()->toDateString(),
        'clicks_count' => 5,
    ]);

    $response = $this->actingAs($user)->get(route('dashboard'));
    $response->assertStatus(200);
    $response->assertInertia(fn (Assert $page) => $page
        ->component('dashboard')
        ->missing('stats')
        ->missing('recent_links')
        ->reloadOnly(['stats', 'recent_links'], fn (Assert $page) => $page
            ->where('stats.total_links', 3)
            ->where('stats.active_links', 2)
            ->where('stats.total_clicks', 15)
            ->where('stats.clicks_today', 10)
        )
    );
});

test('links index returns paginated list with sorting options', function () {
    $user = User::factory()->create();

    // Create links with different timestamps and click volumes
    $link1 = Link::create([
        'user_id' => $user->id,
        'short_code' => 'code1',
        'destination_url' => 'https://example1.com',
    ]);
    $link1->created_at = now()->subDays(2);
    $link1->save();

    $link2 = Link::create([
        'user_id' => $user->id,
        'short_code' => 'code2',
        'destination_url' => 'https://example2.com',
    ]);
    $link2->created_at = now()->subDay();
    $link2->save();

    DailyStat::create([
        'link_id' => $link1->id,
        'date' => today()->toDateString(),
        'clicks_count' => 50,
    ]);

    // Test newest sorting
    $response = $this->actingAs($user)->get(route('links.index') . '?sort=newest');
    $response->assertInertia(fn (Assert $page) => $page
        ->component('links/index')
        ->has('links.data', 2)
        ->where('links.data.0.id', $link2->id) // newest first
    );

    // Test most_clicked sorting
    $response = $this->actingAs($user)->get(route('links.index') . '?sort=most_clicked');
    $response->assertInertia(fn (Assert $page) => $page
        ->component('links/index')
        ->where('links.data.0.id', $link1->id) // most clicked first (50 clicks)
    );
});

test('link show analytics page retrieves data and enforces owner authorization', function () {
    $owner = User::factory()->create();
    $stranger = User::factory()->create();

    $link = Link::create([
        'user_id' => $owner->id,
        'short_code' => 'mycode',
        'destination_url' => 'https://example.com',
    ]);

    ClickEvent::create([
        'link_id' => $link->id,
        'browser' => 'Chrome',
        'platform' => 'macOS',
        'device_type' => 'desktop',
    ]);

    // Owner can view
    $response = $this->actingAs($owner)->get(route('links.show', $link));
    $response->assertStatus(200);
    $response->assertInertia(fn (Assert $page) => $page
        ->component('links/show')
        ->where('analytics.link.id', $link->id)
        ->has('analytics.stats_7_days')
        ->has('analytics.stats_30_days')
        ->where('analytics.top_browsers.0.browser', 'Chrome')
    );

    // Stranger cannot view
    $response = $this->actingAs($stranger)->get(route('links.show', $link));
    $response->assertStatus(403);
});
