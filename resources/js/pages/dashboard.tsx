import { Head, Link, useForm, usePage } from '@inertiajs/react';
import {
    Link2,
    Eye,
    ArrowRight,
    Activity,
    TrendingUp,
    Zap,
    Copy,
    Check,
    Clock,
    BarChart3
} from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { DashboardContainer } from '@/components/dashboard-container';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { dashboard } from '@/routes';
import links from '@/routes/links';
import type { DashboardProps } from '@/types/dashboard';

export default function Dashboard({ stats, recent_links }: DashboardProps) {
    const { auth } = usePage().props as any;
    const { data, setData, post, processing, errors, reset } = useForm({
        destination_url: '',
        short_code: '',
        expires_at: '',
    });

    const [copiedId, setCopiedId] = useState<number | null>(null);
    const [isMounted, setIsMounted] = useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/links', {
            onSuccess: () => {
                reset();
                toast.success('Short link generated successfully.');
            },
        });
    };

    const handleCopy = (code: string, id: number) => {
        const fullUrl = `${window.location.origin}/${code}`;
        navigator.clipboard.writeText(fullUrl);
        setCopiedId(id);
        toast.success('Copied to clipboard');
        setTimeout(() => setCopiedId(null), 2000);
    };

    const isLinkExpired = (expiresAt: string | null) => {
        if (!expiresAt) {
            return false;
        }

        return new Date(expiresAt) < new Date();
    };

    // Calculate a simple relative time for Last Activity (created_at)
    const timeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
        
        if (diffInSeconds < 60) {
            return 'Just now';
        }

        const diffInMinutes = Math.floor(diffInSeconds / 60);
        
        if (diffInMinutes < 60) {
            return `${diffInMinutes}m ago`;
        }

        const diffInHours = Math.floor(diffInMinutes / 60);
        
        if (diffInHours < 24) {
            return `${diffInHours}h ago`;
        }

        const diffInDays = Math.floor(diffInHours / 24);
        
        return `${diffInDays}d ago`;
    };

    return (
        <DashboardContainer title="" description="" className="relative z-10">
            <Head title="Dashboard" />

            <div className="flex flex-col gap-10 pb-12 pt-4">
                {/* Greeting Header */}
                <div className="flex flex-col gap-1.5 pl-1 mb-2">
                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
                        Good {isMounted ? (new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening') : 'day'}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">{auth.user?.name.split(' ')[0]}</span>
                    </h1>
                    <p className="text-muted-foreground text-sm sm:text-base font-medium">
                        Here's what's happening with your links today.
                    </p>
                </div>

                {/* Quick Shortener Card */}
                <Card className="border border-white/40 dark:border-white/10 glass-panel overflow-hidden">
                    <CardContent className="p-6 sm:p-8 flex flex-col gap-5">
                        <div className="flex items-center gap-2.5 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                            <Zap className="h-4.5 w-4.5 text-primary animate-pulse" />
                            Quick Shorten
                        </div>
                        
                        <form 
                            onSubmit={submit}
                            className="flex flex-col sm:flex-row gap-3 w-full items-stretch"
                        >
                            <div className="flex flex-1 items-center gap-3 rounded-xl border border-white/50 dark:border-white/10 bg-white/30 dark:bg-black/20 backdrop-blur-md px-4 py-2 transition-all focus-within:ring-2 focus-within:ring-primary/50">
                                <Link2 className="h-5 w-5 text-muted-foreground shrink-0" />
                                <Input
                                    type="url"
                                    placeholder="Paste your long URL here (e.g. https://example.com/some/long/path)"
                                    value={data.destination_url}
                                    onChange={(e) => setData('destination_url', e.target.value)}
                                    required
                                    className="h-10 border-0 bg-transparent pl-2.5 pr-0 shadow-none focus-visible:ring-0 text-base font-medium w-full placeholder:text-muted-foreground/60"
                                />
                            </div>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="h-14 sm:h-12 shrink-0 px-8 font-bold rounded-xl bg-vivid-indigo hover:bg-vivid-indigo/90 text-white shadow-sm transition-all"
                            >
                                {processing ? 'Shortening...' : 'Shorten URL'}
                            </Button>
                        </form>
                        {errors.destination_url && (
                            <InputError message={errors.destination_url} className="mt-1 text-sm font-medium" />
                        )}
                    </CardContent>
                </Card>

                {/* MIDDLE SECTION: KPI Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:grid-cols-4">
                    <Card className="hover:-translate-y-1 transition-transform duration-500 border border-white/40 dark:border-white/10">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Total Links</CardTitle>
                            <div className="p-2 rounded-full bg-primary/10 border border-primary/10 text-primary backdrop-blur-sm">
                                <Link2 className="h-5 w-5" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-extrabold tracking-tight text-foreground mt-2">
                                {stats.total_links}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="hover:-translate-y-1 transition-transform duration-500 relative overflow-hidden border border-white/40 dark:border-white/10">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Active Links</CardTitle>
                            <div className="p-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.2)] backdrop-blur-sm">
                                <Activity className="h-5 w-5" />
                            </div>
                        </CardHeader>
                        <CardContent className="flex items-baseline justify-between relative z-10">
                            <div className="text-4xl font-extrabold tracking-tight text-foreground mt-2">
                                {stats.active_links}
                            </div>
                            <Badge variant="secondary" className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 px-3 py-1 font-bold">
                                LIVE
                            </Badge>
                        </CardContent>
                    </Card>

                    <Card className="hover:-translate-y-1 transition-transform duration-500 border border-white/40 dark:border-white/10">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Total Clicks</CardTitle>
                            <div className="p-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 backdrop-blur-sm">
                                <Eye className="h-5 w-5" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-extrabold tracking-tight text-foreground mt-2">
                                {stats.total_clicks}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="hover:-translate-y-1 transition-transform duration-500 relative overflow-hidden border border-white/40 dark:border-white/10">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                            <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Clicks Today</CardTitle>
                            <div className="p-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 backdrop-blur-sm">
                                <TrendingUp className="h-5 w-5" />
                            </div>
                        </CardHeader>
                        <CardContent className="flex items-baseline justify-between relative z-10">
                            <div className="text-4xl font-extrabold tracking-tight text-foreground mt-2">
                                {stats.clicks_today}
                            </div>
                            {stats.clicks_today > 0 ? (
                                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/20 border border-emerald-500/20 px-3 py-1 rounded-full shadow-sm">
                                    + {stats.clicks_today}
                                </span>
                            ) : (
                                <span className="text-sm font-medium text-muted-foreground">
                                    --
                                </span>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* BOTTOM SECTION: Recent Links Table */}
                <div className="flex flex-col gap-6 mt-4">
                    <div className="flex items-center justify-between pl-2">
                        <h2 className="text-2xl font-bold tracking-tight text-foreground">
                            Recent Links
                        </h2>
                        <Button asChild variant="ghost" size="sm" className="text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-white/40 dark:hover:bg-white/10 rounded-full px-4">
                            <Link href={links.index.url()}>
                                View all <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>

                    <div className="p-1">
                        {recent_links?.length === 0 ? (
                            <div className="glass-panel p-16 text-center text-base font-medium text-muted-foreground rounded-2xl border border-white/20">
                                No links created yet. Use the input above to get started.
                            </div>
                        ) : (
                            <>
                                {/* Desktop View */}
                                <div className="hidden lg:block glass-panel rounded-3xl border border-white/50 dark:border-white/20 shadow-sm overflow-hidden">
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left">
                                            <thead className="border-b border-white/20 dark:border-white/10 bg-white/20 dark:bg-black/20 backdrop-blur-md text-xs uppercase tracking-wider font-bold text-muted-foreground whitespace-nowrap">
                                                <tr>
                                                    <th className="px-5 py-4">Link</th>
                                                    <th className="hidden px-5 py-4 sm:table-cell">Destination</th>
                                                    <th className="px-5 py-4 text-center">Clicks</th>
                                                    <th className="hidden px-5 py-4 md:table-cell">Status</th>
                                                    <th className="hidden px-5 py-4 lg:table-cell">Last Activity</th>
                                                    <th className="px-5 py-4 text-right">Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/20 dark:divide-white/5 bg-transparent text-sm">
                                                {recent_links.map((link) => (
                                                    <tr key={link.id} className="group transition-colors duration-300 hover:bg-white/30 dark:hover:bg-white/5">
                                                        <td className="px-5 py-4 whitespace-nowrap">
                                                            <div className="flex items-center gap-3">
                                                                <span className="font-mono text-sm font-bold text-foreground bg-white/50 dark:bg-black/30 px-3 py-1.5 rounded-lg border border-white/40 dark:border-white/10 shadow-sm backdrop-blur-sm">
                                                                    {link.short_code}
                                                                </span>
                                                                <button
                                                                    onClick={() => handleCopy(link.short_code, link.id)}
                                                                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/40 dark:bg-white/10 border border-white/50 dark:border-white/10 text-muted-foreground hover:text-foreground hover:bg-white/60 dark:hover:bg-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-sm"
                                                                    title="Copy URL"
                                                                >
                                                                    {copiedId === link.id ? (
                                                                        <Check className="h-4 w-4 text-emerald-500" />
                                                                    ) : (
                                                                        <Copy className="h-4 w-4" />
                                                                    )}
                                                                </button>
                                                            </div>
                                                        </td>
                                                        <td className="hidden px-5 py-4 sm:table-cell">
                                                            <div className="max-w-[200px] truncate text-muted-foreground lg:max-w-[300px] font-medium" title={link.destination_url}>
                                                                {link.destination_url}
                                                            </div>
                                                        </td>
                                                        <td className="px-5 py-4 text-center">
                                                            <span className="inline-flex items-center justify-center rounded-full bg-primary/10 border border-primary/10 px-3 py-1 text-xs font-bold text-primary shadow-sm backdrop-blur-sm">
                                                                {link.clicks_count ?? 0}
                                                            </span>
                                                        </td>
                                                        <td className="hidden px-5 py-4 md:table-cell">
                                                            {isLinkExpired(link.expires_at) ? (
                                                                <span className="inline-flex items-center gap-2 rounded-full bg-destructive/10 border border-destructive/20 px-3 py-1 text-xs font-bold text-destructive shadow-sm backdrop-blur-sm">
                                                                    <div className="h-2 w-2 rounded-full bg-destructive" />
                                                                    Expired
                                                                </span>
                                                            ) : (
                                                                <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 shadow-sm backdrop-blur-sm">
                                                                    <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                                                    Active
                                                                </span>
                                                            )}
                                                        </td>
                                                        <td className="hidden px-5 py-4 lg:table-cell text-muted-foreground font-medium">
                                                            <div className="flex items-center gap-2">
                                                                 <Clock className="h-4 w-4" />
                                                                 {isMounted ? timeAgo(link.created_at) : ''}
                                                            </div>
                                                        </td>
                                                        <td className="px-5 py-4 text-right whitespace-nowrap">
                                                            <Button asChild variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-white/40 dark:bg-white/10 border border-white/50 dark:border-white/10 shadow-sm hover:shadow-md transition-all hover:bg-white/60 dark:hover:bg-white/20">
                                                                <Link href={`/links/${link.id}`} title="View Analytics">
                                                                    <BarChart3 className="h-5 w-5" />
                                                                    <span className="sr-only">Analytics</span>
                                                                </Link>
                                                            </Button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>

                                {/* Mobile/Tablet View */}
                                <div className="flex flex-col gap-4 lg:hidden">
                                    {recent_links.map((link) => {
                                        const expired = isLinkExpired(link.expires_at);
                                        return (
                                            <div key={link.id} className="glass-panel p-5 rounded-2xl border border-white/30 dark:border-white/10 shadow-sm flex flex-col gap-4">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-mono text-sm font-bold text-foreground bg-white/50 dark:bg-black/30 px-3 py-1.5 rounded-lg border border-white/40 dark:border-white/10 shadow-sm">
                                                            {link.short_code}
                                                        </span>
                                                        <button
                                                            onClick={() => handleCopy(link.short_code, link.id)}
                                                            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/40 dark:bg-white/10 border border-white/50 dark:border-white/10 text-muted-foreground hover:text-foreground shadow-sm"
                                                            title="Copy URL"
                                                        >
                                                            {copiedId === link.id ? (
                                                                <Check className="h-4 w-4 text-emerald-500" />
                                                            ) : (
                                                                <Copy className="h-4 w-4" />
                                                            )}
                                                        </button>
                                                    </div>
                                                    {expired ? (
                                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive/10 border border-destructive/20 px-2.5 py-0.5 text-xs font-bold text-destructive">
                                                            <div className="h-1.5 w-1.5 rounded-full bg-destructive" />
                                                            Expired
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                            Active
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="flex flex-col gap-1.5">
                                                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Destination</span>
                                                    <div className="text-sm text-muted-foreground font-medium break-all" title={link.destination_url}>
                                                        <span className="line-clamp-2">{link.destination_url}</span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between border-t border-white/10 dark:border-white/5 pt-4">
                                                    <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
                                                        <div className="flex items-center gap-1">
                                                            <span className="font-bold text-foreground">{link.clicks_count ?? 0}</span> clicks
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Clock className="h-3.5 w-3.5" />
                                                            {isMounted ? timeAgo(link.created_at) : ''}
                                                        </div>
                                                    </div>
                                                    <Button asChild variant="ghost" size="icon" className="h-9 w-9 rounded-xl bg-white/40 dark:bg-white/10 border border-white/50 dark:border-white/10 shadow-sm hover:bg-white/60 dark:hover:bg-white/20">
                                                        <Link href={`/links/${link.id}`} title="View Analytics">
                                                            <BarChart3 className="h-4.5 w-4.5" />
                                                        </Link>
                                                    </Button>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </DashboardContainer>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
