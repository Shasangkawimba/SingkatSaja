import { Link, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    BarChart3,
    Zap,
    Globe,
    Shield,
    Clock,
    CheckCircle2,
    Link2,
    MousePointerClick,
    Activity
} from 'lucide-react';
import { SEO } from '@/shared/components/seo';
import { Button } from '@/shared/ui/button';
import { PublicLayout } from '@/shared/layouts/public-layout';
import { dashboard, register, login } from '@/generated/routes';

export default function Welcome() {
    const { auth } = usePage().props as any;

    return (
        <PublicLayout>
            <SEO />

            {/* 1. Hero Section */}
            <section className="relative flex w-full flex-col items-center justify-center pt-32 pb-24 text-center">
                <div className="relative z-10 flex max-w-5xl flex-col items-center gap-8 px-6">
                    <div className="inline-flex items-center rounded-full border border-white/20 bg-background/30 px-4 py-1.5 text-sm font-semibold text-foreground backdrop-blur-md shadow-sm">
                        <span className="flex h-2.5 w-2.5 rounded-full bg-blue-500 mr-2 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.8)]"></span>
                        SingkatSaja v1.0 Live
                    </div>
                    
                    <h1 className="text-balance text-6xl font-extrabold tracking-tight text-foreground sm:text-7xl lg:text-8xl mix-blend-normal">
                        Short links. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400 drop-shadow-sm">
                            Light speed.
                        </span>
                    </h1>
                    
                    <p className="max-w-2xl text-balance text-xl text-muted-foreground mt-4 sm:text-2xl font-medium">
                        Create memorable short links instantly. Monitor real-time performance with millisecond redirect speeds backed by Redis.
                    </p>

                    <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row">
                        {auth?.user ? (
                            <Button asChild size="lg" className="h-14 px-8 text-lg font-bold rounded-full shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all">
                                <Link href={dashboard()}>
                                    Go to Dashboard
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        ) : (
                            <>
                                <Button asChild size="lg" className="h-14 px-8 text-lg font-bold rounded-full shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all">
                                    <Link href={register()}>Start for free</Link>
                                </Button>
                                <Button asChild size="lg" variant="outline" className="h-14 px-8 text-lg font-bold rounded-full bg-background/30 backdrop-blur-md border-white/20 hover:bg-background/50">
                                    <Link href={login()}>Sign In</Link>
                                </Button>
                            </>
                        )}
                    </div>
                </div>

                {/* Dashboard Mockup Outline */}
                <div className="relative z-10 mt-24 w-full max-w-5xl px-6 perspective-[2000px]">
                    <div className="glass-panel rounded-3xl overflow-hidden ring-1 ring-white/20 transform transition-all duration-700 hover:rotate-x-2 hover:rotate-y-2 hover:scale-[1.02]">
                        <div className="flex items-center gap-4 border-b border-white/10 bg-black/5 dark:bg-white/5 backdrop-blur-md px-6 py-4">
                            <div className="flex gap-2.5">
                                <div className="h-3.5 w-3.5 rounded-full bg-red-500/90 shadow-sm" />
                                <div className="h-3.5 w-3.5 rounded-full bg-amber-500/90 shadow-sm" />
                                <div className="h-3.5 w-3.5 rounded-full bg-emerald-500/90 shadow-sm" />
                            </div>
                            <div className="mx-auto flex h-8 w-72 items-center justify-center rounded-lg bg-background/50 backdrop-blur-md border border-white/10 text-xs font-mono font-semibold text-muted-foreground shadow-inner">
                                GET /shortcut.singkatsaja.com
                            </div>
                        </div>
                        <div className="flex gap-8 p-8 bg-background/20">
                            {/* Mock Sidebar */}
                            <div className="hidden w-56 flex-col gap-4 sm:flex">
                                <div className="h-10 w-full rounded-xl bg-primary/20 backdrop-blur-md shadow-sm border border-white/10" />
                                <div className="h-10 w-full rounded-xl bg-background/40 backdrop-blur-md shadow-sm border border-white/5" />
                                <div className="h-10 w-full rounded-xl bg-background/40 backdrop-blur-md shadow-sm border border-white/5" />
                            </div>
                            {/* Mock Content */}
                            <div className="flex flex-1 flex-col gap-8">
                                <div className="flex items-center justify-between">
                                    <div className="h-10 w-56 rounded-xl bg-background/40 backdrop-blur-md border border-white/5 shadow-sm" />
                                    <div className="h-10 w-36 rounded-xl bg-primary/20 backdrop-blur-md border border-white/10 shadow-sm" />
                                </div>
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                                    <div className="h-32 rounded-2xl border border-white/10 bg-background/40 backdrop-blur-md p-5 flex flex-col justify-between shadow-sm hover:bg-background/60 transition-colors">
                                        <div className="flex justify-between items-center"><div className="h-5 w-24 rounded-md bg-muted/60"></div><Link2 className="h-5 w-5 text-muted-foreground"/></div>
                                        <div className="h-10 w-20 rounded-md bg-foreground/20"></div>
                                    </div>
                                    <div className="h-32 rounded-2xl border border-white/10 bg-background/40 backdrop-blur-md p-5 flex flex-col justify-between shadow-sm hover:bg-background/60 transition-colors">
                                        <div className="flex justify-between items-center"><div className="h-5 w-24 rounded-md bg-muted/60"></div><Activity className="h-5 w-5 text-muted-foreground"/></div>
                                        <div className="h-10 w-20 rounded-md bg-foreground/20"></div>
                                    </div>
                                    <div className="h-32 rounded-2xl border border-white/10 bg-background/40 backdrop-blur-md p-5 flex flex-col justify-between shadow-sm hover:bg-background/60 transition-colors">
                                        <div className="flex justify-between items-center"><div className="h-5 w-24 rounded-md bg-muted/60"></div><MousePointerClick className="h-5 w-5 text-muted-foreground"/></div>
                                        <div className="h-10 w-20 rounded-md bg-foreground/20"></div>
                                    </div>
                                </div>
                                <div className="h-56 rounded-2xl border border-white/10 bg-background/30 backdrop-blur-md shadow-sm" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. Features Grid */}
            <section className="w-full py-24 sm:py-32 relative z-10">
                <div className="mx-auto max-w-6xl px-6">
                    <div className="mb-20 max-w-3xl text-center mx-auto">
                        <h2 className="text-4xl font-extrabold tracking-tight text-foreground sm:text-6xl drop-shadow-sm">
                            Total Control. Zero Lag.
                        </h2>
                        <p className="mt-6 text-xl text-muted-foreground font-medium">
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
                            <div key={i} className="glass-panel group flex flex-col gap-4 rounded-3xl p-8 hover:-translate-y-1 transition-all duration-500">
                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-background/50 border border-white/10 text-primary shadow-inner group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-all duration-300 mb-2">
                                    <feature.icon className="h-6 w-6" />
                                </div>
                                <h3 className="text-xl font-bold text-foreground">{feature.title}</h3>
                                <p className="text-base text-muted-foreground leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. CTA */}
            <section className="relative w-full py-32 overflow-hidden z-10">
                <div className="absolute inset-0 z-0 bg-background/50 backdrop-blur-2xl border-t border-white/10"></div>
                
                <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-8 px-6 text-center">
                    <h2 className="text-5xl font-extrabold tracking-tight sm:text-7xl text-balance">
                        Start routing <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600 dark:from-blue-400 dark:to-violet-400 drop-shadow-sm">faster.</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl font-medium">
                        Join developers and teams building better routing experiences with SingkatSaja.
                    </p>
                    <Button asChild size="lg" className="mt-8 h-14 px-10 text-lg font-bold rounded-full shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all hover:-translate-y-1">
                        <Link href={register()}>Create free account</Link>
                    </Button>
                </div>
            </section>
        </PublicLayout>
    );
}
