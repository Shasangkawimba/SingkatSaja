import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Plus } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';
import { DashboardContainer } from '@/components/dashboard-container';
import InputError from '@/components/input-error';
import { LoadingState } from '@/components/loading-state';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        destination_url: '',
        short_code: '',
        expires_at: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/links', {
            onSuccess: () => {
                toast.success('Short link generated successfully.');
            },
        });
    };

    return (
        <DashboardContainer
            title="Create Short Link"
            description="Shorten target URLs and configure custom options."
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
            <Head title="Create Link" />

            <div className="mx-auto mt-20 max-w-xl">
                <Card className="rounded-largecards border border-neutral-200/80 bg-white p-24 shadow-[0_8px_30px_rgb(0,0,0,0.01)] md:p-32">
                    <CardContent className="p-0">
                        {processing ? (
                            <div className="py-48">
                                <LoadingState
                                    variant="spinner"
                                    message="Generating short link..."
                                />
                            </div>
                        ) : (
                            <form
                                id="create-link-form"
                                onSubmit={submit}
                                className="flex flex-col gap-24"
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
                                        placeholder="https://example.com/long-target-url"
                                        value={data.destination_url}
                                        onChange={(e) =>
                                            setData(
                                                'destination_url',
                                                e.target.value,
                                            )
                                        }
                                        required
                                        className="h-10 rounded-lg border-neutral-200/80 bg-white text-body focus-visible:border-vivid-indigo focus-visible:ring-vivid-indigo/20"
                                    />
                                    <InputError
                                        message={errors.destination_url}
                                    />
                                    <span className="text-[11px] font-medium text-slate">
                                        The target URL to redirect visitors to.
                                        Must start with http:// or https://
                                    </span>
                                </div>

                                <div className="flex flex-col gap-6">
                                    <Label
                                        htmlFor="short_code"
                                        className="text-[12px] font-bold tracking-wider text-graphite uppercase"
                                    >
                                        Custom Alias (Optional)
                                    </Label>
                                    <div className="flex items-center">
                                        <span className="inline-flex h-10 items-center rounded-l-lg border border-r-0 border-neutral-200/80 bg-frost-gray/50 px-12 text-[13px] text-caption font-medium text-slate select-none">
                                            singkat.saja/
                                        </span>
                                        <Input
                                            id="short_code"
                                            type="text"
                                            placeholder="custom-name"
                                            value={data.short_code}
                                            onChange={(e) =>
                                                setData(
                                                    'short_code',
                                                    e.target.value,
                                                )
                                            }
                                            className="h-10 rounded-l-none rounded-r-lg border-neutral-200/80 bg-white text-body focus-visible:border-vivid-indigo focus-visible:ring-vivid-indigo/20"
                                        />
                                    </div>
                                    <InputError message={errors.short_code} />
                                    <span className="text-[11px] font-medium text-slate">
                                        Custom names must be alphanumeric and
                                        cannot match system paths (like admin,
                                        dashboard).
                                    </span>
                                </div>

                                <div className="flex flex-col gap-6">
                                    <Label
                                        htmlFor="expires_at"
                                        className="text-[12px] font-bold tracking-wider text-graphite uppercase"
                                    >
                                        Expiration Date (Optional)
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
                                        className="h-10 rounded-lg border-neutral-200/80 bg-white text-body focus-visible:border-vivid-indigo focus-visible:ring-vivid-indigo/20"
                                    />
                                    <InputError message={errors.expires_at} />
                                    <span className="text-[11px] font-medium text-slate">
                                        After this timestamp, the shortcode
                                        resolves to a 404 response.
                                    </span>
                                </div>

                                <div className="mt-8 flex justify-end gap-12 border-t border-neutral-100 pt-20">
                                    <Button
                                        asChild
                                        variant="ghost"
                                        className="h-10 rounded-lg border border-neutral-200 px-16 font-medium text-graphite hover:bg-neutral-50"
                                    >
                                        <Link href="/links">Cancel</Link>
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="h-10 rounded-lg bg-vivid-indigo px-20 font-medium text-pure-white shadow-xs hover:bg-vivid-indigo/90"
                                    >
                                        <Plus className="mr-8 size-16" />
                                        Generate Link
                                    </Button>
                                </div>
                            </form>
                        )}
                    </CardContent>
                </Card>
            </div>
        </DashboardContainer>
    );
}
