<?php

use App\Models\Link;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Illuminate\Support\Facades\Redis;

uses(RefreshDatabase::class);

test('a 404 exception renders custom inertia error page', function () {
    Redis::shouldReceive('get')->andReturn(null);

    $response = $this->get('/some-non-existent-wildcard-route-that-doesnt-exist');

    // Asserts HTTP status 404
    $response->assertStatus(404);

    // Asserts Inertia renders 'error' component with status prop = 404
    $response->assertInertia(fn (Assert $page) => $page
        ->component('error')
        ->where('status', 404)
    );
});

test('a 403 forbidden exception renders custom inertia error page', function () {
    $owner = User::factory()->create();
    $stranger = User::factory()->create();
    
    $link = Link::create([
        'user_id' => $owner->id,
        'short_code' => 'forbidden',
        'destination_url' => 'https://example.com'
    ]);

    // Stranger tries to edit owner's link -> throws 403 policy exception
    $response = $this->actingAs($stranger)->get("/links/{$link->id}/edit");
    
    $response->assertStatus(403);
    $response->assertInertia(fn (Assert $page) => $page
        ->component('error')
        ->where('status', 403)
    );
});
