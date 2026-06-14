import type { LucideIcon } from 'lucide-react';
import { LinkIcon } from 'lucide-react';
import * as React from 'react';
import { cn } from '@/shared/lib/utils';

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    description: string;
    icon?: LucideIcon;
    action?: React.ReactNode;
}

export function EmptyState({
    className,
    title,
    description,
    icon: Icon = LinkIcon,
    action,
    ...props
}: EmptyStateProps) {
    return (
        <div
            className={cn(
                'glass-panel mx-auto flex w-full max-w-xl flex-col items-center justify-center gap-6 rounded-3xl border border-dashed border-slate/30 p-8 text-center md:p-12 shadow-sm',
                className,
            )}
            {...props}
        >
            <div className="flex size-16 items-center justify-center rounded-full bg-pale-lilac text-vivid-indigo dark:bg-pale-lilac/10 dark:text-pure-white">
                <Icon className="size-8 stroke-[1.5]" />
            </div>

            <div className="flex flex-col gap-2">
                <h3 className="text-xl font-bold text-foreground">
                    {title}
                </h3>
                <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                    {description}
                </p>
            </div>

            {action && (
                <div className="mt-2 flex items-center justify-center">
                    {action}
                </div>
            )}
        </div>
    );
}
