<?php

use App\Models\Link;
use App\Models\User;
use App\Models\ClickEvent;
use App\Models\DailyStat;
use App\Jobs\LogClickJob;
use App\Actions\CreateLinkAction;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('custom alias cannot use reserved keywords', function () {
    $request = new \App\Http\Requests\StoreLinkRequest();
    $rules = $request->rules();
    
    $validator = Validator::make(['destination_url' => 'https://example.com', 'short_code' => 'admin'], $rules);
    
    expect($validator->fails())->toBeTrue()
        ->and($validator->errors()->has('short_code'))->toBeTrue();
});

test('link creation rate limiting restricts user after 30 links', function () {
    $user = User::factory()->create();
    
    // Simulate rate limit key exists and holds 30
    Redis::shouldReceive('get')->once()->with("rl:create:user:{$user->id}")->andReturn(30);

    // Validate using request
    $request = new \App\Http\Requests\StoreLinkRequest();
    $request->setUserResolver(fn() => $user);

    $validator = Validator::make(['destination_url' => 'https://example.com'], $request->rules());
    $request->withValidator($validator);

    expect($validator->fails())->toBeTrue()
        ->and($validator->errors()->has('short_code'))->toBeTrue();
});

test('successful link creation increments creation rate limit in Redis', function () {
    $user = User::factory()->create();
    
    Redis::shouldReceive('set')->once()->with(Mockery::any(), Mockery::any());
    
    // Mock the increment count check
    Redis::shouldReceive('incr')->once()->with("rl:create:user:{$user->id}")->andReturn(1);
    Redis::shouldReceive('expire')->once()->with("rl:create:user:{$user->id}", 3600)->andReturn(true);

    $action = app(CreateLinkAction::class);
    $link = $action->execute($user, [
        'destination_url' => 'https://example.com'
    ]);

    expect($link)->toBeInstanceOf(Link::class);
});

test('analytics deduplication discards second hit within 60s from same IP', function () {
    $user = User::factory()->create();
    $link = Link::create([
        'user_id' => $user->id,
        'short_code' => 'dedupcode',
        'destination_url' => 'https://example.com'
    ]);

    $payload = [
        'link_id' => $link->id,
        'ip_address' => '1.1.1.1',
        'user_agent' => 'Mozilla/5.0 ...',
        'timestamp' => now()->timestamp,
    ];

    // First click: Redis allows it (set returns true)
    Redis::shouldReceive('set')
        ->once()
        ->with("dedup:{$link->id}:1.1.1.1", 1, 'EX', 60, 'NX')
        ->andReturn(true);

    $job1 = new LogClickJob($payload);
    app()->call([$job1, 'handle']);

    expect(ClickEvent::count())->toBe(1)
        ->and(DailyStat::first()->clicks_count)->toBe(1);

    // Second click: Redis blocks it (set returns false/null)
    Redis::shouldReceive('set')
        ->once()
        ->with("dedup:{$link->id}:1.1.1.1", 1, 'EX', 60, 'NX')
        ->andReturn(false);

    $job2 = new LogClickJob($payload);
    app()->call([$job2, 'handle']);

    // Counts remain 1 (no duplicate log or stats aggregate increment)
    expect(ClickEvent::count())->toBe(1)
        ->and(DailyStat::first()->clicks_count)->toBe(1);
});
