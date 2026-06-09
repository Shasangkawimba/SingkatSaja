<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;

class SeoController extends Controller
{
    /**
     * Serve robots.txt dynamically.
     */
    public function robots(): Response
    {
        $appUrl = config('app.url');
        
        $content = "User-agent: *\n";
        $content .= "Disallow: /dashboard\n";
        $content .= "Disallow: /links\n";
        $content .= "Disallow: /settings\n";
        $content .= "Disallow: /api/\n";
        $content .= "Disallow: /logout\n";
        $content .= "Allow: /\n\n";
        $content .= "Sitemap: {$appUrl}/sitemap.xml\n";

        return response($content, 200)
            ->header('Content-Type', 'text/plain');
    }

    /**
     * Serve sitemap.xml dynamically.
     */
    public function sitemap(): Response
    {
        $appUrl = config('app.url');
        $now = now()->toAtomString();

        $xml = '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
        $xml .= '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
        
        // Homepage
        $xml .= "    <url>\n";
        $xml .= "        <loc>{$appUrl}/</loc>\n";
        $xml .= "        <lastmod>{$now}</lastmod>\n";
        $xml .= "        <changefreq>daily</changefreq>\n";
        $xml .= "        <priority>1.0</priority>\n";
        $xml .= "    </url>\n";

        // Login
        $xml .= "    <url>\n";
        $xml .= "        <loc>{$appUrl}/login</loc>\n";
        $xml .= "        <lastmod>{$now}</lastmod>\n";
        $xml .= "        <changefreq>monthly</changefreq>\n";
        $xml .= "        <priority>0.8</priority>\n";
        $xml .= "    </url>\n";

        // Register
        $xml .= "    <url>\n";
        $xml .= "        <loc>{$appUrl}/register</loc>\n";
        $xml .= "        <lastmod>{$now}</lastmod>\n";
        $xml .= "        <changefreq>monthly</changefreq>\n";
        $xml .= "        <priority>0.8</priority>\n";
        $xml .= "    </url>\n";

        $xml .= '</urlset>';

        return response($xml, 200)
            ->header('Content-Type', 'application/xml');
    }
}
