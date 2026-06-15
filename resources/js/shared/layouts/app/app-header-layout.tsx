import { AppContent } from '@/shared/components/app-content';
import { AppHeader } from '@/shared/components/app-header';
import { AppShell } from '@/shared/components/app-shell';
import type { AppLayoutProps } from '@/shared/types';

export default function AppHeaderLayout({
    children,
    breadcrumbs,
}: AppLayoutProps) {
    return (
        <AppShell variant="header">
            <div className="relative z-0 flex min-h-screen w-full flex-col">
                <div className="aurora-bg"></div>
                <AppHeader breadcrumbs={breadcrumbs} />
                <AppContent variant="header" className="mx-auto flex h-full w-full max-w-7xl flex-1 flex-col gap-4 rounded-xl mt-6 px-0">
                    {children}
                </AppContent>
            </div>
        </AppShell>
    );
}
