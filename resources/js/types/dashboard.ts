import type { Link as LinkType } from '@/types/link';

export type DashboardStats = {
    readonly total_links: number;
    readonly active_links: number;
    readonly total_clicks: number;
    readonly clicks_today: number;
};

export type DashboardProps = {
    readonly stats: DashboardStats;
    readonly recent_links: LinkType[];
};
