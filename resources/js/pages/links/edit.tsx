import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Link as LinkIcon, Zap, Clock, Lock } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';
import { DashboardContainer } from '@/components/dashboard-container';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { LinkEditProps } from '@/types/link';

export default function Edit({ link }: LinkEditProps) {
    const { data, setData, put, processing, errors } = useForm({
        destination_url: link.destination_url,
        expires_at: link.expires_at ? link.expires_at.slice(0, 16) : '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/links/${link.id}`, {
            onSuccess: () => toast.success('Link updated successfully.'),
        });
    };

    return (
        <DashboardContainer title="" description="" className="pb-12 max-w-3xl mx-auto">
            <Head title={`Edit Link - ${link.short_code}`} />

            <div className="mb-6 flex">
                <Button asChild variant="ghost" size="sm" className="h-8 pl-2 pr-4 text-xs text-muted-foreground hover:text-foreground">
                    <Link href="/links">
                        <ArrowLeft className="mr-1.5 h-3 w-3" />
                        Back to Links
                    </Link>
                </Button>
            </div>

            <Card className="border-border/40 bg-card shadow-sm">
                <CardHeader className="border-b border-border/40 px-6 py-6">
                    <CardTitle className="text-xl">Edit short link</CardTitle>
                    <CardDescription>
                        Update the destination or expiration for <strong className="text-foreground">{link.short_code}</strong>.
                    </CardDescription>
                </CardHeader>
                
                <CardContent className="p-6">
                    <form onSubmit={submit} className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="destination_url" className="text-sm font-semibold">
                                Destination URL <span className="text-destructive">*</span>
                            </Label>
                            <div className="relative flex items-center">
                                <LinkIcon className="absolute left-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    id="destination_url"
                                    type="url"
                                    placeholder="https://example.com/very-long-url-that-needs-shortening"
                                    value={data.destination_url}
                                    onChange={(e) => setData('destination_url', e.target.value)}
                                    required
                                    autoFocus
                                    className="pl-9 h-11"
                                />
                            </div>
                            <p className="text-xs text-muted-foreground">The original URL you want to route visitors to.</p>
                            <InputError message={errors.destination_url} />
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <div className="flex flex-col gap-2 opacity-60">
                                <Label htmlFor="short_code" className="text-sm font-semibold flex items-center gap-1.5">
                                    Custom Alias <Lock className="h-3 w-3" />
                                </Label>
                                <div className="relative flex items-center">
                                    <div className="flex h-11 items-center rounded-l-md border border-r-0 border-border/40 bg-muted/50 px-3 text-sm text-muted-foreground">
                                        singkat.saja/
                                    </div>
                                    <Input
                                        id="short_code"
                                        type="text"
                                        value={link.short_code}
                                        disabled
                                        className="h-11 rounded-l-none pl-3 bg-muted/30"
                                    />
                                    <Zap className="absolute right-3 h-4 w-4 text-muted-foreground/50" />
                                </div>
                                <p className="text-xs text-muted-foreground">Short code cannot be changed after creation.</p>
                            </div>

                            <div className="flex flex-col gap-2">
                                <Label htmlFor="expires_at" className="text-sm font-semibold">
                                    Expiration Date <span className="text-muted-foreground font-normal ml-1">(Optional)</span>
                                </Label>
                                <div className="relative flex items-center">
                                    <Input
                                        id="expires_at"
                                        type="datetime-local"
                                        value={data.expires_at}
                                        onChange={(e) => setData('expires_at', e.target.value)}
                                        className="h-11 pl-10"
                                    />
                                    <Clock className="absolute left-3 h-4 w-4 text-muted-foreground" />
                                </div>
                                <p className="text-xs text-muted-foreground">Automatically expire this link after a date.</p>
                                <InputError message={errors.expires_at} />
                            </div>
                        </div>

                        <div className="mt-4 flex justify-end gap-3 pt-4 border-t border-border/40">
                            <Button asChild variant="outline" className="h-10 px-6">
                                <Link href="/links">Cancel</Link>
                            </Button>
                            <Button type="submit" disabled={processing} className="h-10 px-6 font-semibold">
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </DashboardContainer>
    );
}
