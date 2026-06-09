import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Plus } from 'lucide-react';
import { toast } from 'sonner';
import { DashboardContainer } from '@/components/dashboard-container';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoadingState } from '@/components/loading-state';
import InputError from '@/components/input-error';

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
                <Button asChild variant="ghost" className="border border-slate/30 text-graphite hover:bg-frost-gray font-medium">
                    <Link href="/links">
                        <ArrowLeft className="size-16 mr-8" />
                        Back to Links
                    </Link>
                </Button>
            }
        >
            <Head title="Create Link" />

            <div className="max-w-xl mx-auto mt-16">
                <Card className="border border-slate/20 bg-pure-white p-20 md:p-32">
                    <CardContent className="p-0">
                        {processing ? (
                            <div className="py-40">
                                <LoadingState variant="spinner" message="Generating short link..." />
                            </div>
                        ) : (
                            <form onSubmit={submit} className="flex flex-col gap-24">
                                <div className="flex flex-col gap-8">
                                    <Label htmlFor="destination_url" className="text-caption font-bold text-graphite">Destination URL</Label>
                                    <Input
                                        id="destination_url"
                                        type="url"
                                        placeholder="https://example.com/long-target-url"
                                        value={data.destination_url}
                                        onChange={(e) => setData('destination_url', e.target.value)}
                                        required
                                        className="h-10 text-body bg-pure-white border-slate/30"
                                    />
                                    <InputError message={errors.destination_url} />
                                </div>

                                <div className="flex flex-col gap-8">
                                    <Label htmlFor="short_code" className="text-caption font-bold text-graphite">Custom Alias (Optional)</Label>
                                    <div className="flex items-center">
                                        <span className="h-10 px-12 inline-flex items-center text-caption text-slate bg-frost-gray border border-r-0 border-slate/30 rounded-l-md font-medium select-none">
                                            singkat.saja/
                                        </span>
                                        <Input
                                            id="short_code"
                                            type="text"
                                            placeholder="custom-name"
                                            value={data.short_code}
                                            onChange={(e) => setData('short_code', e.target.value)}
                                            className="h-10 text-body bg-pure-white border-slate/30 rounded-l-none"
                                        />
                                    </div>
                                    <InputError message={errors.short_code} />
                                </div>

                                <div className="flex flex-col gap-8">
                                    <Label htmlFor="expires_at" className="text-caption font-bold text-graphite">Expiration (Optional)</Label>
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
                                        <Plus className="size-16 mr-8" />
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
