import { Moon, Sun } from 'lucide-react';
import { useAppearance } from '@/shared/hooks/use-appearance';
import { Button } from '@/shared/ui/button';

export function AppearanceToggle() {
    const { appearance, updateAppearance } = useAppearance();

    const toggleTheme = () => {
        if (appearance === 'dark') {
            updateAppearance('light');
        } else {
            updateAppearance('dark');
        }
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-10 w-10 rounded-full bg-white/30 dark:bg-black/20 border border-white/40 dark:border-white/10 text-muted-foreground hover:text-foreground hover:bg-white/50 dark:hover:bg-white/10 shadow-sm backdrop-blur-sm transition-all"
            aria-label="Toggle theme"
        >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>
    );
}
