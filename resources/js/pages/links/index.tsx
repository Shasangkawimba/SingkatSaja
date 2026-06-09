import { Head, Link, router } from '@inertiajs/react';
import {
    Search,
    Eye,
    Edit2,
    Trash2,
    Copy,
    Check,
    Plus,
    AlertTriangle,
    ExternalLink,
} from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { DashboardContainer } from '@/components/dashboard-container';
import { EmptyState } from '@/components/empty-state';
import { LoadingState } from '@/components/loading-state';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import type { LinksIndexProps, Link as LinkType } from '@/types/link';

export default function Index({ links, filters }: LinksIndexProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLinkToDelete, setSelectedLinkToDelete] =
        useState<LinkType | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [copiedId, setCopiedId] = useState<number | null>(null);

    useEffect(() => {
        const unbindStart = router.on('start', () => setIsLoading(true));
        const unbindFinish = router.on('finish', () => setIsLoading(false));

        return () => {
            unbindStart();
            unbindFinish();
        };
    }, []);

    const handleSortChange = (value: string) => {
        router.get('/links', { sort: value }, { preserveState: true });
    };

    const handleCopy = (code: string, id: number) => {
        const fullUrl = `${window.location.origin}/${code}`;
        navigator.clipboard.writeText(fullUrl);
        setCopiedId(id);
        toast.success('Short URL copied to clipboard.');
        setTimeout(() => setCopiedId(null), 2000);
    };

    const handleDelete = () => {
        if (!selectedLinkToDelete) {
            return;
        }

        router.delete(`/links/${selectedLinkToDelete.id}`, {
            onSuccess: () => {
                setSelectedLinkToDelete(null);
                toast.success('Link successfully deleted.');
            },
        });
    };

    // Client-side search filter across the current paginated records
    const filteredLinks = links.data.filter(
        (link) =>
            link.short_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
            link.destination_url
                .toLowerCase()
                .includes(searchQuery.toLowerCase()),
    );

    const isLinkExpired = (link: LinkType) => {
        if (!link.expires_at) {
            return false;
        }

        return new Date(link.expires_at) < new Date();
    };

    return (
        <DashboardContainer
            title="My Links"
            description="Manage, monitor, and configure shortened links."
            actions={
                <Button
                    asChild
                    className="h-10 rounded-lg bg-vivid-indigo px-16 font-medium text-pure-white shadow-xs hover:bg-vivid-indigo/90"
                >
                    <Link href="/links/create">
                        <Plus className="mr-8 size-16" />
                        Create Link
                    </Link>
                </Button>
            }
        >
            <Head title="My Links" />

            {links.data.length === 0 ? (
                <EmptyState
                    title="No links created yet"
                    description="Generate your first shortened Base62 link to start tracking clicks."
                    action={
                        <Button
                            asChild
                            className="h-10 rounded-lg bg-vivid-indigo px-20 font-medium text-pure-white hover:bg-vivid-indigo/90"
                        >
                            <Link href="/links/create">
                                Create your first link
                            </Link>
                        </Button>
                    }
                />
            ) : (
                <div className="flex flex-col gap-24">
                    {/* Filter controls / Toolbar */}
                    <div className="flex w-full flex-col items-center justify-between gap-16 sm:flex-row">
                        <div className="relative flex w-full items-center sm:max-w-xs">
                            <Search className="pointer-events-none absolute left-12 size-16 text-slate/80" />
                            <Input
                                type="text"
                                placeholder="Search links or destinations..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="h-10 rounded-lg border-neutral-200/80 bg-white pl-36 text-body focus-visible:border-vivid-indigo focus-visible:ring-vivid-indigo/20"
                            />
                        </div>

                        <div className="flex w-full items-center justify-end gap-12 sm:w-auto">
                            <span className="hidden text-[12px] font-bold tracking-wider text-graphite uppercase md:inline">
                                Sort by:
                            </span>
                            <Select
                                defaultValue={(typeof filters === 'object' && !Array.isArray(filters) ? filters.sort : '') || 'newest'}
                                onValueChange={handleSortChange}
                            >
                                <SelectTrigger className="h-10 w-[180px] rounded-lg border-neutral-200/80 bg-white text-body focus-visible:border-vivid-indigo focus-visible:ring-vivid-indigo/20">
                                    <SelectValue placeholder="Sort option" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="newest">
                                        Newest First
                                    </SelectItem>
                                    <SelectItem value="oldest">
                                        Oldest First
                                    </SelectItem>
                                    <SelectItem value="most_clicked">
                                        Most Clicked
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Table View */}
                    <Card className="overflow-hidden rounded-largecards border border-neutral-200/80 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.01)]">
                        {isLoading ? (
                            <div className="p-32">
                                <LoadingState
                                    variant="table"
                                    count={5}
                                    message="Updating links..."
                                />
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[800px] border-collapse text-left">
                                    <thead>
                                        <tr className="border-b border-neutral-100 bg-frost-gray/30 text-[11px] font-bold tracking-wider text-slate uppercase">
                                            <th className="p-16 px-24">
                                                Short Code
                                            </th>
                                            <th className="p-16 px-24">
                                                Destination URL
                                            </th>
                                            <th className="p-16 px-24 text-center">
                                                Clicks
                                            </th>
                                            <th className="p-16 px-24">
                                                Expiration
                                            </th>
                                            <th className="p-16 px-24">
                                                Status
                                            </th>
                                            <th className="p-16 px-24 text-right">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-neutral-100 text-body text-graphite">
                                        {filteredLinks.map((link) => {
                                            const expired = isLinkExpired(link);

                                            return (
                                                <tr
                                                    key={link.id}
                                                    className="transition-colors hover:bg-frost-gray/20"
                                                >
                                                    <td className="p-16 px-24 font-satoshi">
                                                        <div className="flex items-center gap-12">
                                                            <span className="text-[15px] font-bold tracking-tight text-vivid-indigo">
                                                                {
                                                                    link.short_code
                                                                }
                                                            </span>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() =>
                                                                    handleCopy(
                                                                        link.short_code,
                                                                        link.id,
                                                                    )
                                                                }
                                                                className="size-28 rounded-lg border border-neutral-200/30 bg-white text-slate shadow-2xs hover:bg-neutral-50 hover:text-vivid-indigo"
                                                            >
                                                                {copiedId ===
                                                                link.id ? (
                                                                    <Check className="size-12 text-emerald-600" />
                                                                ) : (
                                                                    <Copy className="size-12" />
                                                                )}
                                                            </Button>
                                                        </div>
                                                    </td>
                                                    <td className="max-w-xs p-16 px-24 md:max-w-sm">
                                                        <div className="truncate text-[14px] text-slate transition-colors hover:text-graphite">
                                                            <a
                                                                href={
                                                                    link.destination_url
                                                                }
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="inline-flex items-center gap-6 hover:underline"
                                                            >
                                                                {
                                                                    link.destination_url
                                                                }
                                                                <ExternalLink className="size-12 shrink-0 text-slate/50" />
                                                            </a>
                                                        </div>
                                                    </td>
                                                    <td className="p-16 px-24 text-center font-satoshi text-[15px] font-bold text-graphite">
                                                        {link.clicks_count ?? 0}
                                                    </td>
                                                    <td className="p-16 px-24 text-[14px] text-slate">
                                                        {link.expires_at
                                                            ? new Date(
                                                                  link.expires_at,
                                                              ).toLocaleDateString(
                                                                  undefined,
                                                                  {
                                                                      year: 'numeric',
                                                                      month: 'short',
                                                                      day: 'numeric',
                                                                  },
                                                              )
                                                            : 'Never'}
                                                    </td>
                                                    <td className="p-16 px-24">
                                                        {expired ? (
                                                            <Badge
                                                                variant="danger"
                                                                className="bg-rose-50 text-rose-700"
                                                            >
                                                                Expired
                                                            </Badge>
                                                        ) : (
                                                            <Badge
                                                                variant="success"
                                                                className="bg-emerald-50 text-emerald-700"
                                                            >
                                                                Active
                                                            </Badge>
                                                        )}
                                                    </td>
                                                    <td className="p-16 px-24 text-right">
                                                        <div className="flex items-center justify-end gap-12">
                                                            <Button
                                                                asChild
                                                                variant="ghost"
                                                                size="icon"
                                                                className="size-32 rounded-lg border border-neutral-200/60 bg-white text-slate shadow-2xs hover:bg-neutral-50 hover:text-vivid-indigo"
                                                            >
                                                                <Link
                                                                    href={`/links/${link.id}`}
                                                                    title="View Analytics"
                                                                >
                                                                    <Eye className="size-14" />
                                                                </Link>
                                                            </Button>
                                                            <Button
                                                                asChild
                                                                variant="ghost"
                                                                size="icon"
                                                                className="size-32 rounded-lg border border-neutral-200/60 bg-white text-slate shadow-2xs hover:bg-neutral-50 hover:text-vivid-indigo"
                                                            >
                                                                <Link
                                                                    href={`/links/${link.id}/edit`}
                                                                    title="Edit Link"
                                                                >
                                                                    <Edit2 className="size-14" />
                                                                </Link>
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() =>
                                                                    setSelectedLinkToDelete(
                                                                        link,
                                                                    )
                                                                }
                                                                className="size-32 rounded-lg border border-neutral-200/60 bg-white text-slate shadow-2xs hover:bg-rose-50 hover:text-rose-600"
                                                                title="Delete Link"
                                                            >
                                                                <Trash2 className="size-14" />
                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </Card>

                    {/* Pagination Links */}
                    {links.links.length > 3 && (
                        <div className="mt-8 flex items-center justify-center gap-8">
                            {links.links.map((pageLink, index) => {
                                const label = pageLink.label
                                    .replace('&laquo; Previous', 'Previous')
                                    .replace('Next &raquo;', 'Next');

                                return (
                                    <Button
                                        key={index}
                                        asChild={!!pageLink.url}
                                        disabled={
                                            !pageLink.url || pageLink.active
                                        }
                                        variant={
                                            pageLink.active
                                                ? 'default'
                                                : 'ghost'
                                        }
                                        className={`border-neutral-250/50 h-10 rounded-lg border px-16 text-[13px] font-medium shadow-2xs ${
                                            pageLink.active
                                                ? 'border-transparent bg-vivid-indigo font-bold text-pure-white hover:bg-vivid-indigo/90'
                                                : 'bg-white text-slate hover:bg-frost-gray/50 hover:text-graphite'
                                        }`}
                                    >
                                        {pageLink.url ? (
                                            <Link
                                                href={pageLink.url}
                                                preserveState
                                            >
                                                {label}
                                            </Link>
                                        ) : (
                                            <span>{label}</span>
                                        )}
                                    </Button>
                                );
                            })}
                        </div>
                    )}
                </div>
            )}

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={!!selectedLinkToDelete}
                onOpenChange={(open) => !open && setSelectedLinkToDelete(null)}
            >
                <DialogContent className="rounded-largecards border border-neutral-200/80 bg-pure-white shadow-lg sm:max-w-md">
                    <DialogHeader className="flex flex-col gap-12 text-center">
                        <div className="mx-auto mb-8 flex size-48 items-center justify-center rounded-full border border-rose-100 bg-rose-50 text-rose-600">
                            <AlertTriangle className="size-24" />
                        </div>
                        <DialogTitle className="text-center font-satoshi text-heading-sm font-bold text-graphite">
                            Delete Link
                        </DialogTitle>
                        <DialogDescription className="px-12 text-center text-[14px] leading-relaxed text-slate">
                            Are you sure you want to delete this link? The
                            shortcode{' '}
                            <span className="font-bold text-graphite">
                                singkat.saja/{selectedLinkToDelete?.short_code}
                            </span>{' '}
                            will be soft-deleted and evicted from the Redis
                            redirect cache.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-20 flex gap-12 border-t border-neutral-100 pt-16 sm:justify-center">
                        <Button
                            variant="ghost"
                            onClick={() => setSelectedLinkToDelete(null)}
                            className="h-10 rounded-lg border border-neutral-200 px-16 font-medium text-graphite hover:bg-frost-gray"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleDelete}
                            className="h-10 rounded-lg bg-rose-600 px-16 font-medium text-pure-white hover:bg-rose-700"
                        >
                            Confirm Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </DashboardContainer>
    );
}
