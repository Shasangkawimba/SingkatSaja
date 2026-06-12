<?php

use App\Services\UserAgentParser;
use App\Services\AnalyticsService;
use App\Models\Link;
use App\Models\User;
use App\Models\ClickEvent;
use App\Models\DailyStat;
use Illuminate\Support\Facades\Redis;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('user agent parser detects dimensions correctly', function () {
    $parser = new UserAgentParser();

    // Chrome on Windows Desktop
    $chromeWindows = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
    $res = $parser->parse($chromeWindows);
    expect($res['browser'])->toBe('Chrome')
        ->and($res['platform'])->toBe('Windows')
        ->and($res['device_type'])->toBe('desktop');

    // Safari on iPhone Mobile
    $safariIphone = 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1';
    $res = $parser->parse($safariIphone);
    expect($res['browser'])->toBe('Safari')
        ->and($res['platform'])->toBe('iOS')
        ->and($res['device_type'])->toBe('mobile');

    // Firefox on Linux Desktop
    $firefoxLinux = 'Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/119.0';
    $res = $parser->parse($firefoxLinux);
    expect($res['browser'])->toBe('Firefox')
        ->and($res['platform'])->toBe('Linux')
        ->and($res['device_type'])->toBe('desktop');

    // iPad Tablet
    $ipadTablet = 'Mozilla/5.0 (iPad; CPU OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1';
    $res = $parser->parse($ipadTablet);
    expect($res['device_type'])->toBe('tablet');

    // Malformed / Unknown
    $res = $parser->parse('some malformed string');
    expect($res['browser'])->toBe('Other')
        ->and($res['platform'])->toBe('Other')
        ->and($res['device_type'])->toBe('desktop');
});

test('analytics service ingests events and aggregates stats transactionally', function () {
    $user = User::factory()->create();
    $link = Link::create([
        'user_id' => $user->id,
        'short_code' => 'statcode',
        'destination_url' => 'https://example.com'
    ]);

    $service = app(AnalyticsService::class);

    // Run first ingestion
    $service->recordClick(
        $link->id,
        '192.168.1.1',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'https://github.com',
        now()->timestamp
    );

    expect(ClickEvent::count())->toBe(1)
        ->and(DailyStat::count())->toBe(1);

    $stat = DailyStat::first();
    expect($stat->clicks_count)->toBe(1)
        ->and($stat->link_id)->toBe($link->id);

    // Run second ingestion on the same day with a different IP to verify upsert increment
    $service->recordClick(
        $link->id,
        '192.168.1.2',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'https://github.com',
        now()->timestamp
    );

    expect(ClickEvent::count())->toBe(2)
        ->and(DailyStat::count())->toBe(1)
        ->and(DailyStat::first()->clicks_count)->toBe(2);
});
