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
import { DashboardContainer } from '@/features/dashboard/components/dashboard-container';
import { Button } from '@/shared/ui/button';
import type { AnalyticsProps } from '@/features/links/types/analytics';

const CustomTooltip = ({
    active,
    payload,
    label,
}: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length && label) {
        const dateStr = typeof label === 'string' ? label : '';
        return (
            <div className="glass-panel px-4 py-3 rounded-xl border border-white/20 shadow-xl backdrop-blur-xl">
                <p className="mb-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                    {dateStr ? new Date(dateStr).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : ''}
                </p>
                <div className="flex items-center gap-3">
                    <div className="h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                    <p className="text-sm font-extrabold text-foreground">
                        {payload[0].value} <span className="text-muted-foreground font-semibold">clicks</span>
                    </p>
                </div>
            </div>
        );
    }
    return null;
}

export default function Analytics({ analytics }: AnalyticsProps) {
    const {
        link,
        stats_30_days,
        top_browsers,
        top_platforms,
        top_devices,
    } = analytics;
    const [copied, setCopied] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    React.useEffect(() => {
        setIsMounted(true);
    }, []);

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

    const totalBrowserClicks = top_browsers?.reduce((acc, curr) => acc + curr.clicks_count, 0) ?? 0;
    const totalDeviceClicks = top_devices?.reduce((acc, curr) => acc + curr.clicks_count, 0) ?? 0;
    const totalPlatformClicks = top_platforms?.reduce((acc, curr) => acc + curr.clicks_count, 0) ?? 0;

    const formattedDate = (dateString: string) => {
        if (!isMounted) return '';
        const d = new Date(dateString);
        return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
    };

    const expired = isLinkExpired();

    return (
        <DashboardContainer
            title=""
            description=""
            className="pb-12 relative z-10 pt-8"
        >
            <Head title={`Analytics — ${link.short_code}`} />

            {/* Back Navigation */}
            <div className="mb-8 flex">
                <Button asChild variant="ghost" className="text-muted-foreground hover:text-foreground hover:bg-background/50 rounded-full px-6 font-bold h-10">
                    <Link href="/links">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Links
                    </Link>
                </Button>
            </div>

            <div className="flex flex-col gap-8">
                {/* 1. Hero Card */}
                <div className="glass-panel rounded-3xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                        {/* Primary Info */}
                        <div className="flex flex-1 flex-col justify-center gap-6 p-8 md:p-10">
                            <div className="flex items-center gap-4">
                                <h1 className="text-4xl font-extrabold tracking-tight text-foreground bg-background/50 px-4 py-2 rounded-xl border border-white/10 font-mono shadow-inner">
                                    {link.short_code}
                                </h1>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={handleCopy}
                                    className="h-12 w-12 shrink-0 rounded-full bg-background/50 border-white/10 shadow-sm hover:shadow-md transition-all hover:bg-background/80"
                                    title="Copy short link"
                                >
                                    {copied ? <Check className="h-6 w-6 text-emerald-500" /> : <Copy className="h-5 w-5 text-muted-foreground" />}
                                </Button>
                            </div>
                            
                            <div className="flex items-center gap-3 text-base font-bold">
                                <span className="text-muted-foreground">Destination:</span>
                                <a 
                                    href={link.destination_url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex max-w-sm items-center gap-2 truncate text-foreground hover:text-primary transition-colors sm:max-w-md lg:max-w-lg"
                                >
                                    <span className="truncate">{link.destination_url}</span>
                                    <ExternalLink className="h-4 w-4 shrink-0 opacity-50" />
                                </a>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 mt-2">
                                {expired ? (
                                    <span className="inline-flex items-center gap-2 rounded-full bg-destructive/10 border border-destructive/20 px-3 py-1 text-xs font-bold text-destructive shadow-sm">
                                        <div className="h-2 w-2 rounded-full bg-destructive" />
                                        Expired
                                    </span>
                                ) : (
                                    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 shadow-sm">
                                        <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                        Active
                                    </span>
                                )}
                                <span className="flex items-center gap-2 text-xs font-bold text-muted-foreground bg-background/50 rounded-full px-4 py-1.5 border border-white/10 shadow-sm">
                                    <CalendarDays className="h-4 w-4 text-primary/70" />
                                    {link.expires_at ? (isMounted ? `Expires ${new Date(link.expires_at).toLocaleDateString()}` : 'Expires ...') : 'Never expires'}
                                </span>
                            </div>
                        </div>

                        {/* Stat Block */}
                        <div className="flex w-full flex-col justify-center border-t border-white/10 bg-background/20 p-8 md:w-80 md:border-l md:border-t-0 md:p-10 backdrop-blur-sm">
                            <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground uppercase tracking-wider">
                                <MousePointerClick className="h-4 w-4 text-primary" />
                                Total Clicks
                            </div>
                            <div className="mt-4 text-6xl font-extrabold tracking-tight text-foreground drop-shadow-sm">
                                {link.clicks_count ?? 0}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Full Width 30 Day Chart */}
                <div className="glass-panel rounded-3xl border border-white/20 overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.05)]">
                    <div className="border-b border-white/10 bg-background/30 px-8 py-5">
                        <h3 className="flex items-center gap-3 text-lg font-bold text-foreground">
                            <BarChart3 className="h-5 w-5 text-primary" />
                            30 Day Performance
                        </h3>
                    </div>
                    <div className="h-[400px] p-8 pt-10">
                        <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                            <AreaChart data={stats_30_days} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.6} />
                                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.05} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted-foreground))" strokeOpacity={0.15} />
                                <XAxis 
                                    dataKey="date" 
                                    tickFormatter={formattedDate} 
                                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12, fontWeight: 600 }} 
                                    axisLine={false} 
                                    tickLine={false} 
                                    dy={15} 
                                    minTickGap={30}
                                />
                                <YAxis 
                                    tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12, fontWeight: 600 }} 
                                    axisLine={false} 
                                    tickLine={false} 
                                    allowDecimals={false} 
                                    dx={-15}
                                />
                                <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1.5, strokeDasharray: '4 4', opacity: 0.5 }} />
                                <Area type="monotone" dataKey="clicks_count" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorClicks)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 3. Dimension Cards */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {/* Browsers */}
                    <div className="glass-panel rounded-3xl border border-white/20 overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.05)]">
                        <div className="border-b border-white/10 bg-background/30 px-6 py-5">
                            <h3 className="flex items-center gap-3 text-base font-bold text-foreground">
                                <Globe className="h-5 w-5 text-primary" />
                                Top Browsers
                            </h3>
                        </div>
                        <div className="p-6 h-full min-h-[280px]">
                            {top_browsers?.length === 0 ? (
                                <div className="flex h-full items-center justify-center text-sm font-medium text-muted-foreground">No data available</div>
                            ) : (
                                <div className="flex flex-col gap-6">
                                    {top_browsers.map((item, index) => {
                                        const percentage = totalBrowserClicks > 0 ? (item.clicks_count / totalBrowserClicks) * 100 : 0;
                                        return (
                                            <div key={index} className="flex flex-col gap-3">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="font-bold text-foreground">{item.browser || 'Other'}</span>
                                                    <span className="text-muted-foreground font-bold">{percentage.toFixed(1)}% <span className="ml-2 font-mono text-xs bg-background/60 border border-white/10 shadow-sm px-2 py-1 rounded-md text-foreground">{item.clicks_count}</span></span>
                                                </div>
                                                <div className="h-2.5 w-full rounded-full bg-background/50 border border-white/5 overflow-hidden shadow-inner">
                                                    <div className="h-full bg-primary transition-all duration-1000 relative" style={{ width: `${percentage}%` }}>
                                                        <div className="absolute inset-0 bg-white/20"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Devices */}
                    <div className="glass-panel rounded-3xl border border-white/20 overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.05)]">
                        <div className="border-b border-white/10 bg-background/30 px-6 py-5">
                            <h3 className="flex items-center gap-3 text-base font-bold text-foreground">
                                <Smartphone className="h-5 w-5 text-primary" />
                                Top Devices
                            </h3>
                        </div>
                        <div className="p-6 h-full min-h-[280px]">
                            {top_devices?.length === 0 ? (
                                <div className="flex h-full items-center justify-center text-sm font-medium text-muted-foreground">No data available</div>
                            ) : (
                                <div className="flex flex-col gap-6">
                                    {top_devices.map((item, index) => {
                                        const percentage = totalDeviceClicks > 0 ? (item.clicks_count / totalDeviceClicks) * 100 : 0;
                                        const label = item.device_type ? item.device_type.charAt(0).toUpperCase() + item.device_type.slice(1) : 'Other';
                                        return (
                                            <div key={index} className="flex flex-col gap-3">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="font-bold text-foreground">{label}</span>
                                                    <span className="text-muted-foreground font-bold">{percentage.toFixed(1)}% <span className="ml-2 font-mono text-xs bg-background/60 border border-white/10 shadow-sm px-2 py-1 rounded-md text-foreground">{item.clicks_count}</span></span>
                                                </div>
                                                <div className="h-2.5 w-full rounded-full bg-background/50 border border-white/5 overflow-hidden shadow-inner">
                                                    <div className="h-full bg-primary transition-all duration-1000 relative" style={{ width: `${percentage}%` }}>
                                                        <div className="absolute inset-0 bg-white/20"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Platforms */}
                    <div className="glass-panel rounded-3xl border border-white/20 overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.05)]">
                        <div className="border-b border-white/10 bg-background/30 px-6 py-5">
                            <h3 className="flex items-center gap-3 text-base font-bold text-foreground">
                                <Laptop className="h-5 w-5 text-primary" />
                                Top Platforms
                            </h3>
                        </div>
                        <div className="p-6 h-full min-h-[280px]">
                            {top_platforms?.length === 0 ? (
                                <div className="flex h-full items-center justify-center text-sm font-medium text-muted-foreground">No data available</div>
                            ) : (
                                <div className="flex flex-col gap-6">
                                    {top_platforms.map((item, index) => {
                                        const percentage = totalPlatformClicks > 0 ? (item.clicks_count / totalPlatformClicks) * 100 : 0;
                                        return (
                                            <div key={index} className="flex flex-col gap-3">
                                                <div className="flex items-center justify-between text-sm">
                                                    <span className="font-bold text-foreground">{item.platform || 'Other'}</span>
                                                    <span className="text-muted-foreground font-bold">{percentage.toFixed(1)}% <span className="ml-2 font-mono text-xs bg-background/60 border border-white/10 shadow-sm px-2 py-1 rounded-md text-foreground">{item.clicks_count}</span></span>
                                                </div>
                                                <div className="h-2.5 w-full rounded-full bg-background/50 border border-white/5 overflow-hidden shadow-inner">
                                                    <div className="h-full bg-primary transition-all duration-1000 relative" style={{ width: `${percentage}%` }}>
                                                        <div className="absolute inset-0 bg-white/20"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardContainer>
    );
}
