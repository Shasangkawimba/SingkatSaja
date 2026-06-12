import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Link as LinkIcon, Zap, Clock } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';
import { DashboardContainer } from '@/components/dashboard-container';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
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
            onSuccess: () => toast.success('Link created successfully.'),
        });
    };

    return (
        <DashboardContainer title="" description="" className="pb-12 max-w-3xl mx-auto relative z-10 pt-8">
            <Head title="Create Link" />

            <div className="mb-8 flex">
                <Button asChild variant="ghost" className="text-muted-foreground hover:text-foreground hover:bg-background/50 rounded-full px-6 font-bold h-10">
                    <Link href="/links">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Links
                    </Link>
                </Button>
            </div>

            <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.05)]">
                <div className="mb-8">
                    <h1 className="text-3xl font-extrabold tracking-tight text-foreground mb-2">Create Link</h1>
                    <p className="text-muted-foreground text-lg font-medium">
                        Generate a new high-speed redirect.
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
                            <Label htmlFor="short_code" className="flex items-center gap-1 text-base font-bold text-foreground">
                                Custom Alias <span className="text-muted-foreground font-medium text-xs ml-1">(Optional)</span>
                            </Label>
                            <div className="relative flex items-center group">
                                <div className="flex h-14 items-center rounded-l-2xl border border-white/10 border-r-0 bg-background/30 px-4 text-sm font-bold text-muted-foreground shadow-inner">
                                    singkat.saja/
                                </div>
                                <Input
                                    id="short_code"
                                    type="text"
                                    placeholder="summer-sale"
                                    value={data.short_code}
                                    onChange={(e) => setData('short_code', e.target.value)}
                                    className="h-14 rounded-l-none pl-4 rounded-r-2xl bg-background/50 border-white/10 focus-visible:ring-primary/50 text-base shadow-inner"
                                />
                                <Zap className="absolute right-4 h-5 w-5 text-primary/50 group-focus-within:text-primary transition-colors" />
                            </div>
                            <p className="text-sm text-muted-foreground font-medium pl-1">Leave empty for a random code.</p>
                            <InputError message={errors.short_code} className="px-1" />
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
                            Create Link
                        </Button>
                    </div>
                </form>
            </div>
        </DashboardContainer>
    );
}
