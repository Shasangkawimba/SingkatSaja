import { Link, usePage } from '@inertiajs/react';
import { LayoutGrid, LinkIcon, Clock, BarChart3, ArrowRight, Share2, Activity } from 'lucide-react';
import { PublicLayout } from '@/layouts/public-layout';
import { PageContainer } from '@/components/page-container';
import { SectionHeader } from '@/components/section-header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { dashboard, register, login } from '@/routes';
import { SEO } from '@/components/seo';

export default function Welcome() {
    const { auth } = usePage().props as any;

    return (
        <PublicLayout>
            <SEO />

            {/* 1. Hero Section */}
            <section className="relative overflow-hidden pt-40 pb-48 md:pt-48 md:pb-76 bg-pure-white">
                <PageContainer className="flex flex-col items-center text-center gap-32">
                    <SectionHeader
                        eyebrow="SingkatSaja Redirection"
                        title="URL Shortening Built for Precision & Speed"
                        description="Create short, high-performance link aliases in milliseconds. Backed by Redis-first lookups and non-blocking asynchronous analytics."
                        align="center"
                        isHero={true}
                        actions={
                            <>
                                {auth?.user ? (
                                    <Button asChild size="lg" className="bg-vivid-indigo hover:bg-vivid-indigo/90 text-pure-white">
                                        <Link href={dashboard()}>
                                            Go to Dashboard <ArrowRight className="size-16 ml-8" />
                                        </Link>
                                    </Button>
                                ) : (
                                    <>
                                        <Button asChild size="lg" className="bg-vivid-indigo hover:bg-vivid-indigo/90 text-pure-white">
                                            <Link href={register()}>
                                                Get Started — It's Free
                                            </Link>
                                        </Button>
                                        <Button asChild size="lg" variant="ghost" className="border border-graphite text-graphite hover:bg-frost-gray">
                                            <a href="#features">
                                                Explore Features
                                            </a>
                                        </Button>
                                    </>
                                )}
                            </>
                        }
                    />

                    {/* Interactive App Mockup Preview */}
                    <div className="w-full max-w-4xl mt-32 border border-slate/30 rounded-largecards bg-pure-white p-16 md:p-32 shadow-md">
                        <div className="flex items-center justify-between pb-16 border-b border-slate/10 mb-20 text-left">
                            <div className="flex items-center gap-12">
                                <div className="size-12 rounded-full bg-red-400" />
                                <div className="size-12 rounded-full bg-yellow-400" />
                                <div className="size-12 rounded-full bg-green-400" />
                                <span className="text-caption text-slate font-medium ml-8">shortcut.singkatsaja.com</span>
                            </div>
                            <Badge variant="success">Active REDIS Engine</Badge>
                        </div>
                        <div className="flex flex-col gap-16 text-left">
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-16 border border-slate/20 rounded-cards bg-frost-gray gap-12">
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-8">
                                        <span className="font-bold text-graphite">singkat.saja/promo-2026</span>
                                        <Badge variant="eyebrow">Custom Alias</Badge>
                                    </div>
                                    <span className="text-caption text-slate truncate max-w-md">https://ecommerce.com/campaign/summer-promo-discount-page</span>
                                </div>
                                <div className="flex items-center gap-20">
                                    <div className="text-right">
                                        <div className="font-bold text-graphite">1,482 clicks</div>
                                        <div className="text-caption text-slate">today</div>
                                    </div>
                                    <Badge variant="success">Active</Badge>
                                </div>
                            </div>
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between p-16 border border-slate/20 rounded-cards bg-pure-white gap-12">
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center gap-8">
                                        <span className="font-bold text-graphite">singkat.saja/x7Y9k2L</span>
                                        <Badge variant="eyebrow">Random Base62</Badge>
                                    </div>
                                    <span className="text-caption text-slate truncate max-w-md">https://github.com/Shasangkawimba/SingkatSaja</span>
                                </div>
                                <div className="flex items-center gap-20">
                                    <div className="text-right">
                                        <div className="font-bold text-graphite">382 clicks</div>
                                        <div className="text-caption text-slate">today</div>
                                    </div>
                                    <Badge variant="warning">Expires Soon</Badge>
                                </div>
                            </div>
                        </div>
                    </div>
                </PageContainer>
            </section>

            {/* 2. Features Section */}
            <section id="features" className="py-48 md:py-76 bg-frost-gray/50 border-t border-b border-slate/10">
                <PageContainer className="flex flex-col gap-48">
                    <SectionHeader
                        eyebrow="Core Engine"
                        title="Focusing strictly on performance and precision"
                        description="No bloat, no subscription walls. Just raw redirection speed combined with the essential controls you expect."
                        align="left"
                    />

                    <div className="grid gap-20 grid-cols-1 md:grid-cols-3">
                        <Card className="border border-slate/20 bg-pure-white p-20 flex flex-col justify-between">
                            <CardHeader className="p-0 flex flex-col gap-16">
                                <div className="size-40 rounded-lg bg-pale-lilac flex items-center justify-center text-vivid-indigo">
                                    <LinkIcon className="size-20 stroke-[1.5]" />
                                </div>
                                <CardTitle className="text-heading-sm font-bold text-graphite">Custom Aliases</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0 mt-8">
                                <p className="text-body text-slate leading-relaxed">
                                    Define clean brand shortcodes. Enforces strict reserved routing rules so users cannot grab system dashboard URLs as aliases.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border border-slate/20 bg-pure-white p-20 flex flex-col justify-between">
                            <CardHeader className="p-0 flex flex-col gap-16">
                                <div className="size-40 rounded-lg bg-pale-lilac flex items-center justify-center text-vivid-indigo">
                                    <Clock className="size-20 stroke-[1.5]" />
                                </div>
                                <CardTitle className="text-heading-sm font-bold text-graphite">Expiration Dates</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0 mt-8">
                                <p className="text-body text-slate leading-relaxed">
                                    Configure access schedules. Links automatically expire and trigger instant cache eviction in Redis, rejecting dead redirects.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border border-slate/20 bg-pure-white p-20 flex flex-col justify-between">
                            <CardHeader className="p-0 flex flex-col gap-16">
                                <div className="size-40 rounded-lg bg-pale-lilac flex items-center justify-center text-vivid-indigo">
                                    <BarChart3 className="size-20 stroke-[1.5]" />
                                </div>
                                <CardTitle className="text-heading-sm font-bold text-graphite">Async Analytics</CardTitle>
                            </CardHeader>
                            <CardContent className="p-0 mt-8">
                                <p className="text-body text-slate leading-relaxed">
                                    Non-blocking queue workers parse dimensions asynchronously. Updates dashboard aggregation queries without pausing client redirection.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </PageContainer>
            </section>

            {/* 3. How It Works Section */}
            <section className="py-48 md:py-76 bg-pure-white">
                <PageContainer className="flex flex-col gap-48">
                    <SectionHeader
                        eyebrow="Redirection Flow"
                        title="Three steps to short links"
                        description="Simple to operate, reliable under traffic."
                        align="center"
                    />

                    <div className="grid gap-32 grid-cols-1 md:grid-cols-3 mt-16 text-center">
                        <div className="flex flex-col items-center gap-16">
                            <div className="size-48 rounded-full border border-slate/30 flex items-center justify-center font-bold text-graphite bg-frost-gray text-heading-sm">
                                01
                            </div>
                            <h3 className="text-heading-sm font-bold text-graphite">Create</h3>
                            <p className="text-body text-slate max-w-xs leading-relaxed">
                                Input destination URL, select an optional custom alias, and configure link exspiries.
                            </p>
                        </div>

                        <div className="flex flex-col items-center gap-16">
                            <div className="size-48 rounded-full border border-slate/30 flex items-center justify-center font-bold text-graphite bg-frost-gray text-heading-sm">
                                02
                            </div>
                            <h3 className="text-heading-sm font-bold text-graphite">Share</h3>
                            <p className="text-body text-slate max-w-xs leading-relaxed">
                                Get your Base62 link. Requests resolve straight from the Redis cache in single-digit milliseconds.
                            </p>
                        </div>

                        <div className="flex flex-col items-center gap-16">
                            <div className="size-48 rounded-full border border-slate/30 flex items-center justify-center font-bold text-graphite bg-frost-gray text-heading-sm">
                                03
                            </div>
                            <h3 className="text-heading-sm font-bold text-graphite">Track</h3>
                            <p className="text-body text-slate max-w-xs leading-relaxed">
                                Inspect clean charts detailing click distributions across browsers, devices, and platforms.
                            </p>
                        </div>
                    </div>
                </PageContainer>
            </section>

            {/* 4. CTA Section */}
            <section className="py-48 md:py-76 bg-midnight-ink text-pure-white border-t border-slate/10 relative overflow-hidden">
                <div 
                    className="absolute inset-0 pointer-events-none opacity-[0.05]"
                    style={{
                        backgroundImage: "radial-gradient(var(--color-pure-white) 1px, transparent 1px)",
                        backgroundSize: "16px 16px"
                    }}
                />
                <PageContainer className="relative z-10 flex flex-col items-center text-center gap-24">
                    <span className="font-bold text-sunlit-yellow uppercase tracking-tight text-[11px] px-12 py-4 border border-sunlit-yellow/30 rounded-pills">
                        Get Started Immediately
                    </span>
                    <h2 className="text-heading-lg font-bold leading-tight tracking-[-0.02em] max-w-xl">
                        Clean short links, ready in seconds.
                    </h2>
                    <p className="text-body text-soft-violet max-w-md leading-relaxed">
                        Create your account today. No credit cards, no subscriptions, no bloat.
                    </p>
                    <div className="flex flex-wrap gap-16 justify-center items-center mt-8">
                        {auth?.user ? (
                            <Button asChild size="lg" className="bg-vivid-indigo hover:bg-vivid-indigo/90 text-pure-white">
                                <Link href={dashboard()}>
                                    Go to Dashboard
                                </Link>
                            </Button>
                        ) : (
                            <>
                                <Button asChild size="lg" className="bg-vivid-indigo hover:bg-vivid-indigo/90 text-pure-white">
                                    <Link href={register()}>
                                        Create Free Account
                                    </Link>
                                </Button>
                                <Button asChild size="lg" variant="ghost" className="border border-pure-white text-pure-white hover:bg-pure-white/10">
                                    <Link href={login()}>
                                        Log In
                                    </Link>
                                </Button>
                            </>
                        )}
                    </div>
                </PageContainer>
            </section>
        </PublicLayout>
    );
}
