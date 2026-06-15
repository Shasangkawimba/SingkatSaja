import AppLogoIcon from '@/shared/components/app-logo-icon';
import { cn } from '@/shared/lib/utils';

interface AppLogoProps {
    className?: string;
    textClassName?: string;
}

export default function AppLogo({ className = '', textClassName = '' }: AppLogoProps) {
    return (
        <div className={cn("flex items-center gap-3", className)}>
            <AppLogoIcon className="h-8 w-auto brightness-0 dark:invert transition-all" />
            <div className={cn("flex flex-col text-left group-data-[collapsible=icon]:hidden", textClassName)}>
                <span className="font-satoshi text-xl leading-none font-bold tracking-tight text-foreground">
                    SingkatSaja
                </span>
            </div>
        </div>
    );
}
