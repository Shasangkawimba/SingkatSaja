import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { initializeTheme } from '@/shared/hooks/use-appearance';
import AppLayout from '@/shared/layouts/app-layout';
import AuthLayout from '@/shared/layouts/auth-layout';
import SettingsLayout from '@/shared/layouts/settings/layout';
import { Toaster } from '@/shared/ui/sonner';
import { TooltipProvider } from '@/shared/ui/tooltip';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) => {
        let path = '';

        if (name === 'welcome' || name === 'error') {
            path = `./pages/${name}.tsx`;
        } else if (name === 'dashboard') {
            path = `./features/dashboard/pages/dashboard.tsx`;
        } else {
            const [feature, page] = name.split('/');
            path = `./features/${feature}/pages/${page}.tsx`;
        }

        return resolvePageComponent(
            path,
            import.meta.glob(['./features/**/*.tsx', './pages/**/*.tsx'])
        );
    },
    layout: (name) => {
        switch (true) {
            case name === 'welcome':
                return null;
            case name.startsWith('auth/'):
                return AuthLayout;
            case name.startsWith('settings/'):
                return [AppLayout, SettingsLayout];
            default:
                return AppLayout;
        }
    },
    strictMode: true,
    withApp(app) {
        return (
            <TooltipProvider delayDuration={0}>
                {app}
                <Toaster />
            </TooltipProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
