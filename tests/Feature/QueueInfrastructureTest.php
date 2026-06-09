<?php

use App\Jobs\LogClickJob;
use App\Models\Link;
use App\Models\User;
use Illuminate\Support\Facades\Queue;
use Illuminate\Support\Facades\DB;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('log click job has production ready retry and timeout configuration', function () {
    $job = new LogClickJob(['link_id' => 1]);

    expect($job->connection)->toBe('redis')
        ->and($job->queue)->toBe('analytics')
        ->and($job->tries)->toBe(5)
        ->and($job->timeout)->toBe(30)
        ->and($job->backoff())->toBe([5, 10, 30, 60]);
});

test('redirecting dispatches log click job to dedicated queue and connection', function () {
    Queue::fake();

    $user = User::factory()->create();
    $link = Link::create([
        'user_id' => $user->id,
        'short_code' => 'infrapage',
        'destination_url' => 'https://example.com'
    ]);

    // Perform redirect
    $response = $this->get("/{$link->short_code}");
    $response->assertStatus(302);

    Queue::assertPushed(LogClickJob::class, function ($job) use ($link) {
        return $job->payload['link_id'] === $link->id 
            && $job->queue === 'analytics' 
            && $job->connection === 'redis';
    });
});

test('queue health monitoring endpoint returns correct format and responds successfully', function () {
    $response = $this->getJson(route('queue.health'));

    $response->assertStatus(200)
        ->assertJsonStructure([
            'status',
            'connection',
            'queue_status',
            'pending_jobs',
            'failed_jobs',
            'timestamp'
        ]);

    $data = $response->json();
    expect($data['status'])->toBeIn(['healthy', 'unhealthy'])
        ->and($data['queue_status'])->toBeIn(['active', 'inactive', 'error']);
});

test('queue health monitoring reports failed jobs count', function () {
    // Manually insert a record into failed_jobs
    DB::table('failed_jobs')->insert([
        'uuid' => 'test-uuid-1234',
        'connection' => 'redis',
        'queue' => 'analytics',
        'payload' => json_encode(['job' => 'LogClickJob']),
        'exception' => 'Some test exception occurred',
        'failed_at' => now(),
    ]);

    $response = $this->getJson(route('queue.health'));
    $response->assertStatus(200);
    
    $data = $response->json();
    expect($data['failed_jobs'])->toBe(1);
});
