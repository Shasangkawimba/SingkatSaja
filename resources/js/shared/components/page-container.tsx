import * as React from 'react';
import { cn } from '@/shared/lib/utils';

interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
}

export function PageContainer({
    className,
    children,
    ...props
}: PageContainerProps) {
    return (
        <div
            className={cn(
                'mx-auto w-full max-w-7xl px-4 md:px-8',
                className,
            )}
            {...props}
        >
            {children}
        </div>
    );
}
