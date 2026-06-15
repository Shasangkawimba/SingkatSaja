import type { LucideIcon } from 'lucide-react';
import { Monitor, Moon, Sun } from 'lucide-react';
import type { HTMLAttributes } from 'react';
import type { Appearance } from '@/shared/hooks/use-appearance';
import { useAppearance } from '@/shared/hooks/use-appearance';
import { cn } from '@/shared/lib/utils';

export default function AppearanceToggleTab({
    className = '',
    ...props
}: HTMLAttributes<HTMLDivElement>) {
    const { appearance, updateAppearance } = useAppearance();

    const tabs: { value: Appearance; icon: LucideIcon; label: string }[] = [
        { value: 'light', icon: Sun, label: 'Light' },
        { value: 'dark', icon: Moon, label: 'Dark' },
        { value: 'system', icon: Monitor, label: 'System' },
    ];

    return (
        <div
            className={cn(
                'inline-flex gap-1 bg-white/20 dark:bg-black/25 border border-white/20 dark:border-white/10 backdrop-blur-md rounded-2xl p-1',
                className,
            )}
            {...props}
        >
            {tabs.map(({ value, icon: Icon, label }) => (
                <button
                    key={value}
                    onClick={() => updateAppearance(value)}
                    className={cn(
                        'flex items-center rounded-xl px-3.5 py-1.5 transition-all duration-200 cursor-pointer',
                        appearance === value
                            ? 'bg-vivid-indigo text-white shadow-md font-bold'
                            : 'text-neutral-600 hover:bg-white/10 dark:text-neutral-300 dark:hover:bg-white/5',
                    )}
                >
                    <Icon className="-ml-1 h-4 w-4" />
                    <span className="ml-1.5 text-sm">{label}</span>
                </button>
            ))}
        </div>
    );
}
