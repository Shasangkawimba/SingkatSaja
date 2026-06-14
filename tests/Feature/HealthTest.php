<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Redis;

test('health monitoring endpoint returns correct format and responds successfully', function () {
    $connection = Mockery::mock();
    $connection->shouldReceive('ping')->andReturn(true);
    Redis::shouldReceive('connection')->andReturn($connection);

    $response = $this->getJson(route('health'));

    $response->assertStatus(200)
        ->assertJsonStructure([
            'status',
            'database',
            'redis'
        ]);

    $data = $response->json();
    expect($data['status'])->toBe('healthy')
        ->and($data['database'])->toBe('connected')
        ->and($data['redis'])->toBe('connected');
});
