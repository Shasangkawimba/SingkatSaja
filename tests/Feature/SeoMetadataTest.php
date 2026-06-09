<?php

use Illuminate\Support\Facades\Config;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('robots.txt returns dynamic plaintext and contains configured sitemap url', function () {
    // Set custom app URL
    Config::set('app.url', 'https://my-custom-domain.com');

    $response = $this->get('/robots.txt');

    $response->assertStatus(200);
    $response->assertHeader('Content-Type', 'text/plain; charset=UTF-8');
    
    $content = $response->getContent();
    expect($content)->toContain('User-agent: *')
        ->and($content)->toContain('Disallow: /dashboard')
        ->and($content)->toContain('Disallow: /links')
        ->and($content)->toContain('Sitemap: https://my-custom-domain.com/sitemap.xml');
});

test('sitemap.xml returns dynamic application/xml and indexes pages', function () {
    // Set custom app URL
    Config::set('app.url', 'https://my-custom-domain.com');

    $response = $this->get('/sitemap.xml');

    $response->assertStatus(200);
    // Matches application/xml (often with charset=UTF-8)
    expect($response->headers->get('Content-Type'))->toContain('application/xml');

    $content = $response->getContent();
    expect($content)->toContain('<?xml version="1.0" encoding="UTF-8"?>')
        ->and($content)->toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')
        ->and($content)->toContain('<loc>https://my-custom-domain.com/</loc>')
        ->and($content)->toContain('<loc>https://my-custom-domain.com/login</loc>')
        ->and($content)->toContain('<loc>https://my-custom-domain.com/register</loc>');
});
