<?php

use App\Models\Link;
use App\Models\User;
use App\Jobs\LogClickJob;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Queue;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('redirects immediately from Redis cache hit and dispatches analytics', function () {
    Queue::fake();

    // Mock Redis key with no database record existing to prove cache-first lookup
    $redisKey = 'short:cacheonly';
    $payload = json_encode([
        'id' => 99,
        'destination_url' => 'https://redis-destination.com',
        'expires_at' => null,
    ]);
    Redis::shouldReceive('get')->once()->with($redisKey)->andReturn($payload);

    $response = $this->get('/cacheonly');

    $response->assertStatus(302)
        ->assertRedirect('https://redis-destination.com');

    Queue::assertPushed(LogClickJob::class, function ($job) {
        return $job->payload['link_id'] === 99
            && $job->payload['ip_address'] !== null;
    });
});

test('redirects from database cache miss, rebuilds cache and dispatches analytics', function () {
    Queue::fake();

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

    $response = $this->get('/dbonly');

    $response->assertStatus(302)
        ->assertRedirect('https://postgres-destination.com');

    Queue::assertPushed(LogClickJob::class);
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
