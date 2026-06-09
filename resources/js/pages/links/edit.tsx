import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';
import { DashboardContainer } from '@/components/dashboard-container';
import InputError from '@/components/input-error';
import { LoadingState } from '@/components/loading-state';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Link as LinkType } from '@/types/link';

interface EditProps {
    link: LinkType;
}

export default function Edit({ link }: EditProps) {
    // Helper to format ISO datetime string to timezone-adjusted input format YYYY-MM-DDTHH:MM
    const formatDateTime = (dateString: string | null) => {
        if (!dateString) {
            return '';
        }

        const d = new Date(dateString);
        const offset = d.getTimezoneOffset() * 60000;

        return new Date(d.getTime() - offset).toISOString().slice(0, 16);
    };

    const { data, setData, patch, processing, errors } = useForm({
        destination_url: link.destination_url,
        expires_at: formatDateTime(link.expires_at),
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        patch(`/links/${link.id}`, {
            onSuccess: () => {
                toast.success('Short link updated successfully.');
            },
        });
    };

    return (
        <DashboardContainer
            title="Edit Short Link"
            description="Modify the target destination or expiration window."
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
            <Head title="Edit Link" />

            <div className="mx-auto mt-20 max-w-xl">
                <Card className="rounded-largecards border border-neutral-200/80 bg-white p-24 shadow-[0_8px_30px_rgb(0,0,0,0.01)] md:p-32">
                    <CardContent className="p-0">
                        {processing ? (
                            <div className="py-48">
                                <LoadingState
                                    variant="spinner"
                                    message="Saving changes..."
                                />
                            </div>
                        ) : (
                            <form
                                id="edit-link-form"
                                onSubmit={submit}
                                className="flex flex-col gap-24"
                            >
                                <div className="flex flex-col gap-6">
                                    <Label
                                        htmlFor="short_code"
                                        className="text-[12px] font-bold tracking-wider text-slate uppercase"
                                    >
                                        Short Code / Alias
                                    </Label>
                                    <Input
                                        id="short_code"
                                        type="text"
                                        value={link.short_code}
                                        disabled
                                        className="h-10 cursor-not-allowed rounded-lg border-neutral-200/80 bg-frost-gray/50 text-body font-bold text-slate opacity-80 select-none"
                                    />
                                    <span className="text-[11px] font-medium text-slate">
                                        The shortened alias URL path cannot be
                                        modified after creation.
                                    </span>
                                </div>

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
                                        Must start with http:// or https://
                                    </span>
                                </div>

                                <div className="flex flex-col gap-6">
                                    <Label
                                        htmlFor="expires_at"
                                        className="text-[12px] font-bold tracking-wider text-graphite uppercase"
                                    >
                                        Expiration Date
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
                                        After this timestamp, redirects
                                        automatically fail with 404.
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
                                        <Save className="mr-8 size-16" />
                                        Save Changes
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
