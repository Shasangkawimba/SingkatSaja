import { AppContent } from '@/components/app-content';
import { AppHeader } from '@/components/app-header';
import { AppShell } from '@/components/app-shell';
import type { AppLayoutProps } from '@/types';

export default function AppHeaderLayout({
    children,
    breadcrumbs,
}: AppLayoutProps) {
    return (
        <AppShell variant="header">
            <div className="relative z-0 flex min-h-screen w-full flex-col">
                <div className="aurora-bg"></div>
                <AppHeader breadcrumbs={breadcrumbs} />
                <AppContent variant="header" className="mx-auto flex h-full w-full max-w-7xl flex-1 flex-col gap-4 rounded-xl mt-6 px-4 sm:px-6 lg:px-8">
                    {children}
                </AppContent>
            </div>
        </AppShell>
    );
}
