import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Copy, ExternalLink, Calendar, BarChart3, Globe, Laptop, Smartphone } from 'lucide-react';
import { toast } from 'sonner';
import { DashboardContainer } from '@/components/dashboard-container';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { TooltipProps } from 'recharts';
import type { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import type { AnalyticsProps } from '@/types/analytics';

const CustomTooltip = ({ active, payload, label }: TooltipProps<ValueType, NameType>) => {
    if (active && payload && payload.length && label) {
        const dateStr = typeof label === 'string' ? label : '';
        return (
            <div className="bg-pure-white border border-slate/30 p-12 rounded-cards shadow-md text-caption">
                <p className="font-bold text-graphite mb-4">
                    {dateStr ? new Date(dateStr).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                    }) : ''}
                </p>
                <p className="text-vivid-indigo font-bold">
                    Clicks: <span className="text-graphite">{payload[0].value}</span>
                </p>
            </div>
        );
    }
    return null;
};

export default function Analytics({ analytics }: AnalyticsProps) {
    const { link, stats_7_days, stats_30_days, top_browsers, top_platforms, top_devices } = analytics;

    const handleCopy = () => {
        const fullUrl = `${window.location.origin}/${link.short_code}`;
        navigator.clipboard.writeText(fullUrl);
        toast.success('Short link copied to clipboard.');
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
        return d.toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
        });
    };

    const expired = isLinkExpired();

    return (
        <DashboardContainer
            title={`Analytics: ${link.short_code}`}
            description="Detailed click events, trends, and client dimensions."
            actions={
                <Button asChild variant="ghost" className="border border-slate/30 text-graphite hover:bg-frost-gray font-medium">
                    <Link href="/links">
                        <ArrowLeft className="size-16 mr-8" />
                        Back to Links
                    </Link>
                </Button>
            }
        >
            <Head title={`Analytics — ${link.short_code}`} />

            <div className="flex flex-col gap-32">
                {/* 1. Overview Cards */}
                <div className="grid gap-20 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    <Card className="border border-slate/20 bg-pure-white p-20 flex flex-col justify-between">
                        <CardHeader className="p-0">
                            <CardDescription className="text-caption font-bold text-slate uppercase tracking-wider">Total Clicks</CardDescription>
                            <CardTitle className="text-display font-bold text-vivid-indigo mt-8 leading-none tracking-tight">
                                {link.clicks_count ?? 0}
                            </CardTitle>
                        </CardHeader>
                    </Card>

                    <Card className="border border-slate/20 bg-pure-white p-20 flex flex-col justify-between">
                        <CardHeader className="p-0">
                            <CardDescription className="text-caption font-bold text-slate uppercase tracking-wider">Short URL</CardDescription>
                            <div className="flex items-center justify-between mt-12 gap-8">
                                <span className="font-bold text-heading-sm text-graphite truncate select-all">
                                    {link.short_code}
                                </span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={handleCopy}
                                    className="size-28 rounded-full border border-slate/20 text-slate hover:text-vivid-indigo shrink-0"
                                    title="Copy Link"
                                >
                                    <Copy className="size-14" />
                                </Button>
                            </div>
                        </CardHeader>
                    </Card>

                    <Card className="border border-slate/20 bg-pure-white p-20 flex flex-col justify-between">
                        <CardHeader className="p-0">
                            <CardDescription className="text-caption font-bold text-slate uppercase tracking-wider">Destination</CardDescription>
                            <div className="flex items-center justify-between mt-12 gap-8">
                                <span className="text-body text-graphite truncate hover:underline max-w-[180px]">
                                    <a href={link.destination_url} target="_blank" rel="noopener noreferrer">
                                        {link.destination_url}
                                    </a>
                                </span>
                                <a 
                                    href={link.destination_url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="size-28 rounded-full border border-slate/20 flex items-center justify-center text-slate hover:text-vivid-indigo shrink-0"
                                    title="Open Destination"
                                >
                                    <ExternalLink className="size-14" />
                                </a>
                            </div>
                        </CardHeader>
                    </Card>

                    <Card className="border border-slate/20 bg-pure-white p-20 flex flex-col justify-between">
                        <CardHeader className="p-0">
                            <CardDescription className="text-caption font-bold text-slate uppercase tracking-wider">Status & Expiration</CardDescription>
                            <div className="flex items-center justify-between mt-12 gap-8">
                                {expired ? (
                                    <Badge variant="danger">Expired</Badge>
                                ) : (
                                    <Badge variant="success">Active</Badge>
                                )}
                                <span className="text-caption text-slate text-right">
                                    {link.expires_at ? (
                                        <span className="flex items-center gap-4 text-slate">
                                            <Calendar className="size-12" />
                                            {new Date(link.expires_at).toLocaleDateString(undefined, {
                                                month: 'short',
                                                day: 'numeric',
                                            })}
                                        </span>
                                    ) : (
                                        'Never expires'
                                    )}
                                </span>
                            </div>
                        </CardHeader>
                    </Card>
                </div>

                {/* 2 & 3. Trend Charts (7 Day & 30 Day) */}
                <div className="grid gap-20 grid-cols-1 lg:grid-cols-2">
                    <Card className="border border-slate/20 bg-pure-white p-20 flex flex-col gap-20">
                        <CardHeader className="p-0">
                            <div className="flex items-center gap-12">
                                <div className="size-32 rounded-lg bg-pale-lilac flex items-center justify-center text-vivid-indigo">
                                    <BarChart3 className="size-16" />
                                </div>
                                <div>
                                    <CardTitle className="text-heading-sm font-bold text-graphite">7 Day Trend</CardTitle>
                                    <CardDescription className="text-caption text-slate mt-2">Click rate performance over the past week</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0 h-[280px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={stats_7_days} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorClicks7" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#494bcb" stopOpacity={0.15}/>
                                            <stop offset="95%" stopColor="#494bcb" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eaeaf7" />
                                    <XAxis 
                                        dataKey="date" 
                                        tickFormatter={formattedDate}
                                        tick={{ fill: '#686878', fontSize: 12, fontWeight: 500 }} 
                                        stroke="#686878"
                                        strokeOpacity={0.2}
                                        dy={8}
                                    />
                                    <YAxis 
                                        tick={{ fill: '#686878', fontSize: 12, fontWeight: 500 }} 
                                        stroke="#686878"
                                        strokeOpacity={0.2}
                                        allowDecimals={false}
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Area 
                                        type="monotone" 
                                        dataKey="clicks_count" 
                                        stroke="#494bcb" 
                                        strokeWidth={2}
                                        fillOpacity={1} 
                                        fill="url(#colorClicks7)" 
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card className="border border-slate/20 bg-pure-white p-20 flex flex-col gap-20">
                        <CardHeader className="p-0">
                            <div className="flex items-center gap-12">
                                <div className="size-32 rounded-lg bg-pale-lilac flex items-center justify-center text-vivid-indigo">
                                    <BarChart3 className="size-16" />
                                </div>
                                <div>
                                    <CardTitle className="text-heading-sm font-bold text-graphite">30 Day Trend</CardTitle>
                                    <CardDescription className="text-caption text-slate mt-2">Click rate performance over the past month</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0 h-[280px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={stats_30_days} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorClicks30" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#494bcb" stopOpacity={0.15}/>
                                            <stop offset="95%" stopColor="#494bcb" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eaeaf7" />
                                    <XAxis 
                                        dataKey="date" 
                                        tickFormatter={formattedDate}
                                        tick={{ fill: '#686878', fontSize: 12, fontWeight: 500 }} 
                                        stroke="#686878"
                                        strokeOpacity={0.2}
                                        dy={8}
                                    />
                                    <YAxis 
                                        tick={{ fill: '#686878', fontSize: 12, fontWeight: 500 }} 
                                        stroke="#686878"
                                        strokeOpacity={0.2}
                                        allowDecimals={false}
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Area 
                                        type="monotone" 
                                        dataKey="clicks_count" 
                                        stroke="#494bcb" 
                                        strokeWidth={2}
                                        fillOpacity={1} 
                                        fill="url(#colorClicks30)" 
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                {/* 4, 5 & 6. Client Dimensions (Browsers, Devices, Platforms) */}
                <div className="grid gap-20 grid-cols-1 md:grid-cols-3">
                    {/* Top Browsers */}
                    <Card className="border border-slate/20 bg-pure-white p-20 flex flex-col gap-20">
                        <CardHeader className="p-0">
                            <div className="flex items-center gap-12">
                                <div className="size-32 rounded-lg bg-pale-lilac flex items-center justify-center text-vivid-indigo">
                                    <Globe className="size-16" />
                                </div>
                                <div>
                                    <CardTitle className="text-heading-sm font-bold text-graphite">Top Browsers</CardTitle>
                                    <CardDescription className="text-caption text-slate mt-2">Visits classified by browser program</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0 flex flex-col gap-16">
                            {top_browsers.length === 0 ? (
                                <div className="py-24 text-center text-caption text-slate font-medium">
                                    No browser data logged yet.
                                </div>
                            ) : (
                                <div className="flex flex-col gap-16">
                                    {top_browsers.map((item, index) => {
                                        const percentage = totalBrowserClicks > 0 ? (item.clicks_count / totalBrowserClicks) * 100 : 0;
                                        return (
                                            <div key={index} className="flex flex-col gap-6">
                                                <div className="flex items-center justify-between text-caption font-medium">
                                                    <span className="text-graphite">{item.browser || 'Other'}</span>
                                                    <span className="text-slate font-bold">
                                                        {item.clicks_count} ({percentage.toFixed(1)}%)
                                                    </span>
                                                </div>
                                                <div className="h-6 w-full bg-pale-lilac rounded-pills overflow-hidden">
                                                    <div
                                                        className="h-full bg-vivid-indigo rounded-pills"
                                                        style={{ width: `${percentage}%` }}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Top Devices */}
                    <Card className="border border-slate/20 bg-pure-white p-20 flex flex-col gap-20">
                        <CardHeader className="p-0">
                            <div className="flex items-center gap-12">
                                <div className="size-32 rounded-lg bg-pale-lilac flex items-center justify-center text-vivid-indigo">
                                    <Smartphone className="size-16" />
                                </div>
                                <div>
                                    <CardTitle className="text-heading-sm font-bold text-graphite">Top Devices</CardTitle>
                                    <CardDescription className="text-caption text-slate mt-2">Distribution of device types utilized</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0 flex flex-col gap-16">
                            {top_devices.length === 0 ? (
                                <div className="py-24 text-center text-caption text-slate font-medium">
                                    No device data logged yet.
                                </div>
                            ) : (
                                <div className="flex flex-col gap-16">
                                    {top_devices.map((item, index) => {
                                        const percentage = totalDeviceClicks > 0 ? (item.clicks_count / totalDeviceClicks) * 100 : 0;
                                        const label = item.device_type ? item.device_type.charAt(0).toUpperCase() + item.device_type.slice(1) : 'Other';
                                        return (
                                            <div key={index} className="flex flex-col gap-6">
                                                <div className="flex items-center justify-between text-caption font-medium">
                                                    <span className="text-graphite">{label}</span>
                                                    <span className="text-slate font-bold">
                                                        {item.clicks_count} ({percentage.toFixed(1)}%)
                                                    </span>
                                                </div>
                                                <div className="h-6 w-full bg-pale-lilac rounded-pills overflow-hidden">
                                                    <div
                                                        className="h-full bg-vivid-indigo rounded-pills"
                                                        style={{ width: `${percentage}%` }}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Top Platforms */}
                    <Card className="border border-slate/20 bg-pure-white p-20 flex flex-col gap-20">
                        <CardHeader className="p-0">
                            <div className="flex items-center gap-12">
                                <div className="size-32 rounded-lg bg-pale-lilac flex items-center justify-center text-vivid-indigo">
                                    <Laptop className="size-16" />
                                </div>
                                <div>
                                    <CardTitle className="text-heading-sm font-bold text-graphite">Top Platforms</CardTitle>
                                    <CardDescription className="text-caption text-slate mt-2">Operating systems platform groupings</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0 flex flex-col gap-16">
                            {top_platforms.length === 0 ? (
                                <div className="py-24 text-center text-caption text-slate font-medium">
                                    No platform data logged yet.
                                </div>
                            ) : (
                                <div className="flex flex-col gap-16">
                                    {top_platforms.map((item, index) => {
                                        const percentage = totalPlatformClicks > 0 ? (item.clicks_count / totalPlatformClicks) * 100 : 0;
                                        return (
                                            <div key={index} className="flex flex-col gap-6">
                                                <div className="flex items-center justify-between text-caption font-medium">
                                                    <span className="text-graphite">{item.platform || 'Other'}</span>
                                                    <span className="text-slate font-bold">
                                                        {item.clicks_count} ({percentage.toFixed(1)}%)
                                                    </span>
                                                </div>
                                                <div className="h-6 w-full bg-pale-lilac rounded-pills overflow-hidden">
                                                    <div
                                                        className="h-full bg-vivid-indigo rounded-pills"
                                                        style={{ width: `${percentage}%` }}
                                                    />
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
