import type { LucideIcon } from 'lucide-react';
import { LinkIcon } from 'lucide-react';
import * as React from 'react';
import { cn } from '@/lib/utils';

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
                'mx-auto flex w-full max-w-xl flex-col items-center justify-center gap-20 rounded-largecards border border-dashed border-slate/30 bg-frost-gray/30 p-32 text-center md:p-48',
                className,
            )}
            {...props}
        >
            <div className="flex size-48 items-center justify-center rounded-full bg-pale-lilac text-vivid-indigo dark:bg-pale-lilac/10 dark:text-pure-white">
                <Icon className="size-24 stroke-[1.5]" />
            </div>

            <div className="flex flex-col gap-8">
                <h3 className="text-heading-sm font-bold text-graphite dark:text-pure-white">
                    {title}
                </h3>
                <p className="max-w-sm text-body leading-relaxed text-slate dark:text-soft-violet">
                    {description}
                </p>
            </div>

            {action && (
                <div className="mt-8 flex items-center justify-center">
                    {action}
                </div>
            )}
        </div>
    );
}
