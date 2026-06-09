import { Head, Link, useForm } from '@inertiajs/react';
import {
    Plus,
    Link2,
    Eye,
    ArrowRight,
    Activity,
    TrendingUp,
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
            <div className="mb-32 grid grid-cols-1 gap-20 sm:grid-cols-2 lg:grid-cols-4">
                <Card className="border border-neutral-200/80 bg-white transition-all duration-300 hover:border-neutral-300">
                    <CardContent className="flex flex-col gap-16 p-24">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold tracking-wider text-slate uppercase">
                                Total Links
                            </span>
                            <div className="flex size-32 items-center justify-center rounded-lg border border-neutral-100 bg-neutral-50 text-slate">
                                <Link2 className="size-16" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-baseline justify-between">
                            <span className="font-satoshi text-4xl font-bold tracking-tight text-graphite">
                                {stats.total_links}
                            </span>
                            <span className="text-[12px] font-medium text-slate">
                                links created
                            </span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border border-neutral-200/80 bg-white transition-all duration-300 hover:border-neutral-300">
                    <CardContent className="flex flex-col gap-16 p-24">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold tracking-wider text-slate uppercase">
                                Active Links
                            </span>
                            <div className="flex size-32 items-center justify-center rounded-lg border border-emerald-100 bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10">
                                <Activity className="size-16" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-baseline justify-between">
                            <span className="font-satoshi text-4xl font-bold tracking-tight text-graphite">
                                {stats.active_links}
                            </span>
                            <Badge
                                variant="success"
                                className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50"
                            >
                                Active
                            </Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border border-neutral-200/80 bg-white transition-all duration-300 hover:border-neutral-300">
                    <CardContent className="flex flex-col gap-16 p-24">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold tracking-wider text-slate uppercase">
                                Total Clicks
                            </span>
                            <div className="flex size-32 items-center justify-center rounded-lg border border-neutral-100 bg-neutral-50 text-slate">
                                <Eye className="size-16" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-baseline justify-between">
                            <span className="font-satoshi text-4xl font-bold tracking-tight text-graphite">
                                {stats.total_clicks}
                            </span>
                            <span className="text-[12px] font-medium text-slate">
                                all-time redirects
                            </span>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border border-neutral-200/80 bg-white transition-all duration-300 hover:border-neutral-300">
                    <CardContent className="flex flex-col gap-16 p-24">
                        <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold tracking-wider text-slate uppercase">
                                Clicks Today
                            </span>
                            <div className="flex size-32 items-center justify-center rounded-lg border border-amber-100 bg-amber-50 text-amber-600">
                                <TrendingUp className="size-16" />
                            </div>
                        </div>
                        <div className="mt-4 flex items-baseline justify-between">
                            <span className="font-satoshi text-4xl font-bold tracking-tight text-graphite">
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
                                    className="border-transparent bg-neutral-100 text-slate"
                                >
                                    Quiet
                                </Badge>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* 2. Main Columns */}
            <div className="grid grid-cols-1 items-stretch gap-24 lg:grid-cols-3">
                {/* Quick Actions (Link Creator) */}
                <div className="flex flex-col lg:col-span-2">
                    <Card className="flex h-full flex-col justify-between border border-neutral-200/80 bg-white">
                        <div>
                            <CardHeader className="p-24 pb-0">
                                <CardTitle className="font-satoshi text-heading font-bold text-graphite">
                                    Shorten a URL
                                </CardTitle>
                                <CardDescription className="mt-2 text-sm text-slate">
                                    Generate clean, fast Base62 redirects
                                    instantly.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-24">
                                <form
                                    id="quick-shorten-form"
                                    onSubmit={submit}
                                    className="flex flex-col gap-20"
                                >
                                    <div className="flex flex-col gap-6">
                                        <Label
                                            htmlFor="destination_url"
                                            className="text-[12px] font-bold tracking-wider text-graphite uppercase"
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
                                            className="h-10 border-neutral-200/80 bg-white text-body focus-visible:border-vivid-indigo focus-visible:ring-vivid-indigo/20"
                                        />
                                        <InputError
                                            message={errors.destination_url}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 gap-20 md:grid-cols-2">
                                        <div className="flex flex-col gap-6">
                                            <Label
                                                htmlFor="short_code"
                                                className="text-[12px] font-bold tracking-wider text-graphite uppercase"
                                            >
                                                Custom Alias (Optional)
                                            </Label>
                                            <div className="flex items-center">
                                                <span className="inline-flex h-10 items-center rounded-l-md border border-r-0 border-neutral-200/80 bg-frost-gray/50 px-12 text-[13px] text-caption font-medium text-slate select-none">
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
                                                    className="h-10 rounded-l-none border-neutral-200/80 bg-white text-body focus-visible:border-vivid-indigo focus-visible:ring-vivid-indigo/20"
                                                />
                                            </div>
                                            <InputError
                                                message={errors.short_code}
                                            />
                                        </div>

                                        <div className="flex flex-col gap-6">
                                            <Label
                                                htmlFor="expires_at"
                                                className="text-[12px] font-bold tracking-wider text-graphite uppercase"
                                            >
                                                Expiration (Optional)
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
                                                className="h-10 border-neutral-200/80 bg-white text-body focus-visible:border-vivid-indigo focus-visible:ring-vivid-indigo/20"
                                            />
                                            <InputError
                                                message={errors.expires_at}
                                            />
                                        </div>
                                    </div>
                                </form>
                            </CardContent>
                        </div>
                        <div className="flex justify-end border-t border-neutral-100 p-24 pt-0">
                            <Button
                                form="quick-shorten-form"
                                type="submit"
                                disabled={processing}
                                className="h-10 rounded-lg bg-vivid-indigo px-20 font-medium text-pure-white shadow-xs hover:bg-vivid-indigo/90"
                            >
                                <Plus className="mr-8 size-16" />
                                Shorten Link
                            </Button>
                        </div>
                    </Card>
                </div>

                {/* Recent Links Guide / Quick Links */}
                <div className="flex flex-col">
                    <Card className="flex h-full flex-col justify-between border border-neutral-200/80 bg-white">
                        <CardHeader className="p-24 pb-0">
                            <CardTitle className="font-satoshi text-heading font-bold text-graphite">
                                My Short Links
                            </CardTitle>
                            <CardDescription className="mt-2 text-sm text-slate">
                                Browse, filter, and track performance.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-1 flex-col justify-between gap-16 p-24">
                            <p className="text-[14px] leading-relaxed text-slate">
                                Detailed click counts, time-series curves for
                                the last 7 and 30 days, and breakdowns by
                                browser, device type, and operating system are
                                housed in the link manager.
                            </p>
                            <div className="flex border-t border-neutral-100 pt-12">
                                <Button
                                    asChild
                                    variant="ghost"
                                    className="h-10 w-full justify-center rounded-lg border border-neutral-200 font-medium text-graphite hover:bg-frost-gray"
                                >
                                    <Link href={links.index.url()}>
                                        Manage Links{' '}
                                        <ArrowRight className="ml-8 size-16" />
                                    </Link>
                                </Button>
                            </div>
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
