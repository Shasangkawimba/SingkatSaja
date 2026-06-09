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
    TrendingUp,
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
            <div className="rounded-lg border border-neutral-200/80 bg-white p-3 text-left shadow-lg">
                <p className="mb-1 text-[11px] font-bold text-slate">
                    {dateStr
                        ? new Date(dateStr).toLocaleDateString(undefined, {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                          })
                        : ''}
                </p>
                <p className="text-[13px] font-bold text-graphite">
                    {payload[0].value}{' '}
                    <span className="font-medium text-slate">clicks</span>
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
                    className="h-9 rounded-lg border border-neutral-200/80 text-[13px] font-medium text-graphite hover:bg-frost-gray"
                >
                    <Link href="/links">
                        <ArrowLeft className="size-3.5" />
                        Back to Links
                    </Link>
                </Button>
            }
        >
            <Head title={`Analytics — ${link.short_code}`} />

            <div className="flex flex-col gap-5">
                {/* 1. Overview Cards */}
                <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
                    <Card className="border border-neutral-200/60 bg-white shadow-none transition-all duration-200 hover:border-neutral-300">
                        <CardContent className="flex flex-col gap-2.5 p-4">
                            <span className="text-[10px] font-bold tracking-widest text-slate/70 uppercase">
                                Total Clicks
                            </span>
                            <div className="flex items-baseline justify-between">
                                <span className="font-satoshi text-3xl font-bold tracking-tight text-vivid-indigo">
                                    {link.clicks_count ?? 0}
                                </span>
                                <span className="text-[11px] text-slate/60">
                                    all-time
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border border-neutral-200/60 bg-white shadow-none transition-all duration-200 hover:border-neutral-300">
                        <CardContent className="flex flex-col gap-2.5 p-4">
                            <span className="text-[10px] font-bold tracking-widest text-slate/70 uppercase">
                                Short URL
                            </span>
                            <div className="flex items-center justify-between gap-2">
                                <span className="truncate font-satoshi text-[15px] font-bold text-graphite select-all">
                                    {link.short_code}
                                </span>
                                <button
                                    onClick={handleCopy}
                                    title="Copy Link"
                                    className="flex size-7 shrink-0 items-center justify-center rounded border border-neutral-200/60 bg-white text-slate shadow-none transition-all hover:border-neutral-300 hover:text-vivid-indigo"
                                >
                                    {copied ? (
                                        <Check className="size-3 text-emerald-600" />
                                    ) : (
                                        <Copy className="size-3" />
                                    )}
                                </button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border border-neutral-200/60 bg-white shadow-none transition-all duration-200 hover:border-neutral-300">
                        <CardContent className="flex flex-col gap-2.5 p-4">
                            <span className="text-[10px] font-bold tracking-widest text-slate/70 uppercase">
                                Destination
                            </span>
                            <div className="flex items-center justify-between gap-2">
                                <a
                                    href={link.destination_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="truncate text-[12px] font-medium text-slate transition-colors hover:text-graphite hover:underline"
                                >
                                    {link.destination_url}
                                </a>
                                <a
                                    href={link.destination_url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="Open Destination"
                                    className="flex size-7 shrink-0 items-center justify-center rounded border border-neutral-200/60 bg-white text-slate shadow-none transition-all hover:border-neutral-300 hover:text-vivid-indigo"
                                >
                                    <ExternalLink className="size-3" />
                                </a>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border border-neutral-200/60 bg-white shadow-none transition-all duration-200 hover:border-neutral-300">
                        <CardContent className="flex flex-col gap-2.5 p-4">
                            <span className="text-[10px] font-bold tracking-widest text-slate/70 uppercase">
                                Status
                            </span>
                            <div className="flex flex-wrap items-center justify-between gap-2">
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
                                <span className="text-[11px] text-slate/70">
                                    {link.expires_at ? (
                                        <span className="flex items-center gap-1">
                                            <Calendar className="size-3" />
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

                {/* 2 & 3. Trend Charts */}
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <Card className="flex flex-col gap-4 rounded-xl border border-neutral-200/60 bg-white p-5 shadow-none">
                        <CardHeader className="p-0">
                            <div className="flex items-center gap-2.5">
                                <div className="flex size-8 items-center justify-center rounded-lg bg-pale-lilac/60 text-vivid-indigo">
                                    <TrendingUp className="size-4" />
                                </div>
                                <div>
                                    <CardTitle className="font-satoshi text-[14px] font-bold text-graphite">
                                        7 Day Trend
                                    </CardTitle>
                                    <CardDescription className="mt-0.5 text-[11px] text-slate">
                                        Click performance over the past week
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="h-[240px] p-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart
                                    data={stats_7_days}
                                    margin={{
                                        top: 8,
                                        right: 8,
                                        left: -24,
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
                                                stopOpacity={0.12}
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
                                        stroke="#f4f4f8"
                                    />
                                    <XAxis
                                        dataKey="date"
                                        tickFormatter={formattedDate}
                                        tick={{
                                            fill: '#8a8a99',
                                            fontSize: 10,
                                            fontWeight: 500,
                                        }}
                                        axisLine={false}
                                        tickLine={false}
                                        dy={6}
                                    />
                                    <YAxis
                                        tick={{
                                            fill: '#8a8a99',
                                            fontSize: 10,
                                            fontWeight: 500,
                                        }}
                                        axisLine={false}
                                        tickLine={false}
                                        allowDecimals={false}
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Area
                                        type="monotone"
                                        dataKey="clicks_count"
                                        stroke="#494bcb"
                                        strokeWidth={1.5}
                                        fillOpacity={1}
                                        fill="url(#colorClicks7)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card className="flex flex-col gap-4 rounded-xl border border-neutral-200/60 bg-white p-5 shadow-none">
                        <CardHeader className="p-0">
                            <div className="flex items-center gap-2.5">
                                <div className="flex size-8 items-center justify-center rounded-lg bg-pale-lilac/60 text-vivid-indigo">
                                    <BarChart3 className="size-4" />
                                </div>
                                <div>
                                    <CardTitle className="font-satoshi text-[14px] font-bold text-graphite">
                                        30 Day Trend
                                    </CardTitle>
                                    <CardDescription className="mt-0.5 text-[11px] text-slate">
                                        Click performance over the past month
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="h-[240px] p-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart
                                    data={stats_30_days}
                                    margin={{
                                        top: 8,
                                        right: 8,
                                        left: -24,
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
                                                stopOpacity={0.12}
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
                                        stroke="#f4f4f8"
                                    />
                                    <XAxis
                                        dataKey="date"
                                        tickFormatter={formattedDate}
                                        tick={{
                                            fill: '#8a8a99',
                                            fontSize: 10,
                                            fontWeight: 500,
                                        }}
                                        axisLine={false}
                                        tickLine={false}
                                        dy={6}
                                    />
                                    <YAxis
                                        tick={{
                                            fill: '#8a8a99',
                                            fontSize: 10,
                                            fontWeight: 500,
                                        }}
                                        axisLine={false}
                                        tickLine={false}
                                        allowDecimals={false}
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Area
                                        type="monotone"
                                        dataKey="clicks_count"
                                        stroke="#494bcb"
                                        strokeWidth={1.5}
                                        fillOpacity={1}
                                        fill="url(#colorClicks30)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                {/* 4, 5 & 6. Client Dimensions */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {/* Top Browsers */}
                    <Card className="flex flex-col gap-4 rounded-xl border border-neutral-200/60 bg-white p-5 shadow-none">
                        <CardHeader className="p-0">
                            <div className="flex items-center gap-2.5">
                                <div className="flex size-8 items-center justify-center rounded-lg bg-pale-lilac/60 text-vivid-indigo">
                                    <Globe className="size-4" />
                                </div>
                                <div>
                                    <CardTitle className="font-satoshi text-[14px] font-bold text-graphite">
                                        Top Browsers
                                    </CardTitle>
                                    <CardDescription className="mt-0.5 text-[11px] text-slate">
                                        Visits by browser type
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-3 p-0">
                            {top_browsers.length === 0 ? (
                                <div className="py-6 text-center text-[12px] text-slate/60">
                                    No browser data logged yet.
                                </div>
                            ) : (
                                <div className="flex flex-col gap-3">
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
                                                className="flex flex-col gap-1"
                                            >
                                                <div className="flex items-center justify-between text-[12px]">
                                                    <span className="font-medium text-graphite">
                                                        {item.browser || 'Other'}
                                                    </span>
                                                    <span className="font-bold text-slate/70">
                                                        {item.clicks_count} (
                                                        {percentage.toFixed(0)}%)
                                                    </span>
                                                </div>
                                                <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
                                                    <div
                                                        className="h-full rounded-full bg-vivid-indigo transition-all duration-500"
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
                    <Card className="flex flex-col gap-4 rounded-xl border border-neutral-200/60 bg-white p-5 shadow-none">
                        <CardHeader className="p-0">
                            <div className="flex items-center gap-2.5">
                                <div className="flex size-8 items-center justify-center rounded-lg bg-pale-lilac/60 text-vivid-indigo">
                                    <Smartphone className="size-4" />
                                </div>
                                <div>
                                    <CardTitle className="font-satoshi text-[14px] font-bold text-graphite">
                                        Top Devices
                                    </CardTitle>
                                    <CardDescription className="mt-0.5 text-[11px] text-slate">
                                        Distribution of device types
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-3 p-0">
                            {top_devices.length === 0 ? (
                                <div className="py-6 text-center text-[12px] text-slate/60">
                                    No device data logged yet.
                                </div>
                            ) : (
                                <div className="flex flex-col gap-3">
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
                                                className="flex flex-col gap-1"
                                            >
                                                <div className="flex items-center justify-between text-[12px]">
                                                    <span className="font-medium text-graphite">
                                                        {label}
                                                    </span>
                                                    <span className="font-bold text-slate/70">
                                                        {item.clicks_count} (
                                                        {percentage.toFixed(0)}%)
                                                    </span>
                                                </div>
                                                <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
                                                    <div
                                                        className="h-full rounded-full bg-vivid-indigo transition-all duration-500"
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
                    <Card className="flex flex-col gap-4 rounded-xl border border-neutral-200/60 bg-white p-5 shadow-none">
                        <CardHeader className="p-0">
                            <div className="flex items-center gap-2.5">
                                <div className="flex size-8 items-center justify-center rounded-lg bg-pale-lilac/60 text-vivid-indigo">
                                    <Laptop className="size-4" />
                                </div>
                                <div>
                                    <CardTitle className="font-satoshi text-[14px] font-bold text-graphite">
                                        Top Platforms
                                    </CardTitle>
                                    <CardDescription className="mt-0.5 text-[11px] text-slate">
                                        Operating system platform groups
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-3 p-0">
                            {top_platforms.length === 0 ? (
                                <div className="py-6 text-center text-[12px] text-slate/60">
                                    No platform data logged yet.
                                </div>
                            ) : (
                                <div className="flex flex-col gap-3">
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
                                                className="flex flex-col gap-1"
                                            >
                                                <div className="flex items-center justify-between text-[12px]">
                                                    <span className="font-medium text-graphite">
                                                        {item.platform || 'Other'}
                                                    </span>
                                                    <span className="font-bold text-slate/70">
                                                        {item.clicks_count} (
                                                        {percentage.toFixed(0)}%)
                                                    </span>
                                                </div>
                                                <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
                                                    <div
                                                        className="h-full rounded-full bg-vivid-indigo transition-all duration-500"
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
