import { Head, Link, useForm } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import * as React from 'react';
import type { FormEvent } from 'react';
import { register } from '@/generated/routes';
import InputError from '@/shared/components/input-error';
import { AuthSplitLayout } from '@/shared/layouts/auth/auth-split-layout';
import { Button } from '@/shared/ui/button';
import { Checkbox } from '@/shared/ui/checkbox';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';

export default function Login({ status }: { status?: string }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post('/login', {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthSplitLayout
            title="Welcome back"
            description="Enter your credentials to access your account."
        >
            <Head title="Log In" />

            {status && (
                <div className="mb-8 rounded-xl bg-emerald-500/10 p-4 text-sm font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shadow-sm backdrop-blur-md">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="flex flex-col gap-6">
                <div className="grid gap-3">
                    <Label htmlFor="email" className="font-bold text-foreground">Email address</Label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        autoComplete="username"
                        autoFocus
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        className="h-14 rounded-xl bg-white/30 dark:bg-black/20 backdrop-blur-sm border-white/50 dark:border-white/10 focus-visible:ring-primary/50 text-base shadow-inner"
                    />
                    <InputError message={errors.email} />
                </div>

                <div className="grid gap-3">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="password" className="font-bold text-foreground">Password</Label>
                        <Link
                            href="/forgot-password"
                            className="text-sm font-bold text-primary hover:text-primary/80 transition-colors"
                        >
                            Forgot password?
                        </Link>
                    </div>
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                        className="h-14 rounded-xl bg-white/30 dark:bg-black/20 backdrop-blur-sm border-white/50 dark:border-white/10 focus-visible:ring-primary/50 text-base shadow-inner"
                    />
                    <InputError message={errors.password} />
                </div>

                <div className="flex items-center gap-3 mt-2">
                    <Checkbox
                        id="remember"
                        name="remember"
                        checked={data.remember}
                        onCheckedChange={(checked) => setData('remember', checked as boolean)}
                        className="h-5 w-5 rounded-md border-white/40 dark:border-white/20 bg-white/30 dark:bg-black/30 backdrop-blur-sm data-[state=checked]:bg-primary"
                    />
                    <Label htmlFor="remember" className="font-medium text-muted-foreground cursor-pointer text-sm">
                        Remember me for 30 days
                    </Label>
                </div>

                <Button type="submit" disabled={processing} className="w-full mt-4 h-14 font-bold text-base rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-all">
                    {processing && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                    Sign in
                </Button>

                <div className="mt-6 text-center text-sm font-medium text-muted-foreground">
                    Don't have an account?{' '}
                    <Link
                        href={register()}
                        className="font-bold text-primary hover:underline transition-colors"
                    >
                        Sign up
                    </Link>
                </div>
            </form>
        </AuthSplitLayout>
    );
}
