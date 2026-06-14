import { Head, Link, useForm } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import * as React from 'react';
import { FormEvent } from 'react';
import InputError from '@/shared/components/input-error';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { AuthSplitLayout } from '@/shared/layouts/auth/auth-split-layout';
import { login } from '@/generated/routes';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        post('/register', {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthSplitLayout
            title="Create your account"
            description="Start shortening and tracking links in seconds."
        >
            <Head title="Sign Up" />

            <form onSubmit={submit} className="flex flex-col gap-6">
                <div className="grid gap-3">
                    <Label htmlFor="name" className="font-bold text-foreground">Full Name</Label>
                    <Input
                        id="name"
                        name="name"
                        value={data.name}
                        autoComplete="name"
                        autoFocus
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        className="h-14 rounded-xl bg-background/50 border-white/10 focus-visible:ring-primary/50 text-base shadow-inner"
                    />
                    <InputError message={errors.name} />
                </div>

                <div className="grid gap-3">
                    <Label htmlFor="email" className="font-bold text-foreground">Email address</Label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        className="h-14 rounded-xl bg-background/50 border-white/10 focus-visible:ring-primary/50 text-base shadow-inner"
                    />
                    <InputError message={errors.email} />
                </div>

                <div className="grid gap-3">
                    <Label htmlFor="password" className="font-bold text-foreground">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                        className="h-14 rounded-xl bg-background/50 border-white/10 focus-visible:ring-primary/50 text-base shadow-inner"
                    />
                    <InputError message={errors.password} />
                </div>

                <div className="grid gap-3">
                    <Label htmlFor="password_confirmation" className="font-bold text-foreground">Confirm Password</Label>
                    <Input
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        required
                        className="h-14 rounded-xl bg-background/50 border-white/10 focus-visible:ring-primary/50 text-base shadow-inner"
                    />
                    <InputError message={errors.password_confirmation} />
                </div>

                <Button type="submit" disabled={processing} className="w-full mt-4 h-14 font-bold text-base rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-all">
                    {processing && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                    Create account
                </Button>

                <div className="mt-6 text-center text-sm font-medium text-muted-foreground">
                    Already have an account?{' '}
                    <Link
                        href={login()}
                        className="font-bold text-primary hover:underline transition-colors"
                    >
                        Sign in
                    </Link>
                </div>
            </form>
        </AuthSplitLayout>
    );
}
