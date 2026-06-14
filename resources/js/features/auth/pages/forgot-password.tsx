import { Form, Head } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import InputError from '@/shared/components/input-error';
import TextLink from '@/shared/components/text-link';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { login } from '@/generated/routes';
import { email } from '@/generated/routes/password';

export default function ForgotPassword({ status }: { status?: string }) {
    return (
        <>
            <Head title="Forgot password" />

            {status && (
                <div className="mb-4 text-center text-sm font-medium text-emerald-600">
                    {status}
                </div>
            )}

            <div className="flex flex-col gap-20">
                <Form {...email.form()}>
                    {({ processing, errors }) => (
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
                                    autoComplete="off"
                                    autoFocus
                                    placeholder="email@example.com"
                                    className="h-10 rounded-lg border-neutral-200/80 bg-white text-body focus-visible:border-vivid-indigo focus-visible:ring-vivid-indigo/20"
                                />

                                <InputError message={errors.email} />
                            </div>

                            <Button
                                className="mt-4 h-10 w-full rounded-lg bg-vivid-indigo font-medium text-pure-white shadow-xs hover:bg-vivid-indigo/90"
                                disabled={processing}
                                data-test="email-password-reset-link-button"
                            >
                                {processing && (
                                    <LoaderCircle className="mr-8 h-4 w-4 animate-spin" />
                                )}
                                Email password reset link
                            </Button>
                        </div>
                    )}
                </Form>

                <div className="mt-4 border-t border-neutral-100 pt-16 text-center text-[13px] font-medium text-slate">
                    <span>Or, return to </span>
                    <TextLink
                        href={login()}
                        className="font-bold text-vivid-indigo hover:underline"
                    >
                        log in
                    </TextLink>
                </div>
            </div>
        </>
    );
}

ForgotPassword.layout = {
    title: 'Forgot password',
    description: 'Enter your email to receive a password reset link',
};
