import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Zap } from 'lucide-react';
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
                    className="h-9 rounded-lg border border-neutral-200/80 text-[13px] font-medium text-graphite hover:bg-frost-gray"
                >
                    <Link href="/links">
                        <ArrowLeft className="size-3.5" />
                        Back to Links
                    </Link>
                </Button>
            }
        >
            <Head title="Create Link" />

            <div className="mx-auto max-w-lg">
                <Card className="rounded-xl border border-neutral-200/60 bg-white shadow-none">
                    <CardContent className="p-6">
                        {processing ? (
                            <div className="py-10">
                                <LoadingState
                                    variant="spinner"
                                    message="Generating short link..."
                                />
                            </div>
                        ) : (
                            <form
                                id="create-link-form"
                                onSubmit={submit}
                                className="flex flex-col gap-5"
                            >
                                {/* Form Header */}
                                <div className="flex items-center gap-2.5 border-b border-neutral-100 pb-4">
                                    <div className="flex size-8 items-center justify-center rounded-lg bg-vivid-indigo/10 text-vivid-indigo">
                                        <Zap className="size-4" />
                                    </div>
                                    <div>
                                        <p className="text-[13px] font-bold text-graphite">
                                            New Short Link
                                        </p>
                                        <p className="text-[11px] text-slate">
                                            Configure your destination and alias options below.
                                        </p>
                                    </div>
                                </div>

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
                                        placeholder="https://example.com/long-target-url"
                                        value={data.destination_url}
                                        onChange={(e) =>
                                            setData(
                                                'destination_url',
                                                e.target.value,
                                            )
                                        }
                                        required
                                        className="h-9 rounded-lg border-neutral-200/80 bg-white text-[14px] focus-visible:border-vivid-indigo focus-visible:ring-vivid-indigo/20"
                                    />
                                    <InputError
                                        message={errors.destination_url}
                                    />
                                    <span className="text-[11px] text-slate/70">
                                        The target URL. Must start with http:// or https://
                                    </span>
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <Label
                                        htmlFor="short_code"
                                        className="text-[11px] font-bold tracking-widest text-graphite uppercase"
                                    >
                                        Custom Alias
                                        <span className="ml-1 font-normal text-slate/60 normal-case tracking-normal">
                                            (optional)
                                        </span>
                                    </Label>
                                    <div className="flex items-center">
                                        <span className="inline-flex h-9 items-center rounded-l-lg border border-r-0 border-neutral-200/80 bg-frost-gray/60 px-3 text-[12px] font-medium text-slate select-none">
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
                                            className="h-9 rounded-l-none rounded-r-lg border-neutral-200/80 bg-white text-[14px] focus-visible:border-vivid-indigo focus-visible:ring-vivid-indigo/20"
                                        />
                                    </div>
                                    <InputError message={errors.short_code} />
                                    <span className="text-[11px] text-slate/70">
                                        Alphanumeric only. Cannot match reserved paths (admin, dashboard, etc).
                                    </span>
                                </div>

                                <div className="flex flex-col gap-1.5">
                                    <Label
                                        htmlFor="expires_at"
                                        className="text-[11px] font-bold tracking-widest text-graphite uppercase"
                                    >
                                        Expiration Date
                                        <span className="ml-1 font-normal text-slate/60 normal-case tracking-normal">
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
                                        className="h-9 rounded-lg border-neutral-200/80 bg-white text-[14px] focus-visible:border-vivid-indigo focus-visible:ring-vivid-indigo/20"
                                    />
                                    <InputError message={errors.expires_at} />
                                    <span className="text-[11px] text-slate/70">
                                        After this timestamp, redirects return 404.
                                    </span>
                                </div>

                                <div className="flex justify-end gap-2.5 border-t border-neutral-100 pt-4">
                                    <Button
                                        asChild
                                        variant="ghost"
                                        className="h-9 rounded-lg border border-neutral-200/80 px-4 text-[13px] font-medium text-graphite hover:bg-neutral-50"
                                    >
                                        <Link href="/links">Cancel</Link>
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="h-9 rounded-lg bg-vivid-indigo px-5 text-[13px] font-medium text-pure-white shadow-none transition-all hover:bg-vivid-indigo/90 hover:shadow-sm active:scale-[0.98]"
                                    >
                                        <Zap className="size-3.5" />
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
