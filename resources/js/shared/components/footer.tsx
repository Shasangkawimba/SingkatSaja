import { Link } from '@inertiajs/react';
import * as React from 'react';
import { dashboard } from '@/generated/routes';
import AppLogo from '@/shared/components/app-logo';

export function Footer() {
    return (
        <footer className="w-full border-t border-border/40 bg-background py-16 text-foreground sm:py-24">
            <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-12 px-6 sm:flex-row">
                <div className="flex flex-col gap-6">
                    <Link href="/" className="inline-block transition-opacity hover:opacity-80">
                        <AppLogo />
                    </Link>
                    <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                        High-performance URL routing and analytics. Built for developers.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-12 sm:grid-cols-3">
                    <div className="flex flex-col gap-4 text-sm text-muted-foreground">
                        <span className="font-semibold text-foreground">
                            Product
                        </span>
                        <Link href="/" className="transition-colors hover:text-foreground">
                            Features
                        </Link>
                        <Link href={dashboard()} className="transition-colors hover:text-foreground">
                            Dashboard
                        </Link>
                    </div>
                    <div className="flex flex-col gap-4 text-sm text-muted-foreground">
                        <span className="font-semibold text-foreground">
                            Resources
                        </span>
                        <a href="https://laravel.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground">
                            Laravel
                        </a>
                        <a href="https://inertiajs.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground">
                            Inertia.js
                        </a>
                    </div>
                    <div className="flex flex-col gap-4 text-sm text-muted-foreground">
                        <span className="font-semibold text-foreground">
                            Legal
                        </span>
                        <Link href="#" className="transition-colors hover:text-foreground">
                            Privacy Policy
                        </Link>
                        <Link href="#" className="transition-colors hover:text-foreground">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>

            <div className="mx-auto mt-16 max-w-5xl border-t border-border/40 px-6 pt-8 text-sm text-muted-foreground">
                &copy; {new Date().getFullYear()} SingkatSaja. All rights reserved.
            </div>
        </footer>
    );
}
