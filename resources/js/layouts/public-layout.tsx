import { Link, usePage } from '@inertiajs/react';
import * as React from 'react';
import AppLogo from '@/components/app-logo';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { dashboard, login, register } from '@/routes';

export function PublicLayout({ children }: { children: React.ReactNode }) {
    const { auth } = usePage().props as any;

    return (
        <div className="flex min-h-screen flex-col font-sans text-foreground relative z-0">
            {/* Base Aurora Background */}
            <div className="aurora-bg"></div>
            <div className="aurora-bg-3"></div>

            {/* Top Header */}
            <header className="sticky top-4 z-50 mx-auto w-[calc(100%-2rem)] max-w-5xl md:mt-4">
                <div className="glass-panel flex h-16 items-center justify-between px-6 rounded-full border border-white/20 dark:border-white/10">
                    <Link href="/" className="transition-transform hover:scale-105">
                        <AppLogo />
                    </Link>

                    <nav className="flex items-center gap-4">
                        {auth?.user ? (
                            <>
                                <Link
                                    href={dashboard()}
                                    className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    Dashboard
                                </Link>
                                <Button
                                    asChild
                                    variant="default"
                                    size="sm"
                                    className="h-10 rounded-full px-5 text-sm font-semibold"
                                >
                                    <Link href={dashboard()}>Go to app</Link>
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    Log In
                                </Link>
                                <Button
                                    asChild
                                    variant="default"
                                    size="sm"
                                    className="h-10 rounded-full px-5 text-sm font-semibold shadow-md hover:shadow-lg transition-all"
                                >
                                    <Link href={register()}>Sign Up</Link>
                                </Button>
                            </>
                        )}
                    </nav>
                </div>
            </header>

            {/* Main content */}
            <main className="relative flex w-full flex-1 flex-col items-center justify-center mt-8">
                {children}
            </main>

            <Footer />
        </div>
    );
}
