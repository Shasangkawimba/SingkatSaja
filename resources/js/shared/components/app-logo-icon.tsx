import type { ImgHTMLAttributes } from 'react';
import { cn } from '@/shared/lib/utils';

export default function AppLogoIcon({ className, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img src="/logo.png" alt="SingkatSaja Logo" className={cn("shrink-0 object-contain", className)} {...props} />
    );
}
