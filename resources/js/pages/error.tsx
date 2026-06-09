import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { ShieldAlert, AlertCircle, Ban, Hourglass, HelpCircle, Server, Wrench } from 'lucide-react';
import { PublicLayout } from '@/layouts/public-layout';
import { PageContainer } from '@/components/page-container';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ErrorProps {
    status: number;
}

export default function Error({ status }: ErrorProps) {
    const { auth } = usePage().props as any;
    const isAuthenticated = !!auth?.user;

    const errorDetails = (code: number) => {
        switch (code) {
            case 401:
                return {
                    eyebrow: '401 Unauthorized',
                    title: 'Authentication Required',
                    description: 'You must be signed in to view this dashboard page or manage links.',
                    icon: <ShieldAlert className="size-32 text-red-600" />,
                    action: (
                        <Button asChild className="bg-vivid-indigo hover:bg-vivid-indigo/90 text-pure-white font-medium">
                            <Link href="/login">Log In to Account</Link>
                        </Button>
                    ),
                };
            case 403:
                return {
                    eyebrow: '403 Forbidden',
                    title: 'Access Prohibited',
                    description: "You do not have authorization permissions to access this specific link resources.",
                    icon: <Ban className="size-32 text-red-600" />,
                    action: isAuthenticated ? (
                        <Button asChild className="bg-vivid-indigo hover:bg-vivid-indigo/90 text-pure-white font-medium">
                            <Link href="/dashboard">Return to Dashboard</Link>
                        </Button>
                    ) : (
                        <Button asChild className="bg-vivid-indigo hover:bg-vivid-indigo/90 text-pure-white font-medium">
                            <Link href="/">Return Home</Link>
                        </Button>
                    ),
                };
            case 404:
                return {
                    eyebrow: '404 Not Found',
                    title: 'Page or Link Not Found',
                    description: 'The shortcode link might be expired, deleted, or the URL path does not exist.',
                    icon: <HelpCircle className="size-32 text-slate" />,
                    action: isAuthenticated ? (
                        <Button asChild className="bg-vivid-indigo hover:bg-vivid-indigo/90 text-pure-white font-medium">
                            <Link href="/dashboard">Return to Dashboard</Link>
                        </Button>
                    ) : (
                        <Button asChild className="bg-vivid-indigo hover:bg-vivid-indigo/90 text-pure-white font-medium">
                            <Link href="/">Return Home</Link>
                        </Button>
                    ),
                };
            case 419:
                return {
                    eyebrow: '419 Page Expired',
                    title: 'Security Session Expired',
                    description: 'The page security token expired due to inactivity. Please refresh the page and try again.',
                    icon: <Hourglass className="size-32 text-amber-600" />,
                    action: (
                        <Button onClick={() => window.location.reload()} className="bg-vivid-indigo hover:bg-vivid-indigo/90 text-pure-white font-medium">
                            Refresh Page
                        </Button>
                    ),
                };
            case 429:
                return {
                    eyebrow: '429 Rate Limited',
                    title: 'Too Many Requests',
                    description: 'You have generated too many operations in a short period. Please wait a moment before trying again.',
                    icon: <AlertCircle className="size-32 text-amber-600" />,
                    action: (
                        <Button onClick={() => window.location.reload()} className="bg-vivid-indigo hover:bg-vivid-indigo/90 text-pure-white font-medium">
                            Try Again
                        </Button>
                    ),
                };
            case 503:
                return {
                    eyebrow: '503 Maintenance',
                    title: 'Service Temporarily Unavailable',
                    description: 'SingkatSaja is undergoing server maintenance. We will be back online shortly.',
                    icon: <Wrench className="size-32 text-vivid-indigo" />,
                    action: (
                        <Button onClick={() => window.location.reload()} className="bg-vivid-indigo hover:bg-vivid-indigo/90 text-pure-white font-medium">
                            Check Again
                        </Button>
                    ),
                };
            case 500:
            default:
                return {
                    eyebrow: '500 Server Error',
                    title: 'Internal Server Error',
                    description: 'An unexpected database or application error occurred on our servers. We are investigating the issue.',
                    icon: <Server className="size-32 text-red-600" />,
                    action: isAuthenticated ? (
                        <Button asChild className="bg-vivid-indigo hover:bg-vivid-indigo/90 text-pure-white font-medium">
                            <Link href="/dashboard">Return to Dashboard</Link>
                        </Button>
                    ) : (
                        <Button asChild className="bg-vivid-indigo hover:bg-vivid-indigo/90 text-pure-white font-medium">
                            <Link href="/">Return Home</Link>
                        </Button>
                    ),
                };
        }
    };

    const details = errorDetails(status);

    return (
        <PublicLayout>
            <Head title={`Error ${status} — SingkatSaja`} />

            <section className="py-76 bg-pure-white flex items-center justify-center min-h-[70vh]">
                <PageContainer className="flex items-center justify-center">
                    <Card className="max-w-md w-full border border-slate/30 bg-pure-white p-32 md:p-40 text-center flex flex-col items-center gap-24">
                        <div className="size-64 rounded-full bg-frost-gray flex items-center justify-center mb-8">
                            {details.icon}
                        </div>

                        <Badge variant="eyebrow" className="px-16 py-4">
                            {details.eyebrow}
                        </Badge>

                        <div className="flex flex-col gap-12">
                            <h1 className="text-heading font-bold text-graphite leading-tight tracking-[-0.02em]">
                                {details.title}
                            </h1>
                            <p className="text-body text-slate leading-relaxed">
                                {details.description}
                            </p>
                        </div>

                        <div className="flex gap-16 justify-center items-center pt-8 border-t border-slate/10 w-full mt-12">
                            {details.action}
                            <Button asChild variant="ghost" className="border border-slate/30 text-graphite hover:bg-frost-gray font-medium">
                                <Link href="/">Go to Homepage</Link>
                            </Button>
                        </div>
                    </Card>
                </PageContainer>
            </section>
        </PublicLayout>
    );
}
