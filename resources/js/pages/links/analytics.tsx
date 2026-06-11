import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    Copy,
    Check,
    ExternalLink,
    BarChart3,
    Globe,
    Laptop,
    Smartphone,
    MousePointerClick,
    CalendarDays
} from 'lucide-react';
import React, { useState } from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';
import type { TooltipProps } from 'recharts';
import type {
    NameType,
    ValueType,
} from 'recharts/types/component/DefaultTooltipContent';
import { toast } from 'sonner';
import { DashboardContainer } from '@/components/dashboard-container';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';
import type { AnalyticsProps } from '@/types/analytics';

const CustomTooltip = ({
    active,
    payload,
    label,
}: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length && label) {
        const dateStr = typeof label === 'string' ? label : '';
        return (
            <div className="rounded-lg border border-border/60 bg-popover px-3 py-2 text-popover-foreground shadow-sm">
                <p className="mb-1 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
                    {dateStr ? new Date(dateStr).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
                </p>
                <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <p className="text-sm font-bold">
                        {payload[0].value} <span className="font-normal text-muted-foreground">clicks</span>
                    </p>
                </div>
            </div>
        );
    }
    return null;
};

export default function Analytics({ analytics }: AnalyticsProps) {
    const {
        link,
        stats_30_days,
        top_browsers,
        top_platforms,
        top_devices,
    } = analytics;
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        const fullUrl = `${window.location.origin}/${link.short_code}`;
        navigator.clipboard.writeText(fullUrl);
        setCopied(true);
        toast.success('Short link copied to clipboard.');
        setTimeout(() => setCopied(false), 2000);
    };

    const isLinkExpired = () => {
        if (!link.expires_at) return false;
        return new Date(link.expires_at) < new Date();
    };

    const totalBrowserClicks = top_browsers.reduce((acc, curr) => acc + curr.clicks_count, 0);
    const totalDeviceClicks = top_devices.reduce((acc, curr) => acc + curr.clicks_count, 0);
    const totalPlatformClicks = top_platforms.reduce((acc, curr) => acc + curr.clicks_count, 0);

    const formattedDate = (dateString: string) => {
        const d = new Date(dateString);
        return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    };

    const expired = isLinkExpired();

    return (
        <DashboardContainer
            title=""
            description=""
            className="pb-12"
        >
            <Head title={`Analytics — ${link.short_code}`} />

            {/* Back Navigation */}
            <div className="mb-4 flex">
                <Button asChild variant="ghost" size="sm" className="h-8 pl-2 pr-4 text-xs text-muted-foreground hover:text-foreground">
                    <Link href="/links">
                        <ArrowLeft className="mr-1.5 h-3 w-3" />
                        Back to Links
                    </Link>
                </Button>
            </div>

            <div className="flex flex-col gap-6">
                {/* 1. Hero Card */}
                <Card className="overflow-hidden border-border/40 bg-card shadow-sm">
                    <div className="flex flex-col border-b border-border/40 md:flex-row">
                        {/* Primary Info */}
                        <div className="flex flex-1 flex-col justify-center gap-4 p-6 md:p-8">
                            <div className="flex items-center gap-3">
                                <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                                    {link.short_code}
                                </h1>
                                <button
                                    onClick={handleCopy}
                                    className="group rounded-md border border-border/40 bg-muted/30 p-2 transition-all hover:bg-muted"
                                    title="Copy short link"
                                >
                                    {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />}
                                </button>
                            </div>
                            
                            <div className="flex items-center gap-2 text-sm">
                                <span className="text-muted-foreground">Destination:</span>
                                <a 
                                    href={link.destination_url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex max-w-sm items-center gap-1.5 truncate font-medium text-foreground hover:underline sm:max-w-md lg:max-w-lg"
                                >
                                    {link.destination_url}
                                    <ExternalLink className="h-3 w-3 text-muted-foreground" />
                                </a>
                            </div>

                            <div className="mt-2 flex flex-wrap items-center gap-4">
                                {expired ? (
                                    <Badge variant="destructive" className="bg-destructive/10 text-destructive hover:bg-destructive/10">
                                        Expired
                                    </Badge>
                                ) : (
                                    <Badge variant="default" className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/10 dark:text-emerald-400">
                                        Active
                                    </Badge>
                                )}
                                <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                                    <CalendarDays className="h-4 w-4" />
                                    {link.expires_at ? `Expires ${new Date(link.expires_at).toLocaleDateString()}` : 'Never expires'}
                                </span>
                            </div>
                        </div>

                        {/* Stat Block */}
                        <div className="flex w-full flex-col justify-center border-t border-border/40 bg-muted/10 p-6 md:w-64 md:border-l md:border-t-0 md:p-8 lg:w-80">
                            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                                <MousePointerClick className="h-4 w-4" />
                                Total Clicks
                            </div>
                            <div className="mt-2 text-5xl font-bold tracking-tighter text-foreground">
                                {link.clicks_count ?? 0}
                            </div>
                        </div>
                    </div>
                </Card>

                {/* 2. Full Width 30 Day Chart */}
                <Card className="border-border/40 bg-card shadow-sm">
                    <CardHeader className="border-b border-border/40 px-6 py-5">
                        <CardTitle className="flex items-center gap-2 text-base">
                            <BarChart3 className="h-4 w-4 text-muted-foreground" />
                            30 Day Performance
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="h-[350px] p-0 sm:p-6">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={stats_30_days} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="hsl(var(--foreground))" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="hsl(var(--foreground))" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" strokeOpacity={0.4} />
                                <XAxis 
                                    dataKey="date" 
                                    tickFormatter={formattedDate} 
                                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} 
                                    axisLine={false} 
                                    tickLine={false} 
                                    dy={10} 
                                    minTickGap={20}
                                />
                                <YAxis 
                                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }} 
                                    axisLine={false} 
                                    tickLine={false} 
                                    allowDecimals={false} 
                                    dx={-10}
                                />
                                <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'hsl(var(--border))', strokeWidth: 1, strokeDasharray: '4 4' }} />
                                <Area type="monotone" dataKey="clicks_count" stroke="hsl(var(--foreground))" strokeWidth={2} fillOpacity={1} fill="url(#colorClicks)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                {/* 3. Dimension Cards */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {/* Browsers */}
                    <Card className="border-border/40 bg-card shadow-sm">
                        <CardHeader className="border-b border-border/40 px-5 py-4">
                            <CardTitle className="flex items-center gap-2 text-sm">
                                <Globe className="h-4 w-4 text-muted-foreground" />
                                Top Browsers
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-5">
                            {top_browsers.length === 0 ? (
                                <div className="py-8 text-center text-sm text-muted-foreground">No data available yet.</div>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    {top_browsers.map((item, index) => {
                                        const percentage = totalBrowserClicks > 0 ? (item.clicks_count / totalBrowserClicks) * 100 : 0;
                                        return (
                                            <div key={index} className="flex flex-col gap-1.5">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="font-medium text-foreground">{item.browser || 'Other'}</span>
                                                    <span className="text-muted-foreground">{percentage.toFixed(1)}% <span className="ml-1 text-xs opacity-50">({item.clicks_count})</span></span>
                                                </div>
                                                <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                                                    <div className="h-full rounded-full bg-foreground transition-all duration-1000" style={{ width: `${percentage}%` }} />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Devices */}
                    <Card className="border-border/40 bg-card shadow-sm">
                        <CardHeader className="border-b border-border/40 px-5 py-4">
                            <CardTitle className="flex items-center gap-2 text-sm">
                                <Smartphone className="h-4 w-4 text-muted-foreground" />
                                Top Devices
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-5">
                            {top_devices.length === 0 ? (
                                <div className="py-8 text-center text-sm text-muted-foreground">No data available yet.</div>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    {top_devices.map((item, index) => {
                                        const percentage = totalDeviceClicks > 0 ? (item.clicks_count / totalDeviceClicks) * 100 : 0;
                                        const label = item.device_type ? item.device_type.charAt(0).toUpperCase() + item.device_type.slice(1) : 'Other';
                                        return (
                                            <div key={index} className="flex flex-col gap-1.5">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="font-medium text-foreground">{label}</span>
                                                    <span className="text-muted-foreground">{percentage.toFixed(1)}% <span className="ml-1 text-xs opacity-50">({item.clicks_count})</span></span>
                                                </div>
                                                <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                                                    <div className="h-full rounded-full bg-foreground transition-all duration-1000" style={{ width: `${percentage}%` }} />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Platforms */}
                    <Card className="border-border/40 bg-card shadow-sm">
                        <CardHeader className="border-b border-border/40 px-5 py-4">
                            <CardTitle className="flex items-center gap-2 text-sm">
                                <Laptop className="h-4 w-4 text-muted-foreground" />
                                Top Platforms
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-5">
                            {top_platforms.length === 0 ? (
                                <div className="py-8 text-center text-sm text-muted-foreground">No data available yet.</div>
                            ) : (
                                <div className="flex flex-col gap-4">
                                    {top_platforms.map((item, index) => {
                                        const percentage = totalPlatformClicks > 0 ? (item.clicks_count / totalPlatformClicks) * 100 : 0;
                                        return (
                                            <div key={index} className="flex flex-col gap-1.5">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="font-medium text-foreground">{item.platform || 'Other'}</span>
                                                    <span className="text-muted-foreground">{percentage.toFixed(1)}% <span className="ml-1 text-xs opacity-50">({item.clicks_count})</span></span>
                                                </div>
                                                <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                                                    <div className="h-full rounded-full bg-foreground transition-all duration-1000" style={{ width: `${percentage}%` }} />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </DashboardContainer>
    );
}
