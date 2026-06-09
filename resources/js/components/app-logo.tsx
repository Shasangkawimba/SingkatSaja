import AppLogoIcon from '@/components/app-logo-icon';

export default function AppLogo() {
    return (
        <div className="flex items-center gap-8">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-vivid-indigo text-white">
                <AppLogoIcon className="size-5 fill-current text-white" />
            </div>
            <div className="flex flex-col text-left">
                <span className="font-satoshi text-[16px] leading-none font-bold tracking-tight text-graphite dark:text-pure-white">
                    SingkatSaja
                </span>
            </div>
        </div>
    );
}
