import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';
import { toast } from 'sonner';
import { DashboardContainer } from '@/components/dashboard-container';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoadingState } from '@/components/loading-state';
import InputError from '@/components/input-error';
import type { Link as LinkType } from '@/types/link';

interface EditProps {
    link: LinkType;
}

export default function Edit({ link }: EditProps) {
    // Helper to format ISO datetime string to timezone-adjusted input format YYYY-MM-DDTHH:MM
    const formatDateTime = (dateString: string | null) => {
        if (!dateString) return '';
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
                <Button asChild variant="ghost" className="border border-slate/30 text-graphite hover:bg-frost-gray font-medium">
                    <Link href="/links">
                        <ArrowLeft className="size-16 mr-8" />
                        Back to Links
                    </Link>
                </Button>
            }
        >
            <Head title="Edit Link" />

            <div className="max-w-xl mx-auto mt-16">
                <Card className="border border-slate/20 bg-pure-white p-20 md:p-32">
                    <CardContent className="p-0">
                        {processing ? (
                            <div className="py-40">
                                <LoadingState variant="spinner" message="Saving changes..." />
                            </div>
                        ) : (
                            <form onSubmit={submit} className="flex flex-col gap-24">
                                <div className="flex flex-col gap-8">
                                    <Label htmlFor="short_code" className="text-caption font-bold text-slate">Short Code / Alias</Label>
                                    <Input
                                        id="short_code"
                                        type="text"
                                        value={link.short_code}
                                        disabled
                                        className="h-10 text-body bg-frost-gray border-slate/30 cursor-not-allowed font-bold text-slate select-none opacity-80"
                                    />
                                    <span className="text-[12px] text-slate">
                                        The shortened alias URL path cannot be modified after creation.
                                    </span>
                                </div>

                                <div className="flex flex-col gap-8">
                                    <Label htmlFor="destination_url" className="text-caption font-bold text-graphite">Destination URL</Label>
                                    <Input
                                        id="destination_url"
                                        type="url"
                                        value={data.destination_url}
                                        onChange={(e) => setData('destination_url', e.target.value)}
                                        required
                                        className="h-10 text-body bg-pure-white border-slate/30"
                                    />
                                    <InputError message={errors.destination_url} />
                                </div>

                                <div className="flex flex-col gap-8">
                                    <Label htmlFor="expires_at" className="text-caption font-bold text-graphite">Expiration Window</Label>
                                    <Input
                                        id="expires_at"
                                        type="datetime-local"
                                        value={data.expires_at}
                                        onChange={(e) => setData('expires_at', e.target.value)}
                                        className="h-10 text-body bg-pure-white border-slate/30"
                                    />
                                    <InputError message={errors.expires_at} />
                                </div>

                                <div className="flex justify-end pt-12 border-t border-slate/10 gap-12">
                                    <Button asChild variant="ghost" className="border border-slate/30 text-graphite hover:bg-frost-gray font-medium">
                                        <Link href="/links">
                                            Cancel
                                        </Link>
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={processing}
                                        className="bg-vivid-indigo hover:bg-vivid-indigo/90 text-pure-white font-medium"
                                    >
                                        <Save className="size-16 mr-8" />
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
