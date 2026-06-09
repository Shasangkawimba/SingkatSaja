import { Link } from './link';

export type DailyStatRecord = {
    readonly date: string;
    readonly clicks_count: number;
};

export type TopBrowserRecord = {
    readonly browser: string | null;
    readonly clicks_count: number;
};

export type TopPlatformRecord = {
    readonly platform: string | null;
    readonly clicks_count: number;
};

export type TopDeviceRecord = {
    readonly device_type: string | null;
    readonly clicks_count: number;
};

export type LinkAnalytics = {
    readonly link: Link;
    readonly stats_7_days: readonly DailyStatRecord[];
    readonly stats_30_days: readonly DailyStatRecord[];
    readonly top_browsers: readonly TopBrowserRecord[];
    readonly top_platforms: readonly TopPlatformRecord[];
    readonly top_devices: readonly TopDeviceRecord[];
};

export type AnalyticsProps = {
    readonly analytics: LinkAnalytics;
};

