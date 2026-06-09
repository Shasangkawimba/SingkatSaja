import { Link, usePage } from '@inertiajs/react';
import * as React from 'react';
import AppLogo from '@/components/app-logo';
import { Footer } from '@/components/footer';
import { Button } from '@/components/ui/button';
import { dashboard, login, register } from '@/routes';

export function PublicLayout({ children }: { children: React.ReactNode }) {
    const { auth } = usePage().props as any;

    return (
        <div className="flex min-h-screen flex-col bg-pure-white font-sans text-graphite">
            {/* Top Header */}
            <header className="sticky top-0 z-50 w-full border-b border-neutral-100/80 bg-pure-white/80 backdrop-blur-md">
                <div className="mx-auto flex h-56 max-w-[1200px] items-center justify-between px-16 md:px-32">
                    <Link href="/">
                        <AppLogo />
                    </Link>

                    <nav className="flex items-center gap-16">
                        {auth?.user ? (
                            <>
                                <Link
                                    href={dashboard()}
                                    className="text-body font-medium text-ash transition-colors hover:text-vivid-indigo"
                                >
                                    Dashboard
                                </Link>
                                <Button
                                    asChild
                                    variant="default"
                                    className="rounded-buttons bg-vivid-indigo px-16 py-8 text-caption font-medium text-pure-white hover:bg-vivid-indigo/90"
                                >
                                    <Link href={dashboard()}>Go to app</Link>
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                    className="text-body font-medium text-ash transition-colors hover:text-vivid-indigo"
                                >
                                    Log In
                                </Link>
                                <Button
                                    asChild
                                    variant="default"
                                    className="rounded-buttons bg-vivid-indigo px-16 py-8 text-caption font-medium text-pure-white hover:bg-vivid-indigo/90"
                                >
                                    <Link href={register()}>
                                        Get started — it's free
                                    </Link>
                                </Button>
                            </>
                        )}
                    </nav>
                </div>
            </header>

            {/* Main content with subtle dot grid background */}
            <main className="relative w-full flex-1 bg-pure-white">
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.4]"
                    style={{
                        backgroundImage:
                            'radial-gradient(var(--color-frost-gray) 1px, transparent 1px)',
                        backgroundSize: '16px 16px',
                    }}
                />
                <div className="relative z-10">{children}</div>
            </main>

            <Footer />
        </div>
    );
}
