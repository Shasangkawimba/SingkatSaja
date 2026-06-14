import { Form, Head } from '@inertiajs/react';
import { logout } from '@/generated/routes';
import { send } from '@/generated/routes/verification';
import TextLink from '@/shared/components/text-link';
import { Button } from '@/shared/ui/button';
import { Spinner } from '@/shared/ui/spinner';

export default function VerifyEmail({ status }: { status?: string }) {
    return (
        <>
            <Head title="Email verification" />

            {status === 'verification-link-sent' && (
                <div className="mb-20 rounded-lg border border-emerald-100 bg-emerald-50/50 p-12 text-center text-sm font-medium text-emerald-600">
                    A new verification link has been sent to the email address
                    you provided.
                </div>
            )}

            <Form {...send.form()} className="flex flex-col gap-20 text-center">
                {({ processing }) => (
                    <div className="flex flex-col items-center justify-center gap-20">
                        <Button
                            disabled={processing}
                            className="h-10 w-full rounded-lg bg-vivid-indigo font-medium text-pure-white shadow-xs hover:bg-vivid-indigo/90"
                        >
                            {processing && <Spinner className="mr-8 size-16" />}
                            Resend verification email
                        </Button>

                        <div className="mt-4 w-full border-t border-neutral-100 pt-16 text-center text-sm font-medium text-slate">
                            <TextLink
                                href={logout()}
                                className="font-bold text-vivid-indigo hover:underline"
                            >
                                Log out
                            </TextLink>
                        </div>
                    </div>
                )}
            </Form>
        </>
    );
}

VerifyEmail.layout = {
    title: 'Email verification',
    description:
        'Please verify your email address by clicking on the link we just emailed to you.',
};
