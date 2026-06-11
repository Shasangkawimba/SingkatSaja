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
        <DashboardContainer title="" description="">
            <Head title="Dashboard" />

            <div className="flex flex-col gap-8 pb-12 pt-4">
                {/* TOP SECTION: Greeting & Quick Create */}
                <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl font-bold tracking-tight text-foreground">
                            Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}, {auth.user?.name.split(' ')[0]}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Here's what's happening with your links today.
                        </p>
                    </div>

                    <form 
                        onSubmit={submit}
                        className="flex w-full items-center gap-2 rounded-full border border-border/60 bg-card p-1 shadow-sm md:max-w-md transition-all focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
                    >
                        <div className="flex flex-1 items-center px-3">
                            <Zap className="mr-2 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="url"
                                placeholder="https://example.com/long-url"
                                value={data.destination_url}
                                onChange={(e) => setData('destination_url', e.target.value)}
                                required
                                className="h-9 border-0 bg-transparent px-0 text-sm focus-visible:ring-0 focus-visible:ring-offset-0"
                            />
                        </div>
                        <Button
                            type="submit"
                            disabled={processing}
                            className="h-9 shrink-0 rounded-full px-5 text-xs font-semibold"
                        >
                            Shorten
                        </Button>
                    </form>
                </div>
                {errors.destination_url && (
                    <InputError message={errors.destination_url} className="-mt-4 text-right md:pr-4" />
                )}

                {/* MIDDLE SECTION: KPI Cards */}
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                    <Card className="relative overflow-hidden border-border/40 bg-card/50 shadow-sm transition-all hover:bg-card">
                        <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/5 blur-[20px]" />
                        <CardContent className="flex flex-col gap-4 p-5">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                    Total Links
                                </span>
                                <Link2 className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-3xl font-bold tracking-tighter text-foreground">
                                    {stats.total_links}
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="relative overflow-hidden border-border/40 bg-card/50 shadow-sm transition-all hover:bg-card">
                        <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-emerald-500/5 blur-[20px]" />
                        <CardContent className="flex flex-col gap-4 p-5">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                    Active Links
                                </span>
                                <Activity className="h-4 w-4 text-emerald-500" />
                            </div>
                            <div className="flex items-baseline justify-between">
                                <span className="text-3xl font-bold tracking-tighter text-foreground">
                                    {stats.active_links}
                                </span>
                                <Badge variant="outline" className="bg-emerald-500/10 text-[10px] text-emerald-600 dark:text-emerald-400 border-emerald-500/20">
                                    Live
                                </Badge>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="relative overflow-hidden border-border/40 bg-card/50 shadow-sm transition-all hover:bg-card">
                        <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-blue-500/5 blur-[20px]" />
                        <CardContent className="flex flex-col gap-4 p-5">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                    Total Clicks
                                </span>
                                <Eye className="h-4 w-4 text-blue-500" />
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-3xl font-bold tracking-tighter text-foreground">
                                    {stats.total_clicks}
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="relative overflow-hidden border-border/40 bg-card/50 shadow-sm transition-all hover:bg-card">
                        <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-amber-500/5 blur-[20px]" />
                        <CardContent className="flex flex-col gap-4 p-5">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                    Clicks Today
                                </span>
                                <TrendingUp className="h-4 w-4 text-amber-500" />
                            </div>
                            <div className="flex items-baseline justify-between">
                                <span className="text-3xl font-bold tracking-tighter text-foreground">
                                    {stats.clicks_today}
                                </span>
                                {stats.clicks_today > 0 ? (
                                    <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
                                        +Trending
                                    </span>
                                ) : (
                                    <span className="text-xs font-medium text-muted-foreground">
                                        Quiet
                                    </span>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* BOTTOM SECTION: Recent Links Table */}
                <div className="flex flex-col gap-4 pt-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold tracking-tight text-foreground">
                            Recent Links
                        </h2>
                        <Button asChild variant="ghost" size="sm" className="h-8 text-xs font-medium">
                            <Link href={links.index.url()}>
                                View all <ArrowRight className="ml-1 h-3 w-3" />
                            </Link>
                        </Button>
                    </div>

                    <Card className="overflow-hidden border-border/40 bg-card shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead className="border-b border-border/40 bg-muted/30 text-xs uppercase text-muted-foreground">
                                    <tr>
                                        <th className="px-6 py-4 font-medium">Link</th>
                                        <th className="hidden px-6 py-4 font-medium sm:table-cell">Destination</th>
                                        <th className="px-6 py-4 font-medium text-right">Clicks</th>
                                        <th className="hidden px-6 py-4 font-medium md:table-cell">Status</th>
                                        <th className="hidden px-6 py-4 font-medium lg:table-cell">Last Activity</th>
                                        <th className="px-6 py-4 font-medium text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border/40">
                                    {recent_links.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                                                No links created yet. Use the input above to get started.
                                            </td>
                                        </tr>
                                    ) : (
                                        recent_links.map((link) => (
                                            <tr key={link.id} className="group transition-colors hover:bg-muted/20">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-semibold text-foreground">
                                                            {link.short_code}
                                                        </span>
                                                        <button
                                                            onClick={() => handleCopy(link.short_code, link.id)}
                                                            className="invisible text-muted-foreground hover:text-foreground group-hover:visible"
                                                            title="Copy URL"
                                                        >
                                                            {copiedId === link.id ? (
                                                                <Check className="h-3.5 w-3.5 text-emerald-500" />
                                                            ) : (
                                                                <Copy className="h-3.5 w-3.5" />
                                                            )}
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className="hidden px-6 py-4 sm:table-cell">
                                                    <div className="max-w-[200px] truncate text-muted-foreground lg:max-w-[300px]" title={link.destination_url}>
                                                        {link.destination_url}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <Badge variant="secondary" className="bg-secondary/50 font-mono text-xs">
                                                        {link.clicks_count ?? 0}
                                                    </Badge>
                                                </td>
                                                <td className="hidden px-6 py-4 md:table-cell">
                                                    {isLinkExpired(link.expires_at) ? (
                                                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-destructive">
                                                            <div className="h-1.5 w-1.5 rounded-full bg-destructive" />
                                                            Expired
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                                                            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                            Active
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="hidden px-6 py-4 lg:table-cell">
                                                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                                        <Clock className="h-3 w-3" />
                                                        {timeAgo(link.created_at)}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button asChild variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                                                            <Link href={`/links/${link.id}`} title="View Analytics">
                                                                <BarChart3 className="h-4 w-4" />
                                                            </Link>
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </Card>
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
