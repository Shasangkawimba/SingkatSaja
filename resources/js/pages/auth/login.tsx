import { Head, Link, useForm } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import * as React from 'react';
import { FormEvent } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthSplitLayout } from '@/layouts/auth/auth-split-layout';
import { register } from '@/routes';

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
                <div className="mb-4 text-sm font-medium text-emerald-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="flex flex-col gap-5">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email address</Label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        autoComplete="username"
                        autoFocus
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    <InputError message={errors.email} />
                </div>

                <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link
                            href="/forgot-password"
                            className="text-xs font-medium text-muted-foreground hover:text-foreground"
                        >
                            Forgot your password?
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
                    />
                    <InputError message={errors.password} />
                </div>

                <div className="flex items-center gap-2">
                    <Checkbox
                        id="remember"
                        name="remember"
                        checked={data.remember}
                        onCheckedChange={(checked) => setData('remember', checked as boolean)}
                    />
                    <Label htmlFor="remember" className="font-normal text-muted-foreground cursor-pointer">
                        Remember me for 30 days
                    </Label>
                </div>

                <Button type="submit" disabled={processing} className="w-full">
                    {processing && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Sign in to your account
                </Button>

                <div className="mt-4 text-center text-sm">
                    <span className="text-muted-foreground">Don't have an account? </span>
                    <Link
                        href={register()}
                        className="font-medium text-foreground hover:underline"
                    >
                        Sign up
                    </Link>
                </div>
            </form>
        </AuthSplitLayout>
    );
}
