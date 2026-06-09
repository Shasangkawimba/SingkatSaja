import { Head, Link, useForm } from '@inertiajs/react';
import { Plus, Link2, Eye, Calendar, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';
import { DashboardContainer } from '@/components/dashboard-container';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
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
            <div className="grid gap-16 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-32">
                <Card className="border border-slate/20 bg-pure-white p-20">
                    <CardContent className="p-0 flex flex-col gap-8">
                        <span className="text-caption text-slate font-medium uppercase tracking-tight text-[11px]">Total Links</span>
                        <div className="flex items-baseline justify-between">
                            <span className="text-display leading-none font-bold text-graphite">{stats.total_links}</span>
                            <div className="size-32 rounded-full bg-frost-gray flex items-center justify-center text-slate">
                                <Link2 className="size-16" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border border-slate/20 bg-pure-white p-20">
                    <CardContent className="p-0 flex flex-col gap-8">
                        <span className="text-caption text-slate font-medium uppercase tracking-tight text-[11px]">Active Links</span>
                        <div className="flex items-baseline justify-between">
                            <span className="text-display leading-none font-bold text-graphite">{stats.active_links}</span>
                            <Badge variant="success">Active</Badge>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border border-slate/20 bg-pure-white p-20">
                    <CardContent className="p-0 flex flex-col gap-8">
                        <span className="text-caption text-slate font-medium uppercase tracking-tight text-[11px]">Total Clicks</span>
                        <div className="flex items-baseline justify-between">
                            <span className="text-display leading-none font-bold text-graphite">{stats.total_clicks}</span>
                            <div className="size-32 rounded-full bg-frost-gray flex items-center justify-center text-slate">
                                <Eye className="size-16" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="border border-slate/20 bg-pure-white p-20">
                    <CardContent className="p-0 flex flex-col gap-8">
                        <span className="text-caption text-slate font-medium uppercase tracking-tight text-[11px]">Clicks Today</span>
                        <div className="flex items-baseline justify-between">
                            <span className="text-display leading-none font-bold text-graphite">{stats.clicks_today}</span>
                            {stats.clicks_today > 0 ? (
                                <Badge variant="warning">Trending</Badge>
                            ) : (
                                <Badge variant="eyebrow">Quiet</Badge>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* 2. Main Columns */}
            <div className="grid gap-32 grid-cols-1 lg:grid-cols-3">
                {/* Quick Actions (Link Creator) */}
                <div className="lg:col-span-2 flex flex-col gap-16">
                    <Card className="border border-slate/20 bg-pure-white">
                        <CardHeader className="px-20 pt-20 pb-0">
                            <CardTitle className="text-heading-sm font-bold text-graphite">Shorten a URL</CardTitle>
                            <CardDescription>Generate clean, Base62 redirects instantly.</CardDescription>
                        </CardHeader>
                        <CardContent className="px-20 py-20">
                            <form onSubmit={submit} className="flex flex-col gap-20">
                                <div className="flex flex-col gap-8">
                                    <Label htmlFor="destination_url" className="text-caption font-bold text-graphite">Destination URL</Label>
                                    <Input
                                        id="destination_url"
                                        type="url"
                                        placeholder="https://example.com/very-long-campaign-url"
                                        value={data.destination_url}
                                        onChange={(e) => setData('destination_url', e.target.value)}
                                        required
                                        className="h-10 text-body bg-pure-white border-slate/30"
                                    />
                                    <InputError message={errors.destination_url} />
                                </div>

                                <div className="grid gap-16 grid-cols-1 md:grid-cols-2">
                                    <div className="flex flex-col gap-8">
                                        <Label htmlFor="short_code" className="text-caption font-bold text-graphite">Custom Alias (Optional)</Label>
                                        <div className="flex items-center">
                                            <span className="h-10 px-12 inline-flex items-center text-caption text-slate bg-frost-gray border border-r-0 border-slate/30 rounded-l-md font-medium select-none">
                                                singkat.saja/
                                            </span>
                                            <Input
                                                id="short_code"
                                                type="text"
                                                placeholder="alias"
                                                value={data.short_code}
                                                onChange={(e) => setData('short_code', e.target.value)}
                                                className="h-10 text-body bg-pure-white border-slate/30 rounded-l-none"
                                            />
                                        </div>
                                        <InputError message={errors.short_code} />
                                    </div>

                                    <div className="flex flex-col gap-8">
                                        <Label htmlFor="expires_at" className="text-caption font-bold text-graphite">Expiration (Optional)</Label>
                                        <div className="relative flex items-center">
                                            <Input
                                                id="expires_at"
                                                type="datetime-local"
                                                value={data.expires_at}
                                                onChange={(e) => setData('expires_at', e.target.value)}
                                                className="h-10 text-body bg-pure-white border-slate/30"
                                            />
                                        </div>
                                        <InputError message={errors.expires_at} />
                                    </div>
                                </div>

                                <div className="flex justify-end pt-8">
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-vivid-indigo hover:bg-vivid-indigo/90 text-pure-white font-medium"
                                    >
                                        <Plus className="size-16 mr-8" />
                                        Shorten Link
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Links Guide / Quick Links */}
                <div className="flex flex-col gap-16">
                    <Card className="border border-slate/20 bg-pure-white h-full justify-between flex flex-col">
                        <CardHeader className="px-20 pt-20 pb-0">
                            <CardTitle className="text-heading-sm font-bold text-graphite">My Short Links</CardTitle>
                            <CardDescription>Browse, filter, and track performance.</CardDescription>
                        </CardHeader>
                        <CardContent className="px-20 py-20 flex flex-col gap-16">
                            <p className="text-body text-slate leading-relaxed">
                                Detailed click counts, time-series curves for the last 7 and 30 days, and breakdowns by browser, device type, and operating system are housed in the link manager.
                            </p>
                            <div className="flex pt-8">
                                <Button asChild variant="ghost" className="border border-graphite text-graphite hover:bg-frost-gray w-full justify-center">
                                    <Link href={links.index.url()}>
                                        Manage Links <ExternalLink className="size-16 ml-8" />
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
