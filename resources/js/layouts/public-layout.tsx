import { Link, usePage } from '@inertiajs/react';
import * as React from 'react';
import AppLogo from '@/components/app-logo';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { dashboard, login, register } from '@/routes';

export function PublicLayout({ children }: { children: React.ReactNode }) {
    const { auth } = usePage().props as any;

    return (
        <div className="flex min-h-screen flex-col bg-background font-sans text-foreground">
            {/* Top Header */}
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
                <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
                    <Link href="/" className="transition-opacity hover:opacity-80">
                        <AppLogo />
                    </Link>

                    <nav className="flex items-center gap-4">
                        {auth?.user ? (
                            <>
                                <Link
                                    href={dashboard()}
                                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    Dashboard
                                </Link>
                                <Button
                                    asChild
                                    variant="default"
                                    size="sm"
                                    className="h-8 rounded-md px-4 text-xs font-medium"
                                >
                                    <Link href={dashboard()}>Go to app</Link>
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    Log In
                                </Link>
                                <Button
                                    asChild
                                    variant="default"
                                    size="sm"
                                    className="h-8 rounded-md px-4 text-xs font-medium"
                                >
                                    <Link href={register()}>Sign Up</Link>
                                </Button>
                            </>
                        )}
                    </nav>
                </div>
            </header>

            {/* Main content */}
            <main className="relative flex w-full flex-1 flex-col items-center justify-center">
                {children}
            </main>

            <Footer />
        </div>
    );
}
