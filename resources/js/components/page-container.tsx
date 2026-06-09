import * as React from 'react';
import { cn } from '@/lib/utils';

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
                'mx-auto w-full max-w-[1200px] px-16 py-20 md:px-32 md:py-32',
                className,
            )}
            {...props}
        >
            {children}
        </div>
    );
}
