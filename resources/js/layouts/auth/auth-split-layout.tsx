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
        <div className="flex min-h-screen w-full bg-background font-sans text-foreground">
            {/* Left Column: Branding (hidden on mobile) */}
            <div className="hidden w-1/2 flex-col justify-between border-r border-border/40 bg-muted/20 p-12 lg:flex xl:w-5/12">
                <div className="flex items-center">
                    <Link href={home()} className="transition-opacity hover:opacity-80">
                        <AppLogo />
                    </Link>
                </div>

                <div className="flex max-w-sm flex-col gap-8">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">
                            Build faster routing experiences.
                        </h1>
                        <p className="text-muted-foreground">
                            Join thousands of developers managing links with precision and scale.
                        </p>
                    </div>

                    <div className="flex flex-col gap-6">
                        <div className="flex items-start gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-card border border-border/50 text-foreground shadow-sm">
                                <Zap className="h-5 w-5" />
                            </div>
                            <div className="flex flex-col">
                                <h3 className="font-semibold text-foreground">Redis Powered</h3>
                                <p className="text-sm text-muted-foreground">Single-digit millisecond latency</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-card border border-border/50 text-foreground shadow-sm">
                                <BarChart3 className="h-5 w-5" />
                            </div>
                            <div className="flex flex-col">
                                <h3 className="font-semibold text-foreground">Async Analytics</h3>
                                <p className="text-sm text-muted-foreground">Queue-driven telemetry</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-card border border-border/50 text-foreground shadow-sm">
                                <Shield className="h-5 w-5" />
                            </div>
                            <div className="flex flex-col">
                                <h3 className="font-semibold text-foreground">Secure by Default</h3>
                                <p className="text-sm text-muted-foreground">Built-in rate limiting and abuse protection</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    Always free for developers.
                </div>
            </div>

            {/* Right Column: Form */}
            <div className="flex w-full flex-1 flex-col justify-center px-6 py-12 sm:px-12 lg:px-24">
                <div className="mx-auto flex w-full max-w-sm flex-col gap-6">
                    {/* Mobile Logo */}
                    <div className="flex items-center justify-center pb-6 lg:hidden">
                        <Link href={home()} className="transition-opacity hover:opacity-80">
                            <AppLogo />
                        </Link>
                    </div>

                    <div className="flex flex-col gap-1.5 text-center sm:text-left">
                        <h1 className="text-2xl font-bold tracking-tight text-foreground">
                            {title}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            {description}
                        </p>
                    </div>

                    <div className="mt-4">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
}
