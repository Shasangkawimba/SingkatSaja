export type Link = {
    readonly id: number;
    readonly user_id: number;
    readonly short_code: string;
    readonly destination_url: string;
    readonly expires_at: string | null;
    readonly created_at: string;
    readonly updated_at: string;
    readonly deleted_at: string | null;
    readonly clicks_count?: number;
};

export type LinkSortOption = 'newest' | 'oldest' | 'most_clicked';

export type LinkFilters = {
    readonly sort?: LinkSortOption;
    readonly page?: number;
    readonly per_page?: number;
};

export type PaginationLink = {
    readonly url: string | null;
    readonly label: string;
    readonly active: boolean;
};

export type PaginatedResponse<T> = {
    readonly data: readonly T[];
    readonly current_page: number;
    readonly first_page_url: string;
    readonly from: number | null;
    readonly last_page: number;
    readonly last_page_url: string;
    readonly links: readonly PaginationLink[];
    readonly next_page_url: string | null;
    readonly path: string;
    readonly per_page: number;
    readonly prev_page_url: string | null;
    readonly to: number | null;
    readonly total: number;
};

export type LinksIndexProps = {
    readonly links: PaginatedResponse<Link>;
    readonly filters: LinkFilters;
};
