import * as React from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    eyebrow?: string | React.ReactNode;
    title: string | React.ReactNode;
    description?: string | React.ReactNode;
    actions?: React.ReactNode;
    align?: 'left' | 'center';
    isHero?: boolean;
}

export function SectionHeader({
    className,
    eyebrow,
    title,
    description,
    actions,
    align = 'left',
    isHero = false,
    ...props
}: SectionHeaderProps) {
    const isCentered = align === 'center';

    return (
        <div
            className={cn(
                'flex flex-col gap-2',
                isCentered
                    ? 'mx-auto max-w-2xl items-center text-center'
                    : 'items-start',
                className,
            )}
            {...props}
        >
            {eyebrow && (
                <div data-slot="section-header-eyebrow">
                    {typeof eyebrow === 'string' ? (
                        <Badge variant="eyebrow">{eyebrow}</Badge>
                    ) : (
                        eyebrow
                    )}
                </div>
            )}

            <div className="flex flex-col gap-1">
                <h2
                    className={cn(
                        'font-bold tracking-[-0.02em] text-graphite dark:text-pure-white',
                        isHero
                            ? 'text-heading-lg leading-none md:text-display'
                            : 'text-heading-sm leading-tight md:text-heading',
                    )}
                >
                    {title}
                </h2>

                {description && (
                    <p className="max-w-xl text-sm leading-relaxed text-slate dark:text-soft-violet">
                        {description}
                    </p>
                )}
            </div>

            {actions && (
                <div
                    className={cn(
                        'flex flex-wrap items-center gap-8',
                        isCentered ? 'justify-center' : 'justify-start',
                    )}
                >
                    {actions}
                </div>
            )}
        </div>
    );
}
