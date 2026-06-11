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
                {/* TOP SECTION: Greeting & Quick Create */}
                <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between glass-panel p-8 rounded-3xl border border-white/40 dark:border-white/20">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
                            Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}, <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500">{auth.user?.name.split(' ')[0]}</span>
                        </h1>
                        <p className="text-muted-foreground text-lg font-medium">
                            Here's what's happening with your links today.
                        </p>
                    </div>

                    <div className="flex flex-col w-full md:max-w-md">
                        <form 
                            onSubmit={submit}
                            className="flex w-full items-center gap-2 rounded-2xl border border-white/40 dark:border-white/20 bg-white/30 dark:bg-black/20 backdrop-blur-xl p-1.5 shadow-sm transition-all focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary/50"
                        >
                            <div className="flex flex-1 items-center pl-4">
                                <Zap className="mr-3 h-5 w-5 text-primary animate-pulse" />
                                <Input
                                    type="url"
                                    placeholder="https://example.com/long-url"
                                    value={data.destination_url}
                                    onChange={(e) => setData('destination_url', e.target.value)}
                                    required
                                    className="h-12 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0 text-base font-medium"
                                />
                            </div>
                            <Button
                                type="submit"
                                disabled={processing}
                                className="h-12 shrink-0 px-8 font-bold rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]"
                            >
                                Shorten
                            </Button>
                        </form>
                        {errors.destination_url && (
                            <InputError message={errors.destination_url} className="mt-3 text-right px-4 font-medium" />
                        )}
                    </div>
                </div>

                {/* MIDDLE SECTION: KPI Cards */}
                <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
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

                    <div className="glass-panel rounded-3xl border border-white/50 dark:border-white/20 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left whitespace-nowrap">
                                <thead className="border-b border-white/20 dark:border-white/10 bg-white/20 dark:bg-black/20 backdrop-blur-md text-xs uppercase tracking-wider font-bold text-muted-foreground">
                                    <tr>
                                        <th className="px-8 py-5">Link</th>
                                        <th className="hidden px-8 py-5 sm:table-cell">Destination</th>
                                        <th className="px-8 py-5 text-center">Clicks</th>
                                        <th className="hidden px-8 py-5 md:table-cell">Status</th>
                                        <th className="hidden px-8 py-5 lg:table-cell">Last Activity</th>
                                        <th className="px-8 py-5 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/20 dark:divide-white/5 bg-transparent text-sm">
                                    {recent_links.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="px-8 py-16 text-center text-base font-medium text-muted-foreground">
                                                No links created yet. Use the input above to get started.
                                            </td>
                                        </tr>
                                    ) : (
                                        recent_links.map((link) => (
                                            <tr key={link.id} className="group transition-colors duration-300 hover:bg-white/30 dark:hover:bg-white/5">
                                                <td className="px-8 py-5">
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
                                                <td className="hidden px-8 py-5 sm:table-cell">
                                                    <div className="max-w-[200px] truncate text-muted-foreground lg:max-w-[300px] font-medium" title={link.destination_url}>
                                                        {link.destination_url}
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5 text-center">
                                                    <span className="inline-flex items-center justify-center rounded-full bg-primary/10 border border-primary/10 px-3 py-1 text-xs font-bold text-primary shadow-sm backdrop-blur-sm">
                                                        {link.clicks_count ?? 0}
                                                    </span>
                                                </td>
                                                <td className="hidden px-8 py-5 md:table-cell">
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
                                                <td className="hidden px-8 py-5 lg:table-cell text-muted-foreground font-medium">
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="h-4 w-4" />
                                                        {timeAgo(link.created_at)}
                                                    </div>
                                                </td>
                                                <td className="px-8 py-5 text-right">
                                                    <Button asChild variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-white/40 dark:bg-white/10 border border-white/50 dark:border-white/10 shadow-sm hover:shadow-md transition-all hover:bg-white/60 dark:hover:bg-white/20">
                                                        <Link href={`/links/${link.id}`} title="View Analytics">
                                                            <BarChart3 className="h-5 w-5" />
                                                            <span className="sr-only">Analytics</span>
                                                        </Link>
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
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
