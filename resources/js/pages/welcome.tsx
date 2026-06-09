import { Link, usePage } from '@inertiajs/react';
import {
    LinkIcon,
    Clock,
    BarChart3,
    ArrowRight,
    Copy,
    Check,
} from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { PageContainer } from '@/components/page-container';
import { SEO } from '@/components/seo';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PublicLayout } from '@/layouts/public-layout';
import { dashboard, register, login } from '@/routes';

export default function Welcome() {
    const { auth } = usePage().props as any;
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const handleCopy = (code: string, index: number) => {
        const fullUrl = `${window.location.origin}/${code}`;
        navigator.clipboard.writeText(fullUrl);
        setCopiedIndex(index);
        toast.success(`Copied: ${fullUrl}`);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <PublicLayout>
            <SEO />

            {/* 1. Hero Section */}
            <section className="relative overflow-hidden bg-white pt-48 pb-56 md:pt-64 md:pb-84">
                {/* Subtle Ambient Light Glow */}
                <div className="pointer-events-none absolute top-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-vivid-indigo/5 blur-[120px]" />

                <PageContainer className="relative z-10 flex flex-col items-center gap-40 text-center">
                    <div className="flex flex-col items-center gap-16">
                        <Badge
                            variant="eyebrow"
                            className="border border-vivid-indigo/10 bg-pale-lilac px-4 py-1.5 text-vivid-indigo dark:bg-vivid-indigo/10 dark:text-vivid-indigo"
                        >
                            SingkatSaja v1.0
                        </Badge>
                        <h1 className="mt-8 max-w-4xl font-satoshi text-4xl leading-[1.05] font-bold tracking-tight text-graphite md:text-6xl">
                            The URL engine built for{' '}
                            <span className="bg-gradient-to-r from-vivid-indigo to-pale-lavender bg-clip-text text-transparent text-vivid-indigo">
                                precision & speed
                            </span>
                        </h1>
                        <p className="mt-12 max-w-2xl text-body leading-relaxed text-slate md:text-heading-sm">
                            Create short, high-performance link aliases in
                            milliseconds. Backed by Redis-first lookups and
                            non-blocking asynchronous analytics.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-16">
                        {auth?.user ? (
                            <Button
                                asChild
                                size="lg"
                                className="h-12 rounded-lg bg-vivid-indigo px-24 font-medium text-pure-white shadow-sm transition-all hover:scale-[1.02] hover:bg-vivid-indigo/90"
                            >
                                <Link href={dashboard()}>
                                    Go to Dashboard{' '}
                                    <ArrowRight className="ml-8 size-16" />
                                </Link>
                            </Button>
                        ) : (
                            <>
                                <Button
                                    asChild
                                    size="lg"
                                    className="h-12 rounded-lg bg-vivid-indigo px-24 font-medium text-pure-white shadow-sm transition-all hover:scale-[1.02] hover:bg-vivid-indigo/90"
                                >
                                    <Link href={register()}>
                                        Get Started — It's Free
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    size="lg"
                                    variant="ghost"
                                    className="h-12 rounded-lg border border-neutral-200 px-24 font-medium text-graphite hover:bg-frost-gray"
                                >
                                    <a href="#features">Explore Features</a>
                                </Button>
                            </>
                        )}
                    </div>

                    {/* Interactive App Mockup Preview - Sleek Browser Window */}
                    <div className="mt-48 w-full max-w-4xl overflow-hidden rounded-largecards border border-neutral-200/80 bg-pure-white shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-500 hover:border-neutral-300">
                        {/* Browser Window Header */}
                        <div className="flex items-center justify-between border-b border-neutral-100 bg-frost-gray/30 px-20 py-12 text-left">
                            <div className="flex items-center gap-8">
                                <div className="size-10 rounded-full bg-neutral-200" />
                                <div className="size-10 rounded-full bg-neutral-200" />
                                <div className="size-10 rounded-full bg-neutral-200" />
                                {/* Address Bar Simulation */}
                                <div className="ml-16 flex w-[240px] items-center gap-8 truncate rounded-md border border-neutral-200/60 bg-pure-white px-16 py-4 text-[12px] text-slate select-none md:w-[320px]">
                                    <span className="text-[10px] text-emerald-500">
                                        ●
                                    </span>
                                    <span>shortcut.singkatsaja.com</span>
                                </div>
                            </div>
                            <Badge
                                variant="success"
                                className="bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                            >
                                Active REDIS Engine
                            </Badge>
                        </div>

                        {/* Browser Body / Dashboard Preview */}
                        <div className="flex flex-col gap-16 bg-pure-white p-20 text-left md:p-32">
                            <div className="border-neutral-150 flex flex-col items-start justify-between gap-16 rounded-cards border bg-frost-gray/30 p-20 transition-colors hover:bg-frost-gray/50 md:flex-row md:items-center">
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-wrap items-center gap-8">
                                        <span className="font-satoshi text-[16px] font-bold text-graphite">
                                            singkat.saja/promo-2026
                                        </span>
                                        <Badge
                                            variant="eyebrow"
                                            className="border border-neutral-200/80 bg-white px-8 py-0.5 text-[11px]"
                                        >
                                            Custom Alias
                                        </Badge>
                                    </div>
                                    <span className="max-w-sm truncate text-[13px] font-medium text-slate md:max-w-md">
                                        https://ecommerce.com/campaign/summer-promo-discount-page
                                    </span>
                                </div>
                                <div className="flex w-full items-center justify-between gap-24 border-t border-neutral-100 pt-12 md:w-auto md:justify-end md:border-t-0 md:pt-0">
                                    <div className="text-left md:text-right">
                                        <div className="font-satoshi text-[16px] font-bold text-graphite">
                                            1,482 Clicks
                                        </div>
                                        <div className="text-[11px] font-medium text-slate">
                                            Recorded Today
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-12">
                                        <Badge variant="success">Active</Badge>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() =>
                                                handleCopy('promo-2026', 0)
                                            }
                                            className="size-32 rounded-lg border border-neutral-200/60 bg-white shadow-xs transition-all hover:bg-neutral-50 hover:text-vivid-indigo"
                                        >
                                            {copiedIndex === 0 ? (
                                                <Check className="size-14 text-emerald-600" />
                                            ) : (
                                                <Copy className="size-14" />
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </div>

                            <div className="border-neutral-150 flex flex-col items-start justify-between gap-16 rounded-cards border bg-pure-white p-20 transition-colors hover:bg-frost-gray/20 md:flex-row md:items-center">
                                <div className="flex flex-col gap-4">
                                    <div className="flex flex-wrap items-center gap-8">
                                        <span className="font-satoshi text-[16px] font-bold text-graphite">
                                            singkat.saja/x7Y9k2L
                                        </span>
                                        <Badge
                                            variant="eyebrow"
                                            className="border border-neutral-200/80 bg-white px-8 py-0.5 text-[11px]"
                                        >
                                            Random Base62
                                        </Badge>
                                    </div>
                                    <span className="max-w-sm truncate text-[13px] font-medium text-slate md:max-w-md">
                                        https://github.com/Shasangkawimba/SingkatSaja
                                    </span>
                                </div>
                                <div className="flex w-full items-center justify-between gap-24 border-t border-neutral-100 pt-12 md:w-auto md:justify-end md:border-t-0 md:pt-0">
                                    <div className="text-left md:text-right">
                                        <div className="font-satoshi text-[16px] font-bold text-graphite">
                                            382 Clicks
                                        </div>
                                        <div className="text-[11px] font-medium text-slate">
                                            Recorded Today
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-12">
                                        <Badge variant="warning">
                                            Expires Soon
                                        </Badge>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() =>
                                                handleCopy('x7Y9k2L', 1)
                                            }
                                            className="size-32 rounded-lg border border-neutral-200/60 bg-white shadow-xs transition-all hover:bg-neutral-50 hover:text-vivid-indigo"
                                        >
                                            {copiedIndex === 1 ? (
                                                <Check className="size-14 text-emerald-600" />
                                            ) : (
                                                <Copy className="size-14" />
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </PageContainer>
            </section>

            {/* 2. Social Proof Section */}
            <section className="border-t border-neutral-100 bg-frost-gray/20 py-20 md:py-24">
                <PageContainer className="flex flex-col items-center gap-16 py-0 md:py-0">
                    <p className="text-[11px] font-bold tracking-widest text-slate/70 uppercase">
                        Trusted by builders at modern organizations
                    </p>
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-32 opacity-40 grayscale transition-opacity hover:opacity-60 md:gap-56">
                        <span className="font-satoshi text-[20px] font-bold tracking-tighter text-graphite">
                            ACME LABS
                        </span>
                        <span className="font-satoshi text-[20px] font-bold tracking-tighter text-graphite">
                            INITECH
                        </span>
                        <span className="font-satoshi text-[20px] font-bold tracking-tighter text-graphite">
                            HOOLI
                        </span>
                        <span className="font-satoshi text-[20px] font-bold tracking-tighter text-graphite">
                            VEHEMENT
                        </span>
                        <span className="font-satoshi text-[20px] font-bold tracking-tighter text-graphite">
                            UMBRELLA
                        </span>
                    </div>
                </PageContainer>
            </section>

            {/* 3. Features Section (Product Benefits) */}
            <section
                id="features"
                className="border-t border-b border-neutral-100 bg-frost-gray/30 py-48 md:py-76"
            >
                <PageContainer className="flex flex-col gap-48">
                    <div className="flex flex-col gap-8 text-left">
                        <Badge
                            variant="eyebrow"
                            className="w-fit bg-pale-lilac text-vivid-indigo"
                        >
                            Core Capabilities
                        </Badge>
                        <h2 className="mt-8 font-satoshi text-3xl font-bold tracking-tight text-graphite">
                            Focusing strictly on performance and precision
                        </h2>
                        <p className="max-w-xl text-body leading-relaxed text-slate">
                            No subscription walls or bloated packages. Just raw
                            redirect speed combined with the essential features
                            you expect.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-24 md:grid-cols-3">
                        <Card className="flex flex-col justify-between rounded-largecards border border-neutral-200/80 bg-white p-24 transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300">
                            <CardHeader className="flex flex-col gap-16 p-0">
                                <div className="flex size-44 items-center justify-center rounded-lg bg-pale-lilac/50 text-vivid-indigo">
                                    <LinkIcon className="size-22 stroke-[1.5]" />
                                </div>
                                <CardTitle className="text-heading-sm font-bold text-graphite">
                                    Custom Aliases
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="mt-12 p-0">
                                <p className="text-[14px] leading-relaxed text-slate">
                                    Define clean, memorable brand shortcodes. We
                                    enforce strict reserved routing rules to
                                    prevent users from overriding dashboard
                                    URLs.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="flex flex-col justify-between rounded-largecards border border-neutral-200/80 bg-white p-24 transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300">
                            <CardHeader className="flex flex-col gap-16 p-0">
                                <div className="flex size-44 items-center justify-center rounded-lg bg-pale-lilac/50 text-vivid-indigo">
                                    <Clock className="size-22 stroke-[1.5]" />
                                </div>
                                <CardTitle className="text-heading-sm font-bold text-graphite">
                                    Scheduled Expirations
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="mt-12 p-0">
                                <p className="text-[14px] leading-relaxed text-slate">
                                    Configure precise campaign durations.
                                    Expired links are automatically evicted from
                                    Redis and return immediate 404s.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="flex flex-col justify-between rounded-largecards border border-neutral-200/80 bg-white p-24 transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300">
                            <CardHeader className="flex flex-col gap-16 p-0">
                                <div className="flex size-44 items-center justify-center rounded-lg bg-pale-lilac/50 text-vivid-indigo">
                                    <BarChart3 className="size-22 stroke-[1.5]" />
                                </div>
                                <CardTitle className="text-heading-sm font-bold text-graphite">
                                    Asynchronous Analytics
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="mt-12 p-0">
                                <p className="text-[14px] leading-relaxed text-slate">
                                    Track click patterns dynamically. Telemetry
                                    is parsed in isolated queue workers to keep
                                    redirection latency low.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </PageContainer>
            </section>

            {/* 4. How It Works Section */}
            <section className="bg-white py-48 md:py-76">
                <PageContainer className="flex flex-col gap-48">
                    <div className="flex flex-col items-center gap-8 text-center">
                        <Badge
                            variant="eyebrow"
                            className="bg-pale-lilac text-vivid-indigo"
                        >
                            The Redirection Flow
                        </Badge>
                        <h2 className="mt-8 font-satoshi text-3xl font-bold tracking-tight text-graphite">
                            Three simple steps to high-performance links
                        </h2>
                        <p className="max-w-xl text-center text-body leading-relaxed text-slate">
                            Simple to operate, reliable under heavy traffic.
                        </p>
                    </div>

                    <div className="mt-24 grid grid-cols-1 gap-32 text-center md:grid-cols-3">
                        <div className="flex flex-col items-center gap-16">
                            <div className="flex size-56 items-center justify-center rounded-full border border-neutral-200 bg-frost-gray/50 font-satoshi text-heading-sm font-bold text-graphite">
                                01
                            </div>
                            <h3 className="text-heading-sm font-bold text-graphite">
                                Generate
                            </h3>
                            <p className="max-w-xs text-[14px] leading-relaxed text-slate">
                                Input your long target URL, choose a custom
                                alias path, and configure an optional expiry
                                window.
                            </p>
                        </div>

                        <div className="flex flex-col items-center gap-16">
                            <div className="flex size-56 items-center justify-center rounded-full border border-neutral-200 bg-frost-gray/50 font-satoshi text-heading-sm font-bold text-graphite">
                                02
                            </div>
                            <h3 className="text-heading-sm font-bold text-graphite">
                                Share
                            </h3>
                            <p className="max-w-xs text-[14px] leading-relaxed text-slate">
                                Distribute your singkat.saja Base62 path. Clicks
                                are resolved from the Redis cache in
                                single-digit milliseconds.
                            </p>
                        </div>

                        <div className="flex flex-col items-center gap-16">
                            <div className="flex size-56 items-center justify-center rounded-full border border-neutral-200 bg-frost-gray/50 font-satoshi text-heading-sm font-bold text-graphite">
                                03
                            </div>
                            <h3 className="text-heading-sm font-bold text-graphite">
                                Monitor
                            </h3>
                            <p className="max-w-xs text-[14px] leading-relaxed text-slate">
                                Track trends, devices, browsers, and location
                                dimensions inside a polished analytics
                                dashboard.
                            </p>
                        </div>
                    </div>
                </PageContainer>
            </section>

            {/* 5. CTA Section */}
            <section className="relative overflow-hidden border-t border-neutral-100 bg-midnight-ink py-56 text-pure-white md:py-84">
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage:
                            'radial-gradient(var(--color-pure-white) 1px, transparent 1px)',
                        backgroundSize: '16px 16px',
                    }}
                />
                <PageContainer className="relative z-10 flex flex-col items-center gap-24 text-center">
                    <span className="rounded-pills border border-sunlit-yellow/30 px-12 py-4 text-[11px] font-bold tracking-tight text-sunlit-yellow uppercase">
                        Get Started Immediately
                    </span>
                    <h2 className="max-w-xl font-satoshi text-heading-lg leading-tight font-bold tracking-tight">
                        Clean short links, ready in seconds.
                    </h2>
                    <p className="max-w-md text-body leading-relaxed text-soft-violet">
                        Create your account today. No credit cards, no
                        subscriptions, no bloat.
                    </p>
                    <div className="mt-12 flex flex-wrap items-center justify-center gap-16">
                        {auth?.user ? (
                            <Button
                                asChild
                                size="lg"
                                className="h-12 rounded-lg bg-vivid-indigo px-24 font-medium text-pure-white shadow-sm transition-all hover:scale-[1.02] hover:bg-vivid-indigo/90"
                            >
                                <Link href={dashboard()}>Go to Dashboard</Link>
                            </Button>
                        ) : (
                            <>
                                <Button
                                    asChild
                                    size="lg"
                                    className="h-12 rounded-lg bg-vivid-indigo px-24 font-medium text-pure-white shadow-sm transition-all hover:scale-[1.02] hover:bg-vivid-indigo/90"
                                >
                                    <Link href={register()}>
                                        Create Free Account
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    size="lg"
                                    variant="ghost"
                                    className="h-12 rounded-lg border border-pure-white px-24 font-medium text-pure-white hover:bg-pure-white/10"
                                >
                                    <Link href={login()}>Log In</Link>
                                </Button>
                            </>
                        )}
                    </div>
                </PageContainer>
            </section>
        </PublicLayout>
    );
}
