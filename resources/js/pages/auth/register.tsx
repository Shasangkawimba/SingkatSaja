import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { store } from '@/routes/register';

type Props = {
    passwordRules: string;
};

export default function Register({ passwordRules }: Props) {
    return (
        <>
            <Head title="Register" />
            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="flex flex-col gap-20">
                            <div className="flex flex-col gap-6">
                                <Label
                                    htmlFor="name"
                                    className="text-[11px] font-bold tracking-wider text-graphite uppercase"
                                >
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    autoComplete="name"
                                    name="name"
                                    placeholder="Full name"
                                    className="h-10 rounded-lg border-neutral-200/80 bg-white text-body focus-visible:border-vivid-indigo focus-visible:ring-vivid-indigo/20"
                                />
                                <InputError message={errors.name} />
                            </div>

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
                                    required
                                    tabIndex={2}
                                    autoComplete="email"
                                    name="email"
                                    placeholder="email@example.com"
                                    className="h-10 rounded-lg border-neutral-200/80 bg-white text-body focus-visible:border-vivid-indigo focus-visible:ring-vivid-indigo/20"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div className="flex flex-col gap-6">
                                <Label
                                    htmlFor="password"
                                    className="text-[11px] font-bold tracking-wider text-graphite uppercase"
                                >
                                    Password
                                </Label>
                                <PasswordInput
                                    id="password"
                                    required
                                    tabIndex={3}
                                    autoComplete="new-password"
                                    name="password"
                                    placeholder="Password"
                                    passwordrules={passwordRules}
                                    className="h-10 rounded-lg border-neutral-200/80 bg-white text-body focus-visible:border-vivid-indigo focus-visible:ring-vivid-indigo/20"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex flex-col gap-6">
                                <Label
                                    htmlFor="password_confirmation"
                                    className="text-[11px] font-bold tracking-wider text-graphite uppercase"
                                >
                                    Confirm password
                                </Label>
                                <PasswordInput
                                    id="password_confirmation"
                                    required
                                    tabIndex={4}
                                    autoComplete="new-password"
                                    name="password_confirmation"
                                    placeholder="Confirm password"
                                    passwordrules={passwordRules}
                                    className="h-10 rounded-lg border-neutral-200/80 bg-white text-body focus-visible:border-vivid-indigo focus-visible:ring-vivid-indigo/20"
                                />
                                <InputError
                                    message={errors.password_confirmation}
                                />
                            </div>

                            <Button
                                type="submit"
                                className="mt-4 h-10 w-full rounded-lg bg-vivid-indigo font-medium text-pure-white shadow-xs hover:bg-vivid-indigo/90"
                                tabIndex={5}
                                data-test="register-user-button"
                                disabled={processing}
                            >
                                {processing && (
                                    <Spinner className="mr-8 size-16" />
                                )}
                                Create account
                            </Button>
                        </div>

                        <div className="mt-4 border-t border-neutral-100 pt-16 text-center text-[13px] font-medium text-slate">
                            Already have an account?{' '}
                            <TextLink
                                href={login()}
                                className="font-bold text-vivid-indigo hover:underline"
                                tabIndex={6}
                            >
                                Log in
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </>
    );
}

Register.layout = {
    title: 'Create an account',
    description: 'Enter your details below to create your account',
};
