<?php

use App\Actions\Link\GenerateShortCodeAction;
use App\Actions\Link\CreateLinkAction;
use App\Actions\Link\UpdateLinkAction;
use App\Actions\Link\DeleteLinkAction;
use App\Models\Link;
use App\Models\User;
use Illuminate\Support\Facades\Redis;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('generates unique 7 character base62 code', function () {
    $action = app(GenerateShortCodeAction::class);
    $code = $action->execute();

    expect($code)->toHaveLength(7)
        ->and(preg_match('/^[a-zA-Z0-9]{7}$/', $code))->toBe(1);
});

test('create link action saves in DB and caches to Redis without TTL', function () {
    $user = User::factory()->create();

    Redis::shouldReceive('set')
        ->once()
        ->with('short:custom1', Mockery::on(function ($json) {
            $data = json_decode($json, true);
            return $data['destination_url'] === 'https://example.com';
        }));

    Redis::shouldReceive('incr')->once()->with("rl:create:user:{$user->id}")->andReturn(1);
    Redis::shouldReceive('expire')->once()->with("rl:create:user:{$user->id}", 3600)->andReturn(true);

    $action = app(CreateLinkAction::class);
    $link = $action->execute($user, [
        'destination_url' => 'https://example.com',
        'short_code' => 'custom1'
    ]);

    expect($link->short_code)->toBe('custom1')
        ->and(Link::where('short_code', 'custom1')->exists())->toBeTrue();
});

test('create link action with expires_at sets Redis TTL', function () {
    $user = User::factory()->create();
    $expiresAt = now()->addDays(5);

    Redis::shouldReceive('setex')
        ->once()
        ->with('short:custom2', Mockery::any(), Mockery::on(function ($json) use ($expiresAt) {
            $data = json_decode($json, true);
            return $data['expires_at'] === $expiresAt->toIso8601String();
        }));

    Redis::shouldReceive('incr')->once()->with("rl:create:user:{$user->id}")->andReturn(1);
    Redis::shouldReceive('expire')->once()->with("rl:create:user:{$user->id}", 3600)->andReturn(true);

    $action = app(CreateLinkAction::class);
    $link = $action->execute($user, [
        'destination_url' => 'https://example.com',
        'short_code' => 'custom2',
        'expires_at' => $expiresAt
    ]);

    expect($link->expires_at->toIso8601String())->toBe($expiresAt->toIso8601String());
});

test('update link action updates DB and updates Redis', function () {
    $user = User::factory()->create();
    $link = Link::create([
        'user_id' => $user->id,
        'short_code' => 'custom3',
        'destination_url' => 'https://old.com'
    ]);

    Redis::shouldReceive('set')
        ->once()
        ->with('short:custom3', Mockery::on(function ($json) {
            $data = json_decode($json, true);
            return $data['destination_url'] === 'https://new.com';
        }));

    $action = app(UpdateLinkAction::class);
    $action->execute($link, [
        'destination_url' => 'https://new.com'
    ]);

    expect($link->fresh()->destination_url)->toBe('https://new.com');
});

test('delete link action deletes Redis cache and soft deletes DB record', function () {
    $user = User::factory()->create();
    $link = Link::create([
        'user_id' => $user->id,
        'short_code' => 'custom4',
        'destination_url' => 'https://example.com'
    ]);

    Redis::shouldReceive('del')
        ->once()
        ->with('short:custom4');

    $action = app(DeleteLinkAction::class);
    $action->execute($link);

    expect($link->fresh()->trashed())->toBeTrue();
});
