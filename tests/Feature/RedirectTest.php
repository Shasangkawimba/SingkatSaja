<?php

use App\Models\Link;
use App\Models\User;
use App\Models\ClickEvent;
use App\Models\DailyStat;
use Illuminate\Support\Facades\Redis;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('redirects immediately from Redis cache hit and records analytics', function () {
    $user = User::factory()->create();
    $link = Link::create([
        'id' => 99,
        'user_id' => $user->id,
        'short_code' => 'cacheonly',
        'destination_url' => 'https://redis-destination.com'
    ]);

    // Mock Redis key with cache-first lookup
    $redisKey = 'short:cacheonly';
    $payload = json_encode([
        'id' => $link->id,
        'destination_url' => $link->destination_url,
        'expires_at' => null,
    ]);
    Redis::shouldReceive('get')->once()->with($redisKey)->andReturn($payload);
    Redis::shouldReceive('set')
        ->once()
        ->with("dedup:{$link->id}:127.0.0.1", 1, 'EX', 60, 'NX')
        ->andReturn(true);

    $response = $this->get('/cacheonly');

    $response->assertStatus(302)
        ->assertRedirect('https://redis-destination.com');

    // Assert that click event was stored directly
    expect(ClickEvent::count())->toBe(1)
        ->and(DailyStat::count())->toBe(1);

    $click = ClickEvent::first();
    expect($click->link_id)->toBe($link->id);
});

test('redirects from database cache miss, rebuilds cache and records analytics', function () {
    $user = User::factory()->create();
    $link = Link::create([
        'user_id' => $user->id,
        'short_code' => 'dbonly',
        'destination_url' => 'https://postgres-destination.com',
    ]);

    // Cache miss followed by rebuild set call
    Redis::shouldReceive('get')->once()->with('short:dbonly')->andReturn(null);
    Redis::shouldReceive('set')->once()->with('short:dbonly', Mockery::on(function ($json) use ($link) {
        $data = json_decode($json, true);
        return $data['id'] === $link->id && $data['destination_url'] === 'https://postgres-destination.com';
    }));
    Redis::shouldReceive('set')
        ->once()
        ->with("dedup:{$link->id}:127.0.0.1", 1, 'EX', 60, 'NX')
        ->andReturn(true);

    $response = $this->get('/dbonly');

    $response->assertStatus(302)
        ->assertRedirect('https://postgres-destination.com');

    // Assert that click event was stored directly
    expect(ClickEvent::count())->toBe(1)
        ->and(DailyStat::count())->toBe(1);
});

test('returns 404 for expired links', function () {
    $user = User::factory()->create();
    $link = Link::create([
        'user_id' => $user->id,
        'short_code' => 'expiredcode',
        'destination_url' => 'https://expired-destination.com',
        'expires_at' => now()->subDay(),
    ]);

    Redis::shouldReceive('get')->once()->with('short:expiredcode')->andReturn(null);

    $response = $this->get('/expiredcode');

    $response->assertStatus(404);
});

test('returns 404 for soft-deleted links', function () {
    $user = User::factory()->create();
    $link = Link::create([
        'user_id' => $user->id,
        'short_code' => 'deletedcode',
        'destination_url' => 'https://deleted-destination.com',
    ]);
    $link->delete();

    Redis::shouldReceive('get')->once()->with('short:deletedcode')->andReturn(null);

    $response = $this->get('/deletedcode');

    $response->assertStatus(404);
});
