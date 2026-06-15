import * as React from 'react';
import { cn } from '@/shared/lib/utils';
import { Card, CardContent } from '@/shared/ui/card';
import { Skeleton } from '@/shared/ui/skeleton';
import { Spinner } from '@/shared/ui/spinner';

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
                    'grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3',
                    className,
                )}
                {...props}
            >
                {Array.from({ length: count }).map((_, i) => (
                    <Card
                        key={i}
                        className="border border-white/20 dark:border-white/5 bg-white/30 dark:bg-black/20 backdrop-blur-md p-6 rounded-2xl"
                    >
                        <CardContent className="flex flex-col gap-4 p-0">
                            <Skeleton className="h-4 w-1/3" />
                            <Skeleton className="h-8 w-2/3" />
                            <div className="mt-4 flex flex-col gap-2">
                                <Skeleton className="h-4 w-full opacity-60" />
                                <Skeleton className="h-4 w-5/6 opacity-60" />
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
                className={cn('flex w-full flex-col gap-4', className)}
                {...props}
            >
                {/* Desktop view skeletons */}
                <div className="hidden lg:flex flex-col">
                    {Array.from({ length: count }).map((_, i) => (
                        <div
                            key={i}
                            className="flex items-center justify-between border-b border-white/10 dark:border-white/5 py-4"
                        >
                            <div className="flex w-1/3 flex-col gap-1.5">
                                <Skeleton className="h-5 w-1/2" />
                                <Skeleton className="h-4 w-3/4 opacity-60" />
                            </div>
                            <div className="flex flex-1 items-center justify-between pl-8">
                                <div className="flex flex-1 items-center justify-center">
                                    <Skeleton className="h-5 w-12" />
                                </div>
                                <div className="flex flex-1 items-center justify-center">
                                    <Skeleton className="h-6.5 w-16 rounded-full" />
                                </div>
                                <div className="flex flex-1 items-center justify-start pl-4">
                                    <Skeleton className="h-5 w-24" />
                                </div>
                                <div className="flex w-24 items-center justify-end">
                                    <Skeleton className="h-9 w-9 rounded-full" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile view skeletons */}
                <div className="flex flex-col gap-4 lg:hidden">
                    {Array.from({ length: count }).map((_, i) => (
                        <div
                            key={i}
                            className="glass-panel p-5 rounded-2xl border border-white/30 dark:border-white/10 shadow-sm flex flex-col gap-4"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Skeleton className="h-8 w-24" />
                                    <Skeleton className="h-8 w-8 rounded-full" />
                                </div>
                                <Skeleton className="h-6.5 w-16 rounded-full" />
                            </div>
                            <div className="flex flex-col gap-2">
                                <Skeleton className="h-3 w-16" />
                                <Skeleton className="h-5 w-3/4" />
                            </div>
                            <div className="flex items-center justify-between border-t border-white/10 dark:border-white/5 pt-4">
                                <Skeleton className="h-4.5 w-32" />
                                <Skeleton className="h-9 w-9 rounded-xl" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div
            className={cn(
                'flex min-h-52 w-full flex-col items-center justify-center gap-6 text-center',
                className,
            )}
            {...props}
        >
            <Spinner className="size-10 text-vivid-indigo" />
            {message && (
                <span className="animate-pulse text-sm font-medium text-muted-foreground">
                    {message}
                </span>
            )}
        </div>
    );
}
