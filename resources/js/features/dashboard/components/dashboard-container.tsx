import * as React from 'react';
import { PageContainer } from '@/shared/components/page-container';
import { SectionHeader } from '@/shared/components/section-header';
import { cn } from '@/shared/lib/utils';

interface DashboardContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    description?: string;
    actions?: React.ReactNode;
    children: React.ReactNode;
}

export function DashboardContainer({
    className,
    title,
    description,
    actions,
    children,
    ...props
}: DashboardContainerProps) {
    return (
        <PageContainer
            className={cn('flex flex-col gap-6 py-5 md:py-8', className)}
            {...props}
        >
            {(title || description || actions) && (
                <div className="flex flex-col justify-between gap-4 border-b border-border/40 pb-5 md:flex-row md:items-end">
                    <SectionHeader
                        title={title}
                        description={description}
                        align="left"
                    />
                    {actions && (
                        <div className="flex shrink-0 items-center gap-3">
                            {actions}
                        </div>
                    )}
                </div>
            )}

            <div className="w-full">{children}</div>
        </PageContainer>
    );
}
