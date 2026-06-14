import { Link, usePage } from '@inertiajs/react';
import {
    LayoutGrid,
    Menu,
    Search,
    LinkIcon,
} from 'lucide-react';
import AppLogo from '@/shared/components/app-logo';
import AppLogoIcon from '@/shared/components/app-logo-icon';
import { Breadcrumbs } from '@/shared/components/breadcrumbs';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';
import { AppearanceToggle } from '@/shared/components/appearance-toggle';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '@/shared/ui/navigation-menu';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '@/shared/ui/sheet';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/shared/ui/tooltip';
import { UserMenuContent } from '@/shared/components/user-menu-content';
import { useCurrentUrl } from '@/shared/hooks/use-current-url';
import { useInitials } from '@/shared/hooks/use-initials';
import { cn, toUrl } from '@/shared/lib/utils';
import { dashboard } from '@/generated/routes';
import links from '@/generated/routes/links';
import type { BreadcrumbItem, NavItem } from '@/shared/types';

type Props = {
    breadcrumbs?: BreadcrumbItem[];
};

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'My Links',
        href: links.index.url(),
        icon: LinkIcon,
    },
];

const rightNavItems: NavItem[] = [];

const activeItemStyles =
    'text-foreground font-semibold bg-primary/10 dark:bg-primary/20 rounded-full';

export function AppHeader({ breadcrumbs = [] }: Props) {
    const page = usePage();
    const { auth } = page.props;
    const getInitials = useInitials();
    const { isCurrentUrl, whenCurrentUrl } = useCurrentUrl();

    return (
        <div className="sticky top-4 z-50 mx-auto w-[calc(100%-2rem)] max-w-7xl md:mt-4">
            <div className="glass-panel flex h-16 items-center px-4 rounded-full border border-white/20 dark:border-white/10">
                {/* Mobile Menu */}
                <div className="lg:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="mr-2 h-10 w-10 rounded-full"
                            >
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent
                            side="left"
                            className="bg-background flex h-full w-64 flex-col items-stretch justify-between"
                        >
                            <SheetTitle className="sr-only">
                                Navigation menu
                            </SheetTitle>
                            <SheetHeader className="flex justify-start text-left">
                                <AppLogoIcon className="h-6 w-auto self-start brightness-0 dark:invert transition-all" />
                            </SheetHeader>
                            <div className="flex h-full flex-1 flex-col space-y-4 p-4">
                                <div className="flex h-full flex-col justify-between text-sm">
                                    <div className="flex flex-col space-y-4">
                                        {mainNavItems.map((item) => (
                                            <Link
                                                key={item.title}
                                                href={item.href}
                                                className="flex items-center space-x-2 font-medium text-muted-foreground hover:text-foreground transition-colors"
                                            >
                                                {item.icon && (
                                                    <item.icon className="h-5 w-5" />
                                                )}
                                                <span>{item.title}</span>
                                            </Link>
                                        ))}
                                    </div>

                                    <div className="flex flex-col space-y-4">
                                        {rightNavItems.map((item) => (
                                            <a
                                                key={item.title}
                                                href={toUrl(item.href)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center space-x-2 font-medium text-muted-foreground hover:text-foreground transition-colors"
                                            >
                                                {item.icon && (
                                                    <item.icon className="h-5 w-5" />
                                                )}
                                                <span>{item.title}</span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

                <Link
                    href={dashboard()}
                    prefetch
                    className="flex items-center space-x-2 transition-transform hover:scale-105 shrink-0 min-w-0 mr-4"
                >
                    <AppLogo />
                </Link>

                {/* Desktop Navigation */}
                <div className="ml-8 hidden h-full items-center space-x-6 lg:flex">
                    <NavigationMenu className="flex h-full items-stretch">
                        <NavigationMenuList className="flex h-full items-center space-x-2">
                            {mainNavItems.map((item, index) => (
                                <NavigationMenuItem
                                    key={index}
                                    className="relative flex items-center"
                                >
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            navigationMenuTriggerStyle(),
                                            whenCurrentUrl(
                                                item.href,
                                                activeItemStyles,
                                            ),
                                            'h-10 cursor-pointer px-4 rounded-full text-muted-foreground hover:text-foreground bg-transparent hover:bg-muted/50 transition-all duration-300',
                                        )}
                                    >
                                        {item.icon && (
                                            <item.icon className="mr-2 h-4 w-4" />
                                        )}
                                        {item.title}
                                    </Link>
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                <div className="ml-auto flex items-center space-x-2 pr-1">
                    <div className="relative flex items-center space-x-1">
                        <div className="ml-1 hidden gap-1 lg:flex">
                            {rightNavItems.map((item) => (
                                <Tooltip key={item.title}>
                                    <TooltipTrigger asChild>
                                        <a
                                            href={toUrl(item.href)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group inline-flex h-10 w-10 items-center justify-center rounded-full bg-transparent p-0 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
                                        >
                                            <span className="sr-only">
                                                {item.title}
                                            </span>
                                            {item.icon && (
                                                <item.icon className="size-4 opacity-80 group-hover:opacity-100" />
                                            )}
                                        </a>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{item.title}</p>
                                    </TooltipContent>
                                </Tooltip>
                            ))}
                        </div>
                        <AppearanceToggle />
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                className="h-10 w-10 rounded-full border border-border p-0 transition-all duration-300 hover:shadow-md ml-2"
                            >
                                <Avatar className="size-full overflow-hidden rounded-full">
                                    <AvatarImage
                                        src={auth.user?.avatar}
                                        alt={auth.user?.name}
                                    />
                                    <AvatarFallback className="rounded-full bg-primary/10 text-primary text-xs font-bold">
                                        {getInitials(auth.user?.name ?? '')}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 mt-2 rounded-xl" align="end">
                            {auth.user && (
                                <UserMenuContent user={auth.user} />
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            
            {/* Breadcrumbs removed from floating header, should be moved to page container if needed, or placed below */}
            {breadcrumbs?.length > 1 && (
                <div className="mx-auto flex h-10 w-full items-center justify-start px-6 text-muted-foreground text-sm mt-2 max-w-7xl">
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                </div>
            )}
        </div>
    );
}
