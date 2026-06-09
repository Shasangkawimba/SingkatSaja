import { Link } from '@inertiajs/react';
import AppLogoIcon from '@/components/app-logo-icon';
import { Card, CardContent } from '@/components/ui/card';
import { home } from '@/routes';
import type { AuthLayoutProps } from '@/types';

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    return (
        <div className="relative flex min-h-svh flex-col items-center justify-center gap-6 overflow-hidden bg-frost-gray/30 p-4 font-sans md:p-8">
            {/* Subtle Ambient Light Glow */}
            <div className="pointer-events-none absolute top-0 left-1/2 h-[250px] w-[500px] -translate-x-1/2 rounded-full bg-vivid-indigo/5 blur-[100px]" />

            {/* Dynamic Dot Grid Background */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.4]"
                style={{
                    backgroundImage:
                        'radial-gradient(var(--color-neutral-200) 1px, transparent 1px)',
                    backgroundSize: '16px 16px',
                }}
            />

            <div className="relative z-10 w-full max-w-md">
                <Card className="rounded-xl border border-neutral-200/80 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] md:p-8">
                    <CardContent className="flex flex-col gap-6 p-0">
                        <div className="flex flex-col items-center gap-4 border-b border-neutral-100 pb-5 text-center">
                            <Link
                                href={home()}
                                className="flex h-10 w-10 items-center justify-center rounded-lg bg-vivid-indigo text-white shadow-sm transition-transform hover:scale-[1.05]"
                            >
                                <AppLogoIcon className="size-5 fill-current text-white" />
                            </Link>

                            <div className="flex flex-col gap-1">
                                <h1 className="font-satoshi text-[18px] font-bold tracking-tight text-graphite">
                                    {title}
                                </h1>
                                <p className="max-w-xs text-[13px] leading-relaxed text-slate">
                                    {description}
                                </p>
                            </div>
                        </div>
                        {children}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
