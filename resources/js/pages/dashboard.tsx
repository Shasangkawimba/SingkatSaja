import { Head, Link, useForm } from '@inertiajs/react';
import {
    Plus,
    Link2,
    Eye,
    ArrowRight,
    Activity,
    TrendingUp,
    Zap,
} from 'lucide-react';
import { toast } from 'sonner';
import { DashboardContainer } from '@/components/dashboard-container';
import InputError from '@/components/input-error';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { dashboard } from '@/routes';
import links from '@/routes/links';
import type { DashboardProps } from '@/types/dashboard';

export default function Dashboard({ stats }: DashboardProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        destination_url: '',
        short_code: '',
        expires_at: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/links', {
            onSuccess: () => {
                reset();
                toast.success('Short link generated successfully.');
            },
        });
    };

    return (
        <DashboardContainer
            title="Dashboard"
            description="Overview of your redirect counts and active links."
        >
            <Head title="Dashboard" />

            {/* 1. Statistics Grid */}
            <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
                <Card className="group relative overflow-hidden border border-neutral-200/60 bg-white shadow-none transition-all duration-200 hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-sm">
                    <CardContent className="flex flex-col gap-3 p-4">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold tracking-widest text-slate/80 uppercase">
                                Total Links
                            </span>
                            <div className="flex size-7 items-center justify-center rounded-lg border border-neutral-100 bg-neutral-50 text-slate transition-colors group-hover:border-neutral-200 group-hover:bg-neutral-100">
                                <Link2 className="size-3.5" />
                            </div>
                        </div>
                        <div className="flex items-baseline justify-between">
                            <span className="font-satoshi text-3xl font-bold tracking-tight text-graphite">
                                {stats.total_links}
                            </span>
                            <span className="text-[11px] font-medium text-slate/70">
                                created
                            </span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="group relative overflow-hidden border border-neutral-200/60 bg-white shadow-none transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-sm">
                    <CardContent className="flex flex-col gap-3 p-4">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold tracking-widest text-slate/80 uppercase">
                                Active
                            </span>
                            <div className="flex size-7 items-center justify-center rounded-lg border border-emerald-100 bg-emerald-50 text-emerald-600 transition-colors group-hover:bg-emerald-100">
                                <Activity className="size-3.5" />
                            </div>
                        </div>
                        <div className="flex items-baseline justify-between">
                            <span className="font-satoshi text-3xl font-bold tracking-tight text-graphite">
                                {stats.active_links}
                            </span>
                            <Badge
                                variant="success"
                                className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50"
                            >
                                Live
                            </Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card className="group relative overflow-hidden border border-neutral-200/60 bg-white shadow-none transition-all duration-200 hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-sm">
                    <CardContent className="flex flex-col gap-3 p-4">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold tracking-widest text-slate/80 uppercase">
                                Total Clicks
                            </span>
                            <div className="flex size-7 items-center justify-center rounded-lg border border-indigo-100 bg-indigo-50 text-vivid-indigo transition-colors group-hover:bg-indigo-100">
                                <Eye className="size-3.5" />
                            </div>
                        </div>
                        <div className="flex items-baseline justify-between">
                            <span className="font-satoshi text-3xl font-bold tracking-tight text-graphite">
                                {stats.total_clicks}
                            </span>
                            <span className="text-[11px] font-medium text-slate/70">
                                all-time
                            </span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="group relative overflow-hidden border border-neutral-200/60 bg-white shadow-none transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-200 hover:shadow-sm">
                    <CardContent className="flex flex-col gap-3 p-4">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold tracking-widest text-slate/80 uppercase">
                                Clicks Today
                            </span>
                            <div className="flex size-7 items-center justify-center rounded-lg border border-amber-100 bg-amber-50 text-amber-600 transition-colors group-hover:bg-amber-100">
                                <TrendingUp className="size-3.5" />
                            </div>
                        </div>
                        <div className="flex items-baseline justify-between">
                            <span className="font-satoshi text-3xl font-bold tracking-tight text-graphite">
                                {stats.clicks_today}
                            </span>
                            {stats.clicks_today > 0 ? (
                                <Badge
                                    variant="warning"
                                    className="border-transparent bg-amber-50 text-amber-800"
                                >
                                    Trending
                                </Badge>
                            ) : (
                                <Badge
                                    variant="eyebrow"
                                    className="border-transparent bg-neutral-100 text-slate/70"
                                >
                                    Quiet
                                </Badge>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* 2. Main Columns */}
            <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-3">
                {/* Quick Actions (Link Creator) */}
                <div className="flex flex-col lg:col-span-2">
                    <Card className="flex h-full flex-col border border-neutral-200/60 bg-white shadow-none">
                        <CardHeader className="px-5 pt-5 pb-0">
                            <div className="flex items-center gap-2.5">
                                <div className="flex size-8 items-center justify-center rounded-lg bg-vivid-indigo/10 text-vivid-indigo">
                                    <Zap className="size-4" />
                                </div>
                                <div>
                                    <CardTitle className="font-satoshi text-[15px] font-bold text-graphite">
                                        Shorten a URL
                                    </CardTitle>
                                    <CardDescription className="mt-0.5 text-[12px] text-slate">
                                        Generate clean, fast Base62 redirects instantly.
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1 px-5 py-4">
                            <form
                                id="quick-shorten-form"
                                onSubmit={submit}
                                className="flex flex-col gap-4"
                            >
                                <div className="flex flex-col gap-1.5">
                                    <Label
                                        htmlFor="destination_url"
                                        className="text-[11px] font-bold tracking-widest text-graphite uppercase"
                                    >
                                        Destination URL
                                    </Label>
                                    <Input
                                        id="destination_url"
                                        type="url"
                                        placeholder="https://example.com/very-long-campaign-url"
                                        value={data.destination_url}
                                        onChange={(e) =>
                                            setData(
                                                'destination_url',
                                                e.target.value,
                                            )
                                        }
                                        required
                                        className="h-9 border-neutral-200/80 bg-white text-[14px] focus-visible:border-vivid-indigo focus-visible:ring-vivid-indigo/20"
                                    />
                                    <InputError
                                        message={errors.destination_url}
                                    />
                                </div>

                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    <div className="flex flex-col gap-1.5">
                                        <Label
                                            htmlFor="short_code"
                                            className="text-[11px] font-bold tracking-widest text-graphite uppercase"
                                        >
                                            Custom Alias
                                            <span className="ml-1 font-medium text-slate/60 normal-case tracking-normal">
                                                (optional)
                                            </span>
                                        </Label>
                                        <div className="flex items-center">
                                            <span className="inline-flex h-9 items-center rounded-l-md border border-r-0 border-neutral-200/80 bg-frost-gray/50 px-3 text-[12px] font-medium text-slate select-none">
                                                singkat.saja/
                                            </span>
                                            <Input
                                                id="short_code"
                                                type="text"
                                                placeholder="alias"
                                                value={data.short_code}
                                                onChange={(e) =>
                                                    setData(
                                                        'short_code',
                                                        e.target.value,
                                                    )
                                                }
                                                className="h-9 rounded-l-none border-neutral-200/80 bg-white text-[14px] focus-visible:border-vivid-indigo focus-visible:ring-vivid-indigo/20"
                                            />
                                        </div>
                                        <InputError
                                            message={errors.short_code}
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1.5">
                                        <Label
                                            htmlFor="expires_at"
                                            className="text-[11px] font-bold tracking-widest text-graphite uppercase"
                                        >
                                            Expiration
                                            <span className="ml-1 font-medium text-slate/60 normal-case tracking-normal">
                                                (optional)
                                            </span>
                                        </Label>
                                        <Input
                                            id="expires_at"
                                            type="datetime-local"
                                            value={data.expires_at}
                                            onChange={(e) =>
                                                setData(
                                                    'expires_at',
                                                    e.target.value,
                                                )
                                            }
                                            className="h-9 border-neutral-200/80 bg-white text-[14px] focus-visible:border-vivid-indigo focus-visible:ring-vivid-indigo/20"
                                        />
                                        <InputError
                                            message={errors.expires_at}
                                        />
                                    </div>
                                </div>
                            </form>
                        </CardContent>
                        <div className="flex justify-end border-t border-neutral-100 px-5 py-3">
                            <Button
                                form="quick-shorten-form"
                                type="submit"
                                disabled={processing}
                                className="h-9 rounded-lg bg-vivid-indigo px-5 text-[13px] font-medium text-pure-white shadow-none transition-all hover:bg-vivid-indigo/90 hover:shadow-sm active:scale-[0.98]"
                            >
                                <Plus className="size-3.5" />
                                Shorten Link
                            </Button>
                        </div>
                    </Card>
                </div>

                {/* Recent Links Guide / Quick Links */}
                <div className="flex flex-col">
                    <Card className="flex h-full flex-col border border-neutral-200/60 bg-white shadow-none">
                        <CardHeader className="px-5 pt-5 pb-0">
                            <CardTitle className="font-satoshi text-[15px] font-bold text-graphite">
                                My Short Links
                            </CardTitle>
                            <CardDescription className="mt-0.5 text-[12px] text-slate">
                                Browse, filter, and track performance.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-1 flex-col justify-between gap-3 px-5 py-4">
                            <p className="text-[13px] leading-relaxed text-slate">
                                Detailed click counts, time-series curves for
                                the last 7 and 30 days, and breakdowns by
                                browser, device type, and operating system are
                                housed in the link manager.
                            </p>

                            {/* Quick Stats */}
                            <div className="rounded-lg border border-neutral-100 bg-frost-gray/30 p-3">
                                <div className="flex items-center justify-between text-[12px]">
                                    <span className="font-medium text-slate">
                                        Links managed
                                    </span>
                                    <span className="font-bold text-graphite">
                                        {stats.total_links}
                                    </span>
                                </div>
                                <div className="mt-2 flex items-center justify-between text-[12px]">
                                    <span className="font-medium text-slate">
                                        Currently active
                                    </span>
                                    <span className="font-bold text-emerald-600">
                                        {stats.active_links}
                                    </span>
                                </div>
                            </div>

                            <Button
                                asChild
                                variant="ghost"
                                className="h-9 w-full justify-center rounded-lg border border-neutral-200 text-[13px] font-medium text-graphite hover:bg-frost-gray transition-colors"
                            >
                                <Link href={links.index.url()}>
                                    Manage Links{' '}
                                    <ArrowRight className="size-3.5" />
                                </Link>
                            </Button>
                        </CardContent>
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
