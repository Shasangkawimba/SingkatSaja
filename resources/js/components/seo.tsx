import React from 'react';
import { Head, usePage } from '@inertiajs/react';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    canonical?: string;
    ogImage?: string;
    ogType?: string;
    twitterCard?: string;
}

export function SEO({
    title,
    description = 'SingkatSaja is a fast, reliable, and secure URL shortener platform with detailed click tracking analytics and custom alias support.',
    keywords = 'url shortener, link shortener, bitly clone, fast redirect, click tracking, link analytics, custom alias, singkat saja',
    canonical,
    ogImage = '/favicon.svg',
    ogType = 'website',
    twitterCard = 'summary_large_image',
}: SEOProps) {
    const { url, props } = usePage();
    const appUrl = (props.app_url as string) || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost');
    const currentUrl = canonical || `${appUrl}${url}`;
    const fullTitle = title ? `${title} | SingkatSaja` : 'SingkatSaja — Confident & Fast URL Shortener';

    return (
        <Head>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <link rel="canonical" href={currentUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={ogType} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:image" content={ogImage.startsWith('http') ? ogImage : `${appUrl}${ogImage}`} />

            {/* Twitter */}
            <meta name="twitter:card" content={twitterCard} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage.startsWith('http') ? ogImage : `${appUrl}${ogImage}`} />
        </Head>
    );
}
