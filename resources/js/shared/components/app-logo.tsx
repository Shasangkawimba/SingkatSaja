import AppLogoIcon from '@/shared/components/app-logo-icon';

export default function AppLogo() {
    return (
        <div className="flex items-center gap-3">
            <AppLogoIcon className="h-8 w-auto brightness-0 dark:invert transition-all" />
            <div className="flex flex-col text-left group-data-[collapsible=icon]:hidden">
                <span className="font-satoshi text-xl leading-none font-bold tracking-tight text-foreground">
                    SingkatSaja
                </span>
            </div>
        </div>
    );
}
