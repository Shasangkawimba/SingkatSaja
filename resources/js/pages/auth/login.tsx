import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasskeyVerify from '@/components/passkey-verify';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';

type Props = {
    status?: string;
    canResetPassword: boolean;
};

export default function Login({ status, canResetPassword }: Props) {
    return (
        <>
            <Head title="Log in" />

            <PasskeyVerify />

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="flex flex-col gap-20">
                            <div className="flex flex-col gap-6">
                                <Label
                                    htmlFor="email"
                                    className="text-[11px] font-bold tracking-wider text-graphite uppercase"
                                >
                                    Email address
                                </Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="email"
                                    placeholder="email@example.com"
                                    className="h-10 rounded-lg border-neutral-200/80 bg-white text-body focus-visible:border-vivid-indigo focus-visible:ring-vivid-indigo/20"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="flex flex-col gap-6">
                                <div className="flex items-center justify-between">
                                    <Label
                                        htmlFor="password"
                                        className="text-[11px] font-bold tracking-wider text-graphite uppercase"
                                    >
                                        Password
                                    </Label>
                                    {canResetPassword && (
                                        <TextLink
                                            href={request()}
                                            className="text-[12px] font-medium text-vivid-indigo hover:underline"
                                            tabIndex={5}
                                        >
                                            Forgot your password?
                                        </TextLink>
                                    )}
                                </div>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    required
                                    tabIndex={2}
                                    autoComplete="current-password"
                                    placeholder="Password"
                                    className="h-10 rounded-lg border-neutral-200/80 bg-white text-body focus-visible:border-vivid-indigo focus-visible:ring-vivid-indigo/20"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center space-x-3">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    tabIndex={3}
                                    className="border-neutral-200/80 data-[state=checked]:border-vivid-indigo data-[state=checked]:bg-vivid-indigo"
                                />
                                <Label
                                    htmlFor="remember"
                                    className="text-[13px] font-medium text-slate"
                                >
                                    Remember me
                                </Label>
                            </div>

                            <Button
                                type="submit"
                                className="h-10 w-full rounded-lg bg-vivid-indigo font-medium text-pure-white shadow-xs hover:bg-vivid-indigo/90"
                                tabIndex={4}
                                disabled={processing}
                                data-test="login-button"
                            >
                                {processing && (
                                    <Spinner className="mr-8 size-16" />
                                )}
                                Log in
                            </Button>
                        </div>

                        <div className="mt-4 border-t border-neutral-100 pt-16 text-center text-[13px] font-medium text-slate">
                            Don't have an account?{' '}
                            <TextLink
                                href={register()}
                                className="font-bold text-vivid-indigo hover:underline"
                                tabIndex={5}
                            >
                                Sign up
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>

            {status && (
                <div className="mt-4 text-center text-sm font-medium text-emerald-600">
                    {status}
                </div>
            )}
        </>
    );
}

Login.layout = {
    title: 'Log in to your account',
    description: 'Enter your email and password below to log in',
};
