import * as React from 'react';
import { PageContainer } from '@/components/page-container';
import { SectionHeader } from '@/components/section-header';
import { cn } from '@/lib/utils';

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
            className={cn('flex flex-col gap-32', className)}
            {...props}
        >
            <div className="flex flex-col justify-between gap-16 border-b border-slate/10 pb-20 md:flex-row md:items-center">
                <SectionHeader
                    title={title}
                    description={description}
                    align="left"
                />
                {actions && (
                    <div className="flex shrink-0 items-center gap-16 md:mt-24">
                        {actions}
                    </div>
                )}
            </div>

            <div className="w-full">{children}</div>
        </PageContainer>
    );
}
