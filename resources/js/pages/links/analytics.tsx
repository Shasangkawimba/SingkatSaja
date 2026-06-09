import { Head, Link } from '@inertiajs/react';
import {
    ArrowLeft,
    Copy,
    Check,
    ExternalLink,
    Calendar,
    BarChart3,
    Globe,
    Laptop,
    Smartphone,
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
            <div className="rounded-lg border border-neutral-200/80 bg-pure-white p-12 text-left font-sans text-caption shadow-md">
                <p className="mb-4 font-bold text-graphite">
                    {dateStr
                        ? new Date(dateStr).toLocaleDateString(undefined, {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                          })
                        : ''}
                </p>
                <p className="text-[14px] font-bold text-vivid-indigo">
                    Clicks:{' '}
                    <span className="font-extrabold text-graphite">
                        {payload[0].value}
                    </span>
                </p>
            </div>
        );
    }

    return null;
};

export default function Analytics({ analytics }: AnalyticsProps) {
    const {
        link,
        stats_7_days,
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
        if (!link.expires_at) {
            return false;
        }

        return new Date(link.expires_at) < new Date();
    };

    const totalBrowserClicks = top_browsers.reduce(
        (acc, curr) => acc + curr.clicks_count,
        0,
    );
    const totalDeviceClicks = top_devices.reduce(
        (acc, curr) => acc + curr.clicks_count,
        0,
    );
    const totalPlatformClicks = top_platforms.reduce(
        (acc, curr) => acc + curr.clicks_count,
        0,
    );

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
                <Button
                    asChild
                    variant="ghost"
                    className="h-9 rounded-lg border border-neutral-200 font-medium text-graphite hover:bg-frost-gray"
                >
                    <Link href="/links">
                        <ArrowLeft className="mr-8 size-16" />
                        Back to Links
                    </Link>
                </Button>
            }
        >
            <Head title={`Analytics — ${link.short_code}`} />

            <div className="flex flex-col gap-24">
                {/* 1. Overview Cards */}
                <div className="grid grid-cols-1 gap-20 sm:grid-cols-2 lg:grid-cols-4">
                    <Card className="border border-neutral-200/80 bg-white transition-all duration-300 hover:border-neutral-300">
                        <CardContent className="flex flex-col gap-12 p-20">
                            <span className="text-[11px] font-bold tracking-wider text-slate uppercase">
                                Total Clicks
                            </span>
                            <div className="mt-4 flex items-baseline justify-between">
                                <span className="font-satoshi text-4xl font-bold tracking-tight text-vivid-indigo">
                                    {link.clicks_count ?? 0}
                                </span>
                                <span className="text-[12px] font-medium text-slate">
                                    all-time clicks
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border border-neutral-200/80 bg-white transition-all duration-300 hover:border-neutral-300">
                        <CardContent className="flex flex-col gap-12 p-20">
                            <span className="text-[11px] font-bold tracking-wider text-slate uppercase">
                                Short URL
                            </span>
                            <div className="mt-4 flex items-center justify-between gap-8">
                                <span className="truncate font-satoshi text-heading-sm font-bold text-graphite select-all">
                                    {link.short_code}
                                </span>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={handleCopy}
                                    className="size-32 shrink-0 rounded-lg border border-neutral-200/60 bg-white shadow-2xs hover:bg-neutral-50 hover:text-vivid-indigo"
                                    title="Copy Link"
                                >
                                    {copied ? (
                                        <Check className="size-14 text-emerald-600" />
                                    ) : (
                                        <Copy className="size-14" />
                                    )}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border border-neutral-200/80 bg-white transition-all duration-300 hover:border-neutral-300">
                        <CardContent className="flex flex-col gap-12 p-20">
                            <span className="text-[11px] font-bold tracking-wider text-slate uppercase">
                                Destination
                            </span>
                            <div className="mt-4 flex items-center justify-between gap-8">
                                <span className="max-w-[160px] truncate text-[14px] font-medium text-slate transition-colors hover:text-graphite">
                                    <a
                                        href={link.destination_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {link.destination_url}
                                    </a>
                                </span>
                                <a
                                    href={link.destination_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex size-32 shrink-0 items-center justify-center rounded-lg border border-neutral-200/60 bg-white text-slate shadow-2xs hover:bg-neutral-50 hover:text-vivid-indigo"
                                    title="Open Destination"
                                >
                                    <ExternalLink className="size-14" />
                                </a>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border border-neutral-200/80 bg-white transition-all duration-300 hover:border-neutral-300">
                        <CardContent className="flex flex-col gap-12 p-20">
                            <span className="text-[11px] font-bold tracking-wider text-slate uppercase">
                                Status & Expiration
                            </span>
                            <div className="mt-4 flex flex-wrap items-center justify-between gap-8">
                                {expired ? (
                                    <Badge
                                        variant="danger"
                                        className="bg-rose-50 text-rose-700"
                                    >
                                        Expired
                                    </Badge>
                                ) : (
                                    <Badge
                                        variant="success"
                                        className="bg-emerald-50 text-emerald-700"
                                    >
                                        Active
                                    </Badge>
                                )}
                                <span className="text-[12px] font-medium text-slate">
                                    {link.expires_at ? (
                                        <span className="flex items-center gap-4 text-slate">
                                            <Calendar className="size-12" />
                                            {new Date(
                                                link.expires_at,
                                            ).toLocaleDateString(undefined, {
                                                month: 'short',
                                                day: 'numeric',
                                            })}
                                        </span>
                                    ) : (
                                        'Never expires'
                                    )}
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* 2 & 3. Trend Charts (7 Day & 30 Day) */}
                <div className="grid grid-cols-1 gap-24 lg:grid-cols-2">
                    <Card className="flex flex-col gap-20 rounded-largecards border border-neutral-200/80 bg-white p-24">
                        <CardHeader className="p-0">
                            <div className="flex items-center gap-12">
                                <div className="flex size-32 items-center justify-center rounded-lg bg-pale-lilac/50 text-vivid-indigo">
                                    <BarChart3 className="size-16" />
                                </div>
                                <div>
                                    <CardTitle className="font-satoshi text-heading-sm font-bold text-graphite">
                                        7 Day Trend
                                    </CardTitle>
                                    <CardDescription className="mt-1 text-[12px] text-slate">
                                        Click rate performance over the past
                                        week
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="mt-8 h-[280px] p-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart
                                    data={stats_7_days}
                                    margin={{
                                        top: 10,
                                        right: 10,
                                        left: -20,
                                        bottom: 0,
                                    }}
                                >
                                    <defs>
                                        <linearGradient
                                            id="colorClicks7"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop
                                                offset="5%"
                                                stopColor="#494bcb"
                                                stopOpacity={0.15}
                                            />
                                            <stop
                                                offset="95%"
                                                stopColor="#494bcb"
                                                stopOpacity={0}
                                            />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        vertical={false}
                                        stroke="#f0f0f5"
                                    />
                                    <XAxis
                                        dataKey="date"
                                        tickFormatter={formattedDate}
                                        tick={{
                                            fill: '#686878',
                                            fontSize: 11,
                                            fontWeight: 500,
                                        }}
                                        stroke="#neutral-300"
                                        strokeOpacity={0.15}
                                        dy={8}
                                    />
                                    <YAxis
                                        tick={{
                                            fill: '#686878',
                                            fontSize: 11,
                                            fontWeight: 500,
                                        }}
                                        stroke="#neutral-300"
                                        strokeOpacity={0.15}
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

                    <Card className="flex flex-col gap-20 rounded-largecards border border-neutral-200/80 bg-white p-24">
                        <CardHeader className="p-0">
                            <div className="flex items-center gap-12">
                                <div className="flex size-32 items-center justify-center rounded-lg bg-pale-lilac/50 text-vivid-indigo">
                                    <BarChart3 className="size-16" />
                                </div>
                                <div>
                                    <CardTitle className="font-satoshi text-heading-sm font-bold text-graphite">
                                        30 Day Trend
                                    </CardTitle>
                                    <CardDescription className="mt-1 text-[12px] text-slate">
                                        Click rate performance over the past
                                        month
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="mt-8 h-[280px] p-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart
                                    data={stats_30_days}
                                    margin={{
                                        top: 10,
                                        right: 10,
                                        left: -20,
                                        bottom: 0,
                                    }}
                                >
                                    <defs>
                                        <linearGradient
                                            id="colorClicks30"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop
                                                offset="5%"
                                                stopColor="#494bcb"
                                                stopOpacity={0.15}
                                            />
                                            <stop
                                                offset="95%"
                                                stopColor="#494bcb"
                                                stopOpacity={0}
                                            />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        vertical={false}
                                        stroke="#f0f0f5"
                                    />
                                    <XAxis
                                        dataKey="date"
                                        tickFormatter={formattedDate}
                                        tick={{
                                            fill: '#686878',
                                            fontSize: 11,
                                            fontWeight: 500,
                                        }}
                                        stroke="#neutral-300"
                                        strokeOpacity={0.15}
                                        dy={8}
                                    />
                                    <YAxis
                                        tick={{
                                            fill: '#686878',
                                            fontSize: 11,
                                            fontWeight: 500,
                                        }}
                                        stroke="#neutral-300"
                                        strokeOpacity={0.15}
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
                <div className="grid grid-cols-1 gap-24 md:grid-cols-3">
                    {/* Top Browsers */}
                    <Card className="flex flex-col gap-20 rounded-largecards border border-neutral-200/80 bg-white p-24">
                        <CardHeader className="p-0">
                            <div className="flex items-center gap-12">
                                <div className="flex size-32 items-center justify-center rounded-lg bg-pale-lilac/50 text-vivid-indigo">
                                    <Globe className="size-16" />
                                </div>
                                <div>
                                    <CardTitle className="font-satoshi text-heading-sm font-bold text-graphite">
                                        Top Browsers
                                    </CardTitle>
                                    <CardDescription className="mt-1 text-[12px] text-slate">
                                        Visits classified by browser type
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-16 p-0">
                            {top_browsers.length === 0 ? (
                                <div className="py-24 text-center text-[13px] font-medium text-slate">
                                    No browser data logged yet.
                                </div>
                            ) : (
                                <div className="flex flex-col gap-16">
                                    {top_browsers.map((item, index) => {
                                        const percentage =
                                            totalBrowserClicks > 0
                                                ? (item.clicks_count /
                                                      totalBrowserClicks) *
                                                  100
                                                : 0;

                                        return (
                                            <div
                                                key={index}
                                                className="flex flex-col gap-6"
                                            >
                                                <div className="flex items-center justify-between text-[13px] font-medium">
                                                    <span className="text-graphite">
                                                        {item.browser ||
                                                            'Other'}
                                                    </span>
                                                    <span className="font-bold text-slate">
                                                        {item.clicks_count} (
                                                        {percentage.toFixed(1)}
                                                        %)
                                                    </span>
                                                </div>
                                                <div className="h-6 w-full overflow-hidden rounded-pills border border-neutral-100 bg-frost-gray">
                                                    <div
                                                        className="h-full rounded-pills bg-vivid-indigo"
                                                        style={{
                                                            width: `${percentage}%`,
                                                        }}
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
                    <Card className="flex flex-col gap-20 rounded-largecards border border-neutral-200/80 bg-white p-24">
                        <CardHeader className="p-0">
                            <div className="flex items-center gap-12">
                                <div className="flex size-32 items-center justify-center rounded-lg bg-pale-lilac/50 text-vivid-indigo">
                                    <Smartphone className="size-16" />
                                </div>
                                <div>
                                    <CardTitle className="font-satoshi text-heading-sm font-bold text-graphite">
                                        Top Devices
                                    </CardTitle>
                                    <CardDescription className="mt-1 text-[12px] text-slate">
                                        Distribution of device types utilized
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-16 p-0">
                            {top_devices.length === 0 ? (
                                <div className="py-24 text-center text-[13px] font-medium text-slate">
                                    No device data logged yet.
                                </div>
                            ) : (
                                <div className="flex flex-col gap-16">
                                    {top_devices.map((item, index) => {
                                        const percentage =
                                            totalDeviceClicks > 0
                                                ? (item.clicks_count /
                                                      totalDeviceClicks) *
                                                  100
                                                : 0;
                                        const label = item.device_type
                                            ? item.device_type
                                                  .charAt(0)
                                                  .toUpperCase() +
                                              item.device_type.slice(1)
                                            : 'Other';

                                        return (
                                            <div
                                                key={index}
                                                className="flex flex-col gap-6"
                                            >
                                                <div className="flex items-center justify-between text-[13px] font-medium">
                                                    <span className="text-graphite">
                                                        {label}
                                                    </span>
                                                    <span className="font-bold text-slate">
                                                        {item.clicks_count} (
                                                        {percentage.toFixed(1)}
                                                        %)
                                                    </span>
                                                </div>
                                                <div className="h-6 w-full overflow-hidden rounded-pills border border-neutral-100 bg-frost-gray">
                                                    <div
                                                        className="h-full rounded-pills bg-vivid-indigo"
                                                        style={{
                                                            width: `${percentage}%`,
                                                        }}
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
                    <Card className="flex flex-col gap-20 rounded-largecards border border-neutral-200/80 bg-white p-24">
                        <CardHeader className="p-0">
                            <div className="flex items-center gap-12">
                                <div className="flex size-32 items-center justify-center rounded-lg bg-pale-lilac/50 text-vivid-indigo">
                                    <Laptop className="size-16" />
                                </div>
                                <div>
                                    <CardTitle className="font-satoshi text-heading-sm font-bold text-graphite">
                                        Top Platforms
                                    </CardTitle>
                                    <CardDescription className="mt-1 text-[12px] text-slate">
                                        Operating systems platform groupings
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-16 p-0">
                            {top_platforms.length === 0 ? (
                                <div className="py-24 text-center text-[13px] font-medium text-slate">
                                    No platform data logged yet.
                                </div>
                            ) : (
                                <div className="flex flex-col gap-16">
                                    {top_platforms.map((item, index) => {
                                        const percentage =
                                            totalPlatformClicks > 0
                                                ? (item.clicks_count /
                                                      totalPlatformClicks) *
                                                  100
                                                : 0;

                                        return (
                                            <div
                                                key={index}
                                                className="flex flex-col gap-6"
                                            >
                                                <div className="flex items-center justify-between text-[13px] font-medium">
                                                    <span className="text-graphite">
                                                        {item.platform ||
                                                            'Other'}
                                                    </span>
                                                    <span className="font-bold text-slate">
                                                        {item.clicks_count} (
                                                        {percentage.toFixed(1)}
                                                        %)
                                                    </span>
                                                </div>
                                                <div className="h-6 w-full overflow-hidden rounded-pills border border-neutral-100 bg-frost-gray">
                                                    <div
                                                        className="h-full rounded-pills bg-vivid-indigo"
                                                        style={{
                                                            width: `${percentage}%`,
                                                        }}
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
