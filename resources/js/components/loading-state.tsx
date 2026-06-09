import * as React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';
import { cn } from '@/lib/utils';

interface LoadingStateProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'spinner' | 'cards' | 'table';
    count?: number;
    message?: string;
}

export function LoadingState({
    className,
    variant = 'spinner',
    count = 3,
    message = 'Loading...',
    ...props
}: LoadingStateProps) {
    if (variant === 'cards') {
        return (
            <div
                className={cn(
                    'grid w-full grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-3',
                    className,
                )}
                {...props}
            >
                {Array.from({ length: count }).map((_, i) => (
                    <Card
                        key={i}
                        className="border border-slate/20 bg-pure-white p-20"
                    >
                        <CardContent className="flex flex-col gap-16 p-0">
                            <Skeleton className="h-16 w-1/3 bg-slate/10" />
                            <Skeleton className="h-32 w-2/3 bg-slate/10" />
                            <div className="mt-4 flex flex-col gap-8">
                                <Skeleton className="h-12 w-full bg-slate/5" />
                                <Skeleton className="h-12 w-5/6 bg-slate/5" />
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        );
    }

    if (variant === 'table') {
        return (
            <div
                className={cn('flex w-full flex-col gap-16', className)}
                {...props}
            >
                {Array.from({ length: count }).map((_, i) => (
                    <div
                        key={i}
                        className="flex items-center justify-between border-b border-slate/10 py-16"
                    >
                        <div className="flex w-1/2 flex-col gap-8">
                            <Skeleton className="h-16 w-1/3 bg-slate/10" />
                            <Skeleton className="h-12 w-2/3 bg-slate/5" />
                        </div>
                        <div className="flex items-center gap-16">
                            <Skeleton className="h-16 w-48 bg-slate/10" />
                            <Skeleton className="h-20 w-20 rounded-full bg-slate/10" />
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div
            className={cn(
                'flex min-h-[200px] w-full flex-col items-center justify-center gap-12 text-center',
                className,
            )}
            {...props}
        >
            <Spinner className="size-24 text-vivid-indigo" />
            {message && (
                <span className="animate-pulse text-body font-medium text-slate">
                    {message}
                </span>
            )}
        </div>
    );
}
