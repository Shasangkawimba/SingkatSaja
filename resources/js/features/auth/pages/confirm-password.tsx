import { Form, Head } from '@inertiajs/react';
import {
    index as confirmOptions,
    store as confirmStore,
} from '@/generated/actions/Laravel/Passkeys/Http/Controllers/PasskeyConfirmationController';
import InputError from '@/shared/components/input-error';
import PasskeyVerify from '@/features/settings/components/passkey-verify';
import PasswordInput from '@/shared/components/password-input';
import { Button } from '@/shared/ui/button';
import { Label } from '@/shared/ui/label';
import { Spinner } from '@/shared/ui/spinner';
import { store } from '@/generated/routes/password/confirm';

export default function ConfirmPassword() {
    return (
        <>
            <Head title="Confirm password" />

            <PasskeyVerify
                routes={{
                    options: confirmOptions(),
                    submit: confirmStore(),
                }}
                label="Confirm with passkey"
                loadingLabel="Confirming..."
                separator="Or confirm with password"
            />

            <Form {...store.form()} resetOnSuccess={['password']}>
                {({ processing, errors }) => (
                    <div className="flex flex-col gap-20">
                        <div className="flex flex-col gap-6">
                            <Label
                                htmlFor="password"
                                className="text-[11px] font-bold tracking-wider text-graphite uppercase"
                            >
                                Password
                            </Label>
                            <PasswordInput
                                id="password"
                                name="password"
                                placeholder="Password"
                                autoComplete="current-password"
                                autoFocus
                                className="h-10 rounded-lg border-neutral-200/80 bg-white text-body focus-visible:border-vivid-indigo focus-visible:ring-vivid-indigo/20"
                            />

                            <InputError message={errors.password} />
                        </div>

                        <Button
                            className="mt-4 h-10 w-full rounded-lg bg-vivid-indigo font-medium text-pure-white shadow-xs hover:bg-vivid-indigo/90"
                            disabled={processing}
                            data-test="confirm-password-button"
                        >
                            {processing && <Spinner className="mr-8 size-16" />}
                            Confirm password
                        </Button>
                    </div>
                )}
            </Form>
        </>
    );
}

ConfirmPassword.layout = {
    title: 'Confirm password',
    description:
        'This is a secure area of the application. Please confirm your password before continuing.',
};
