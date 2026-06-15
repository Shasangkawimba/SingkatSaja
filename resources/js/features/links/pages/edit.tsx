import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Link as LinkIcon, Zap, Clock, Lock } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';
import { DashboardContainer } from '@/features/dashboard/components/dashboard-container';
import type { LinkEditProps } from '@/features/links/types/link';
import InputError from '@/shared/components/input-error';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';

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
        <DashboardContainer title="" description="" className="pb-12 max-w-3xl mx-auto relative z-10 pt-8">
            <Head title={`Edit Link - ${link.short_code}`} />

            <div className="mb-8 flex">
                <Button asChild variant="ghost" className="text-muted-foreground hover:text-foreground hover:bg-background/50 rounded-full px-6 font-bold h-10">
                    <Link href="/links">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Links
                    </Link>
                </Button>
            </div>

            <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.05)]">
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold tracking-tight text-foreground mb-2">Edit Link</h1>
                    <p className="text-muted-foreground text-lg font-medium">
                        Update destination or expiration for <strong className="font-bold px-2 py-0.5 rounded-lg bg-background/60 border border-white/10 mx-1 text-foreground shadow-sm">{link.short_code}</strong>.
                    </p>
                </div>
                
                <form onSubmit={submit} className="flex flex-col gap-8">
                    <div className="flex flex-col gap-3">
                        <Label htmlFor="destination_url" className="flex items-center gap-1 text-base font-bold text-foreground">
                            Destination URL <span className="text-primary">*</span>
                        </Label>
                        <div className="relative flex items-center group">
                            <LinkIcon className="absolute left-4 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                            <Input
                                id="destination_url"
                                type="url"
                                placeholder="https://example.com/very-long-url"
                                value={data.destination_url}
                                onChange={(e) => setData('destination_url', e.target.value)}
                                required
                                autoFocus
                                className="h-14 pl-12 rounded-2xl bg-background/50 border-white/10 focus-visible:ring-primary/50 text-base shadow-inner"
                            />
                        </div>
                        <p className="text-sm text-muted-foreground font-medium pl-1">The original URL you want to route visitors to.</p>
                        <InputError message={errors.destination_url} className="px-1" />
                    </div>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                        <div className="flex flex-col gap-3">
                            <Label htmlFor="short_code" className="flex items-center gap-2 text-base font-bold text-muted-foreground">
                                Custom Alias <Lock className="h-4 w-4 text-muted-foreground/70" />
                            </Label>
                            <div className="relative flex items-center w-full">
                                <div className="hidden sm:flex h-14 items-center rounded-l-2xl border border-white/10 border-r-0 bg-background/20 px-4 text-sm font-bold text-muted-foreground/70 shadow-inner shrink-0">
                                    singkat.saja/
                                </div>
                                <Input
                                    id="short_code"
                                    type="text"
                                    value={link.short_code}
                                    disabled
                                    className="h-14 rounded-l-2xl sm:rounded-l-none pl-4 pr-12 rounded-r-2xl bg-background/20 border-white/10 text-base shadow-inner cursor-not-allowed opacity-70 w-full"
                                />
                                <Zap className="absolute right-4 h-5 w-5 text-muted-foreground/30" />
                            </div>
                            <p className="text-sm text-muted-foreground/70 font-medium pl-1">Short code cannot be changed.</p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <Label htmlFor="expires_at" className="flex items-center gap-1 text-base font-bold text-foreground">
                                Expiration Date <span className="text-muted-foreground font-medium text-xs ml-1">(Optional)</span>
                            </Label>
                            <div className="relative flex items-center group">
                                <Clock className="absolute left-4 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                                <Input
                                    id="expires_at"
                                    type="datetime-local"
                                    value={data.expires_at}
                                    onChange={(e) => setData('expires_at', e.target.value)}
                                    className="h-14 pl-12 rounded-2xl bg-background/50 border-white/10 focus-visible:ring-primary/50 text-base shadow-inner"
                                />
                            </div>
                            <p className="text-sm text-muted-foreground font-medium pl-1">Auto-expire this link.</p>
                            <InputError message={errors.expires_at} className="px-1" />
                        </div>
                    </div>

                    <div className="mt-4 flex justify-end gap-4 pt-8 border-t border-white/10">
                        <Button asChild variant="outline" className="h-12 px-8 font-bold rounded-xl bg-background/50 border-white/10 hover:bg-background">
                            <Link href="/links">Cancel</Link>
                        </Button>
                        <Button type="submit" disabled={processing} className="h-12 px-8 font-bold rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]">
                            Save Changes
                        </Button>
                    </div>
                </form>
            </div>
        </DashboardContainer>
    );
}
