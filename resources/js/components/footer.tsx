import { Link } from '@inertiajs/react';
import * as React from 'react';
import AppLogo from '@/components/app-logo';
import { dashboard } from '@/routes';

export function Footer() {
    return (
        <footer className="border-t border-slate/10 bg-midnight-ink py-32 text-pure-white md:py-48">
            <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-32 px-16 md:flex-row md:items-center md:px-32">
                <div className="flex flex-col gap-12">
                    <Link href="/" className="inline-block">
                        <AppLogo className="text-pure-white" />
                    </Link>
                    <p className="max-w-sm text-caption leading-relaxed text-soft-violet">
                        Quiet, high-key canvas URL shortening interrupted by a
                        single confident violet stroke.
                    </p>
                </div>

                <div className="flex flex-wrap gap-32 text-caption text-soft-violet">
                    <div className="flex flex-col gap-8">
                        <span className="text-[11px] font-bold tracking-tight text-pure-white uppercase">
                            Product
                        </span>
                        <Link
                            href="/"
                            className="transition-colors hover:text-pure-white"
                        >
                            Features
                        </Link>
                        <Link
                            href={dashboard()}
                            className="transition-colors hover:text-pure-white"
                        >
                            Dashboard
                        </Link>
                    </div>
                    <div className="flex flex-col gap-8">
                        <span className="text-[11px] font-bold tracking-tight text-pure-white uppercase">
                            Resources
                        </span>
                        <a
                            href="https://laravel.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-colors hover:text-pure-white"
                        >
                            Laravel
                        </a>
                        <a
                            href="https://inertiajs.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-colors hover:text-pure-white"
                        >
                            Inertia.js
                        </a>
                    </div>
                    <div className="flex flex-col gap-8">
                        <span className="text-[11px] font-bold tracking-tight text-pure-white uppercase">
                            Legal
                        </span>
                        <Link
                            href="#"
                            className="transition-colors hover:text-pure-white"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            href="#"
                            className="transition-colors hover:text-pure-white"
                        >
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>

            <div className="mx-auto mt-32 max-w-[1200px] border-t border-slate/10 px-16 pt-20 text-center text-caption text-soft-violet md:px-32 md:text-left">
                &copy; {new Date().getFullYear()} SingkatSaja. Built with
                precision and restraint.
            </div>
        </footer>
    );
}
