import { Link, usePage } from '@inertiajs/react';
import {
    LinkIcon,
    Clock,
    BarChart3,
    ArrowRight,
    Copy,
    Check,
    Zap,
    Shield,
    ChevronRight,
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
            <section className="relative overflow-hidden bg-white pt-16 pb-20 md:pt-24 md:pb-28">
                {/* Ambient glow */}
                <div className="pointer-events-none absolute top-0 left-1/2 h-[350px] w-[700px] -translate-x-1/2 rounded-full bg-vivid-indigo/5 blur-[120px]" />

                <PageContainer className="relative z-10 flex flex-col items-center gap-10 text-center">
                    <div className="flex flex-col items-center gap-4">
                        <Badge
                            variant="eyebrow"
                            className="border border-vivid-indigo/15 bg-pale-lilac px-3.5 py-1 text-[12px] font-medium text-vivid-indigo"
                        >
                            SingkatSaja v1.0 · Redis-Powered Redirects
                        </Badge>
                        <h1 className="mt-2 max-w-3xl font-satoshi text-[2.5rem] leading-[1.08] font-bold tracking-tight text-graphite md:text-[3.5rem]">
                            The URL engine built for{' '}
                            <span className="bg-gradient-to-r from-vivid-indigo to-pale-lavender bg-clip-text text-transparent">
                                precision &amp; speed
                            </span>
                        </h1>
                        <p className="mt-2 max-w-xl text-[15px] leading-relaxed text-slate md:text-[17px]">
                            Create short, high-performance link aliases in
                            milliseconds. Backed by Redis-first lookups and
                            non-blocking asynchronous analytics.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-3">
                        {auth?.user ? (
                            <Button
                                asChild
                                size="lg"
                                className="h-11 rounded-lg bg-vivid-indigo px-7 text-[14px] font-medium text-pure-white shadow-sm transition-all hover:scale-[1.02] hover:bg-vivid-indigo/90"
                            >
                                <Link href={dashboard()}>
                                    Go to Dashboard{' '}
                                    <ArrowRight className="size-4" />
                                </Link>
                            </Button>
                        ) : (
                            <>
                                <Button
                                    asChild
                                    size="lg"
                                    className="h-11 rounded-lg bg-vivid-indigo px-7 text-[14px] font-medium text-pure-white shadow-sm transition-all hover:scale-[1.02] hover:bg-vivid-indigo/90"
                                >
                                    <Link href={register()}>
                                        Get Started — It's Free
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    size="lg"
                                    variant="ghost"
                                    className="h-11 rounded-lg border border-neutral-200 px-7 text-[14px] font-medium text-graphite hover:bg-frost-gray"
                                >
                                    <a href="#features">Explore Features</a>
                                </Button>
                            </>
                        )}
                    </div>

                    {/* App Mockup Preview */}
                    <div className="mt-6 w-full max-w-3xl overflow-hidden rounded-xl border border-neutral-200/70 bg-white shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-all duration-500 hover:border-neutral-300 hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)]">
                        {/* Browser Window Header */}
                        <div className="flex items-center justify-between border-b border-neutral-100 bg-neutral-50/60 px-4 py-2.5">
                            <div className="flex items-center gap-2">
                                <div className="flex gap-1.5">
                                    <div className="size-2.5 rounded-full bg-neutral-200" />
                                    <div className="size-2.5 rounded-full bg-neutral-200" />
                                    <div className="size-2.5 rounded-full bg-neutral-200" />
                                </div>
                                <div className="ml-3 flex w-[240px] items-center gap-2 truncate rounded border border-neutral-200/60 bg-white px-3 py-1 text-[11px] text-slate select-none md:w-[300px]">
                                    <span className="text-[9px] text-emerald-500">●</span>
                                    <span>shortcut.singkatsaja.com</span>
                                </div>
                            </div>
                            <Badge
                                variant="success"
                                className="bg-emerald-50 text-[11px] text-emerald-700"
                            >
                                Active REDIS Engine
                            </Badge>
                        </div>

                        {/* Browser Body */}
                        <div className="flex flex-col gap-2.5 bg-white p-4 text-left md:p-5">
                            {/* Row 1 */}
                            <div className="flex flex-col items-start justify-between gap-3 rounded-lg border border-neutral-100 bg-frost-gray/20 p-4 transition-colors hover:bg-frost-gray/40 md:flex-row md:items-center">
                                <div className="flex flex-col gap-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="font-satoshi text-[15px] font-bold text-graphite">
                                            singkat.saja/promo-2026
                                        </span>
                                        <Badge
                                            variant="eyebrow"
                                            className="border border-neutral-200/80 bg-white px-2 py-0.5 text-[10px]"
                                        >
                                            Custom Alias
                                        </Badge>
                                    </div>
                                    <span className="max-w-sm truncate text-[12px] text-slate md:max-w-md">
                                        https://ecommerce.com/campaign/summer-promo-discount-page
                                    </span>
                                </div>
                                <div className="flex w-full items-center justify-between gap-4 border-t border-neutral-100 pt-2.5 md:w-auto md:justify-end md:border-t-0 md:pt-0">
                                    <div className="text-left md:text-right">
                                        <div className="font-satoshi text-[15px] font-bold text-graphite">
                                            1,482 Clicks
                                        </div>
                                        <div className="text-[10px] font-medium text-slate">
                                            Recorded Today
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Badge variant="success">Active</Badge>
                                        <button
                                            onClick={() => handleCopy('promo-2026', 0)}
                                            className="flex size-7 items-center justify-center rounded border border-neutral-200/60 bg-white text-slate shadow-none transition-all hover:bg-neutral-50 hover:text-vivid-indigo"
                                        >
                                            {copiedIndex === 0 ? (
                                                <Check className="size-3 text-emerald-600" />
                                            ) : (
                                                <Copy className="size-3" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Row 2 */}
                            <div className="flex flex-col items-start justify-between gap-3 rounded-lg border border-neutral-100 bg-white p-4 transition-colors hover:bg-frost-gray/20 md:flex-row md:items-center">
                                <div className="flex flex-col gap-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <span className="font-satoshi text-[15px] font-bold text-graphite">
                                            singkat.saja/x7Y9k2L
                                        </span>
                                        <Badge
                                            variant="eyebrow"
                                            className="border border-neutral-200/80 bg-white px-2 py-0.5 text-[10px]"
                                        >
                                            Random Base62
                                        </Badge>
                                    </div>
                                    <span className="max-w-sm truncate text-[12px] text-slate md:max-w-md">
                                        https://github.com/Shasangkawimba/SingkatSaja
                                    </span>
                                </div>
                                <div className="flex w-full items-center justify-between gap-4 border-t border-neutral-100 pt-2.5 md:w-auto md:justify-end md:border-t-0 md:pt-0">
                                    <div className="text-left md:text-right">
                                        <div className="font-satoshi text-[15px] font-bold text-graphite">
                                            382 Clicks
                                        </div>
                                        <div className="text-[10px] font-medium text-slate">
                                            Recorded Today
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Badge variant="warning">
                                            Expires Soon
                                        </Badge>
                                        <button
                                            onClick={() => handleCopy('x7Y9k2L', 1)}
                                            className="flex size-7 items-center justify-center rounded border border-neutral-200/60 bg-white text-slate shadow-none transition-all hover:bg-neutral-50 hover:text-vivid-indigo"
                                        >
                                            {copiedIndex === 1 ? (
                                                <Check className="size-3 text-emerald-600" />
                                            ) : (
                                                <Copy className="size-3" />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </PageContainer>
            </section>

            {/* 2. Social Proof Section */}
            <section className="border-t border-neutral-100 bg-neutral-50/30 py-6">
                <PageContainer className="flex flex-col items-center gap-4 py-0 md:py-0">
                    <p className="text-[10px] font-bold tracking-widest text-slate/50 uppercase">
                        Trusted by builders at modern organizations
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-8 opacity-30 grayscale transition-opacity hover:opacity-50 md:gap-12">
                        {['ACME LABS', 'INITECH', 'HOOLI', 'VEHEMENT', 'UMBRELLA'].map((name) => (
                            <span
                                key={name}
                                className="font-satoshi text-[16px] font-bold tracking-tighter text-graphite"
                            >
                                {name}
                            </span>
                        ))}
                    </div>
                </PageContainer>
            </section>

            {/* 3. Features Section */}
            <section
                id="features"
                className="border-t border-b border-neutral-100 bg-white py-16 md:py-20"
            >
                <PageContainer className="flex flex-col gap-10">
                    <div className="flex flex-col gap-2">
                        <Badge
                            variant="eyebrow"
                            className="w-fit bg-pale-lilac text-vivid-indigo"
                        >
                            Core Capabilities
                        </Badge>
                        <h2 className="mt-1 font-satoshi text-[1.75rem] font-bold tracking-tight text-graphite md:text-[2rem]">
                            Focusing strictly on performance &amp; precision
                        </h2>
                        <p className="max-w-xl text-[14px] leading-relaxed text-slate">
                            No subscription walls or bloated packages. Just raw
                            redirect speed combined with the essential features
                            you expect.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <Card className="flex flex-col gap-0 rounded-xl border border-neutral-200/70 bg-white p-5 shadow-none transition-all duration-200 hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-sm">
                            <CardHeader className="flex flex-col gap-3 p-0">
                                <div className="flex size-10 items-center justify-center rounded-lg bg-pale-lilac/60 text-vivid-indigo">
                                    <LinkIcon className="size-5 stroke-[1.5]" />
                                </div>
                                <CardTitle className="text-[15px] font-bold text-graphite">
                                    Custom Aliases
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="mt-2 p-0">
                                <p className="text-[13px] leading-relaxed text-slate">
                                    Define clean, memorable brand shortcodes. We
                                    enforce strict reserved routing rules to
                                    prevent users from overriding dashboard
                                    URLs.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="flex flex-col gap-0 rounded-xl border border-neutral-200/70 bg-white p-5 shadow-none transition-all duration-200 hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-sm">
                            <CardHeader className="flex flex-col gap-3 p-0">
                                <div className="flex size-10 items-center justify-center rounded-lg bg-pale-lilac/60 text-vivid-indigo">
                                    <Clock className="size-5 stroke-[1.5]" />
                                </div>
                                <CardTitle className="text-[15px] font-bold text-graphite">
                                    Scheduled Expirations
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="mt-2 p-0">
                                <p className="text-[13px] leading-relaxed text-slate">
                                    Configure precise campaign durations.
                                    Expired links are automatically evicted from
                                    Redis and return immediate 404s.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="flex flex-col gap-0 rounded-xl border border-neutral-200/70 bg-white p-5 shadow-none transition-all duration-200 hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-sm">
                            <CardHeader className="flex flex-col gap-3 p-0">
                                <div className="flex size-10 items-center justify-center rounded-lg bg-pale-lilac/60 text-vivid-indigo">
                                    <BarChart3 className="size-5 stroke-[1.5]" />
                                </div>
                                <CardTitle className="text-[15px] font-bold text-graphite">
                                    Async Analytics
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="mt-2 p-0">
                                <p className="text-[13px] leading-relaxed text-slate">
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
            <section className="bg-frost-gray/20 py-16 md:py-20">
                <PageContainer className="flex flex-col gap-10">
                    <div className="flex flex-col items-center gap-2 text-center">
                        <Badge
                            variant="eyebrow"
                            className="bg-pale-lilac text-vivid-indigo"
                        >
                            The Redirection Flow
                        </Badge>
                        <h2 className="mt-1 font-satoshi text-[1.75rem] font-bold tracking-tight text-graphite md:text-[2rem]">
                            Three simple steps to high-performance links
                        </h2>
                        <p className="max-w-md text-[14px] leading-relaxed text-slate">
                            Simple to operate, reliable under heavy traffic.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 text-center md:grid-cols-3">
                        {[
                            {
                                step: '01',
                                title: 'Generate',
                                desc: 'Input your long target URL, choose a custom alias path, and configure an optional expiry window.',
                            },
                            {
                                step: '02',
                                title: 'Share',
                                desc: 'Distribute your singkat.saja Base62 path. Clicks are resolved from the Redis cache in single-digit milliseconds.',
                            },
                            {
                                step: '03',
                                title: 'Monitor',
                                desc: 'Track trends, devices, browsers, and location dimensions inside a polished analytics dashboard.',
                            },
                        ].map(({ step, title, desc }) => (
                            <div key={step} className="flex flex-col items-center gap-3">
                                <div className="flex size-12 items-center justify-center rounded-full border border-neutral-200/80 bg-white font-satoshi text-[15px] font-bold text-graphite shadow-none">
                                    {step}
                                </div>
                                <h3 className="text-[15px] font-bold text-graphite">
                                    {title}
                                </h3>
                                <p className="max-w-xs text-[13px] leading-relaxed text-slate">
                                    {desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </PageContainer>
            </section>

            {/* 5. CTA Section */}
            <section className="relative overflow-hidden border-t border-neutral-100 bg-midnight-ink py-16 text-pure-white md:py-20">
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage:
                            'radial-gradient(var(--color-pure-white) 1px, transparent 1px)',
                        backgroundSize: '20px 20px',
                    }}
                />
                {/* Accent glow */}
                <div className="pointer-events-none absolute top-0 left-1/2 h-[300px] w-[600px] -translate-x-1/2 rounded-full bg-vivid-indigo/20 blur-[100px]" />

                <PageContainer className="relative z-10 flex flex-col items-center gap-5 text-center">
                    <span className="rounded-full border border-sunlit-yellow/30 px-3 py-1 text-[11px] font-bold tracking-widest text-sunlit-yellow uppercase">
                        Get Started Immediately
                    </span>
                    <h2 className="max-w-md font-satoshi text-[2rem] font-bold leading-tight tracking-tight md:text-[2.5rem]">
                        Clean short links, ready in seconds.
                    </h2>
                    <p className="max-w-sm text-[14px] leading-relaxed text-soft-violet">
                        Create your account today. No credit cards, no
                        subscriptions, no bloat.
                    </p>
                    <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
                        {auth?.user ? (
                            <Button
                                asChild
                                size="lg"
                                className="h-11 rounded-lg bg-vivid-indigo px-7 text-[14px] font-medium text-pure-white shadow-sm transition-all hover:scale-[1.02] hover:bg-vivid-indigo/90"
                            >
                                <Link href={dashboard()}>Go to Dashboard</Link>
                            </Button>
                        ) : (
                            <>
                                <Button
                                    asChild
                                    size="lg"
                                    className="h-11 rounded-lg bg-vivid-indigo px-7 text-[14px] font-medium text-pure-white shadow-sm transition-all hover:scale-[1.02] hover:bg-vivid-indigo/90"
                                >
                                    <Link href={register()}>
                                        Create Free Account
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    size="lg"
                                    variant="ghost"
                                    className="h-11 rounded-lg border border-pure-white/20 px-7 text-[14px] font-medium text-pure-white hover:bg-pure-white/10"
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
