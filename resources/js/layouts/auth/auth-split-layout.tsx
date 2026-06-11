import { Link } from '@inertiajs/react';
import { Shield, Zap, BarChart3, CheckCircle2 } from 'lucide-react';
import * as React from 'react';
import AppLogo from '@/components/app-logo';
import { home } from '@/routes';

interface AuthSplitLayoutProps {
    title: string;
    description: string;
    children: React.ReactNode;
}

export function AuthSplitLayout({
    title,
    description,
    children,
}: AuthSplitLayoutProps) {
    return (
        <div className="flex min-h-screen w-full font-sans text-foreground relative z-0">
            {/* Base Aurora Background */}
            <div className="aurora-bg"></div>
            <div className="aurora-bg-3"></div>
            
            {/* Left Column: Branding (hidden on mobile) */}
            <div className="relative hidden w-1/2 flex-col justify-between p-12 lg:flex xl:w-5/12 overflow-hidden glass-panel border-l-0 border-y-0 rounded-none">
                <div className="relative z-10 flex items-center">
                    <Link href={home()} className="transition-transform hover:-translate-y-0.5 inline-block bg-white/30 dark:bg-black/30 backdrop-blur-xl p-3 rounded-2xl border shadow-sm">
                        <AppLogo />
                    </Link>
                </div>

                <div className="relative z-10 flex max-w-sm flex-col gap-10">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-5xl font-bold tracking-tight text-foreground text-balance leading-tight">
                            Build faster routing experiences.
                        </h1>
                        <p className="text-xl text-muted-foreground text-balance">
                            Join thousands of developers managing links with precision and scale.
                        </p>
                    </div>

                    <div className="flex flex-col gap-8">
                        <div className="flex items-start gap-4">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/30 dark:bg-black/30 backdrop-blur-md text-primary shadow-sm border border-white/40 dark:border-white/20">
                                <Zap className="h-6 w-6" />
                            </div>
                            <div className="flex flex-col gap-1 mt-1">
                                <h3 className="text-lg font-semibold text-foreground">Redis Powered</h3>
                                <p className="text-base text-muted-foreground font-medium">Single-digit millisecond latency</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/30 dark:bg-black/30 backdrop-blur-md text-primary shadow-sm border border-white/40 dark:border-white/20">
                                <BarChart3 className="h-6 w-6" />
                            </div>
                            <div className="flex flex-col gap-1 mt-1">
                                <h3 className="text-lg font-semibold text-foreground">Async Analytics</h3>
                                <p className="text-base text-muted-foreground font-medium">Queue-driven telemetry</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/30 dark:bg-black/30 backdrop-blur-md text-primary shadow-sm border border-white/40 dark:border-white/20">
                                <Shield className="h-6 w-6" />
                            </div>
                            <div className="flex flex-col gap-1 mt-1">
                                <h3 className="text-lg font-semibold text-foreground">Secure by Default</h3>
                                <p className="text-base text-muted-foreground font-medium">Built-in rate limiting protection</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative z-10 flex items-center gap-3 text-sm font-semibold text-foreground bg-white/40 dark:bg-black/40 backdrop-blur-xl border border-white/50 dark:border-white/20 rounded-full px-5 py-3 inline-flex w-fit shadow-sm">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    Always free for developers.
                </div>
            </div>

            {/* Right Column: Form */}
            <div className="flex w-full flex-1 flex-col justify-center px-6 py-12 sm:px-12 lg:px-24 relative z-10">
                {/* Mobile Logo */}
                <div className="absolute top-8 left-6 sm:left-12 lg:hidden">
                    <Link href={home()} className="bg-white/30 dark:bg-black/30 backdrop-blur-xl p-3 rounded-2xl border border-white/40 shadow-sm inline-block">
                        <AppLogo />
                    </Link>
                </div>

                <div className="mx-auto flex w-full max-w-md flex-col gap-8 glass-panel p-8 sm:p-10 rounded-3xl">
                    <div className="flex flex-col gap-2 text-center sm:text-left">
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">
                            {title}
                        </h1>
                        <p className="text-base font-medium text-muted-foreground">
                            {description}
                        </p>
                    </div>

                    <div className="mt-2">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
