import { Link, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    BarChart3,
    Zap,
    Globe,
    Shield,
    Clock,
    CheckCircle2,
} from 'lucide-react';
import { SEO } from '@/components/seo';
import { Button } from '@/components/ui/button';
import { PublicLayout } from '@/layouts/public-layout';
import { dashboard, register, login } from '@/routes';

export default function Welcome() {
    const { auth } = usePage().props as any;

    return (
        <PublicLayout>
            <SEO />

            {/* 1. Hero Section */}
            <section className="relative flex w-full flex-col items-center justify-center overflow-hidden border-b border-border/40 bg-background pt-32 pb-24 text-center">
                {/* Background Grid Pattern */}
                <div 
                    className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
                    style={{
                        backgroundImage: 'linear-gradient(to right, var(--color-foreground) 1px, transparent 1px), linear-gradient(to bottom, var(--color-foreground) 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }}
                />
                
                {/* Subtle Glow */}
                <div className="pointer-events-none absolute top-1/2 left-1/2 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[100px]" />

                <div className="relative z-10 flex max-w-4xl flex-col items-center gap-6 px-6">
                    <div className="inline-flex items-center rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs font-medium text-secondary-foreground backdrop-blur-sm">
                        <span className="flex h-2 w-2 rounded-full bg-emerald-500 mr-2"></span>
                        SingkatSaja is now generally available
                    </div>
                    
                    <h1 className="text-balance text-5xl font-bold tracking-tight text-foreground sm:text-7xl">
                        The URL shortener for <br />
                        <span className="text-muted-foreground">modern teams.</span>
                    </h1>
                    
                    <p className="max-w-2xl text-balance text-lg text-muted-foreground sm:text-xl">
                        Create memorable short links instantly. Monitor real-time performance with millisecond redirect speeds backed by Redis.
                    </p>

                    <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row">
                        {auth?.user ? (
                            <Button asChild size="lg" className="h-12 rounded-full px-8 text-sm font-medium">
                                <Link href={dashboard()}>
                                    Go to Dashboard
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        ) : (
                            <>
                                <Button asChild size="lg" className="h-12 rounded-full px-8 text-sm font-medium">
                                    <Link href={register()}>Start for free</Link>
                                </Button>
                                <Button asChild size="lg" variant="outline" className="h-12 rounded-full px-8 text-sm font-medium border-border/60">
                                    <Link href={login()}>Sign In</Link>
                                </Button>
                            </>
                        )}
                    </div>
                </div>

                {/* Dashboard Mockup Outline */}
                <div className="relative z-10 mt-20 w-full max-w-5xl px-6">
                    <div className="overflow-hidden rounded-xl border border-border/50 bg-card shadow-2xl">
                        <div className="flex items-center gap-2 border-b border-border/50 bg-secondary/30 px-4 py-3">
                            <div className="flex gap-1.5">
                                <div className="h-3 w-3 rounded-full bg-destructive/80" />
                                <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                                <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                            </div>
                            <div className="mx-auto flex h-6 w-64 items-center justify-center rounded bg-background text-[10px] text-muted-foreground shadow-sm">
                                shortcut.singkatsaja.com
                            </div>
                        </div>
                        <div className="flex gap-6 p-6">
                            {/* Mock Sidebar */}
                            <div className="hidden w-48 flex-col gap-2 sm:flex">
                                <div className="h-8 w-full rounded bg-secondary/50" />
                                <div className="h-8 w-full rounded bg-secondary/20" />
                                <div className="h-8 w-full rounded bg-secondary/20" />
                            </div>
                            {/* Mock Content */}
                            <div className="flex flex-1 flex-col gap-6">
                                <div className="flex items-center justify-between">
                                    <div className="h-8 w-32 rounded bg-secondary" />
                                    <div className="h-8 w-24 rounded bg-primary" />
                                </div>
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                                    <div className="h-24 rounded-lg border border-border/50 bg-secondary/10" />
                                    <div className="h-24 rounded-lg border border-border/50 bg-secondary/10" />
                                    <div className="h-24 rounded-lg border border-border/50 bg-secondary/10" />
                                </div>
                                <div className="h-64 rounded-lg border border-border/50 bg-secondary/10" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Social Proof */}
            <section className="w-full border-b border-border/40 bg-background py-12">
                <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-6">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Trusted by innovative teams worldwide
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 opacity-40 grayscale">
                        {['VERCEL', 'STRIPE', 'LINEAR', 'RESEND', 'NOTION'].map((name) => (
                            <span key={name} className="text-xl font-bold tracking-tighter text-foreground">
                                {name}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. Features Grid */}
            <section className="w-full bg-background py-24 sm:py-32">
                <div className="mx-auto max-w-5xl px-6">
                    <div className="mb-16 max-w-2xl">
                        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                            Everything you need to manage links at scale.
                        </h2>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Built for performance and reliability from day one.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {[
                            {
                                icon: Zap,
                                title: "Redis-Powered",
                                desc: "Redirects happen in single-digit milliseconds entirely from memory."
                            },
                            {
                                icon: Globe,
                                title: "Custom Aliases",
                                desc: "Create memorable branded shortcodes for your important campaigns."
                            },
                            {
                                icon: BarChart3,
                                title: "Async Analytics",
                                desc: "Track every click without slowing down the redirect experience."
                            },
                            {
                                icon: Clock,
                                title: "Scheduled Expirations",
                                desc: "Automatically sunset links when campaigns end."
                            },
                            {
                                icon: Shield,
                                title: "Secure by Default",
                                desc: "Protected against abuse with built-in rate limiting."
                            },
                            {
                                icon: CheckCircle2,
                                title: "Developer Ready",
                                desc: "Clean architecture built on Laravel and modern React."
                            }
                        ].map((feature, i) => (
                            <div key={i} className="flex flex-col gap-3 rounded-xl border border-border/40 bg-card p-6 shadow-sm transition-all hover:border-border">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-foreground">
                                    <feature.icon className="h-5 w-5" />
                                </div>
                                <h3 className="text-base font-semibold text-foreground">{feature.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 4. CTA */}
            <section className="relative w-full overflow-hidden border-t border-border/40 bg-foreground py-24 text-background sm:py-32">
                {/* Inverse Glow */}
                <div className="pointer-events-none absolute top-1/2 left-1/2 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-background/5 blur-[100px]" />
                
                <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-8 px-6 text-center">
                    <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                        Ready to shorten your first link?
                    </h2>
                    <p className="text-lg text-muted">
                        Join thousands of developers and teams building better routing experiences.
                    </p>
                    <Button asChild size="lg" variant="secondary" className="mt-4 h-12 rounded-full px-8 text-sm font-medium">
                        <Link href={register()}>Create your free account</Link>
                    </Button>
                </div>
            </section>
        </PublicLayout>
    );
}
