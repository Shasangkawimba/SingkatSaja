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
    ChevronRight,
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
                    className="h-9 rounded-lg bg-vivid-indigo px-4 text-[13px] font-medium text-pure-white shadow-none transition-all hover:bg-vivid-indigo/90 hover:shadow-sm active:scale-[0.98]"
                >
                    <Link href="/links/create">
                        <Plus className="size-3.5" />
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
                            className="h-9 rounded-lg bg-vivid-indigo px-5 text-[13px] font-medium text-pure-white hover:bg-vivid-indigo/90"
                        >
                            <Link href="/links/create">
                                Create your first link
                            </Link>
                        </Button>
                    }
                />
            ) : (
                <div className="flex flex-col gap-4">
                    {/* Filter controls / Toolbar */}
                    <div className="flex w-full flex-col items-center justify-between gap-3 sm:flex-row">
                        <div className="relative flex w-full items-center sm:max-w-xs">
                            <Search className="pointer-events-none absolute left-3 size-3.5 text-slate/60" />
                            <Input
                                type="text"
                                placeholder="Search links or destinations..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="h-9 rounded-lg border-neutral-200/80 bg-white pl-9 text-[13px] focus-visible:border-vivid-indigo focus-visible:ring-vivid-indigo/20"
                            />
                        </div>

                        <div className="flex w-full items-center justify-end gap-2 sm:w-auto">
                            <span className="hidden text-[11px] font-bold tracking-widest text-slate/70 uppercase md:inline">
                                Sort by:
                            </span>
                            <Select
                                defaultValue={(typeof filters === 'object' && !Array.isArray(filters) ? filters.sort : '') || 'newest'}
                                onValueChange={handleSortChange}
                            >
                                <SelectTrigger className="h-9 w-[160px] rounded-lg border-neutral-200/80 bg-white text-[13px] focus-visible:border-vivid-indigo focus-visible:ring-vivid-indigo/20">
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
                    <Card className="overflow-hidden rounded-xl border border-neutral-200/60 bg-white shadow-none">
                        {isLoading ? (
                            <div className="p-6">
                                <LoadingState
                                    variant="table"
                                    count={5}
                                    message="Updating links..."
                                />
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[700px] border-collapse text-left">
                                    <thead>
                                        <tr className="border-b border-neutral-100 bg-neutral-50/70 text-[10px] font-bold tracking-widest text-slate/70 uppercase">
                                            <th className="px-5 py-3">
                                                Short Code
                                            </th>
                                            <th className="px-5 py-3">
                                                Destination URL
                                            </th>
                                            <th className="px-5 py-3 text-center">
                                                Clicks
                                            </th>
                                            <th className="px-5 py-3">
                                                Expiration
                                            </th>
                                            <th className="px-5 py-3">
                                                Status
                                            </th>
                                            <th className="px-5 py-3 text-right">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-neutral-100 text-[13px] text-graphite">
                                        {filteredLinks.map((link) => {
                                            const expired = isLinkExpired(link);

                                            return (
                                                <tr
                                                    key={link.id}
                                                    className="group transition-colors hover:bg-neutral-50/60"
                                                >
                                                    <td className="px-5 py-3 font-satoshi">
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-semibold tracking-tight text-vivid-indigo">
                                                                {
                                                                    link.short_code
                                                                }
                                                            </span>
                                                            <button
                                                                onClick={() =>
                                                                    handleCopy(
                                                                        link.short_code,
                                                                        link.id,
                                                                    )
                                                                }
                                                                className="flex size-6 items-center justify-center rounded border border-neutral-200/50 bg-white text-slate opacity-0 shadow-none transition-all hover:border-neutral-300 hover:text-vivid-indigo group-hover:opacity-100"
                                                                title="Copy URL"
                                                            >
                                                                {copiedId ===
                                                                link.id ? (
                                                                    <Check className="size-3 text-emerald-600" />
                                                                ) : (
                                                                    <Copy className="size-3" />
                                                                )}
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td className="max-w-[220px] px-5 py-3">
                                                        <a
                                                            href={
                                                                link.destination_url
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-1 truncate text-slate transition-colors hover:text-graphite hover:underline"
                                                        >
                                                            <span className="truncate">
                                                                {
                                                                    link.destination_url
                                                                }
                                                            </span>
                                                            <ExternalLink className="size-3 shrink-0 text-slate/40" />
                                                        </a>
                                                    </td>
                                                    <td className="px-5 py-3 text-center font-satoshi font-bold text-graphite">
                                                        {link.clicks_count ?? 0}
                                                    </td>
                                                    <td className="px-5 py-3 text-[12px] text-slate">
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
                                                            : '—'}
                                                    </td>
                                                    <td className="px-5 py-3">
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
                                                    <td className="px-5 py-3 text-right">
                                                        <div className="flex items-center justify-end gap-1">
                                                            <Button
                                                                asChild
                                                                variant="ghost"
                                                                size="icon"
                                                                className="size-7 rounded-md text-slate transition-all hover:bg-indigo-50 hover:text-vivid-indigo"
                                                            >
                                                                <Link
                                                                    href={`/links/${link.id}`}
                                                                    title="View Analytics"
                                                                >
                                                                    <Eye className="size-3.5" />
                                                                </Link>
                                                            </Button>
                                                            <Button
                                                                asChild
                                                                variant="ghost"
                                                                size="icon"
                                                                className="size-7 rounded-md text-slate transition-all hover:bg-neutral-100 hover:text-graphite"
                                                            >
                                                                <Link
                                                                    href={`/links/${link.id}/edit`}
                                                                    title="Edit Link"
                                                                >
                                                                    <Edit2 className="size-3.5" />
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
                                                                className="size-7 rounded-md text-slate transition-all hover:bg-rose-50 hover:text-rose-600"
                                                                title="Delete Link"
                                                            >
                                                                <Trash2 className="size-3.5" />
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
                        <div className="flex items-center justify-center gap-1.5">
                            {links.links.map((pageLink, index) => {
                                const label = pageLink.label
                                    .replace('&laquo; Previous', '← Prev')
                                    .replace('Next &raquo;', 'Next →');

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
                                        className={`h-8 min-w-8 rounded-lg px-3 text-[12px] font-medium ${
                                            pageLink.active
                                                ? 'bg-vivid-indigo font-bold text-pure-white hover:bg-vivid-indigo/90'
                                                : 'border border-neutral-200/70 bg-white text-slate hover:bg-neutral-50 hover:text-graphite'
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
                <DialogContent className="rounded-xl border border-neutral-200/80 bg-white shadow-xl sm:max-w-sm">
                    <DialogHeader className="flex flex-col gap-3 text-center">
                        <div className="mx-auto flex size-11 items-center justify-center rounded-full border border-rose-100 bg-rose-50 text-rose-600">
                            <AlertTriangle className="size-5" />
                        </div>
                        <DialogTitle className="text-center font-satoshi text-[17px] font-bold text-graphite">
                            Delete Link
                        </DialogTitle>
                        <DialogDescription className="px-2 text-center text-[13px] leading-relaxed text-slate">
                            Are you sure you want to delete{' '}
                            <span className="font-semibold text-graphite">
                                singkat.saja/{selectedLinkToDelete?.short_code}
                            </span>
                            ? It will be soft-deleted and evicted from the Redis
                            cache.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mt-2 flex gap-2 border-t border-neutral-100 pt-4 sm:justify-center">
                        <Button
                            variant="ghost"
                            onClick={() => setSelectedLinkToDelete(null)}
                            className="h-9 flex-1 rounded-lg border border-neutral-200 text-[13px] font-medium text-graphite hover:bg-frost-gray"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleDelete}
                            className="h-9 flex-1 rounded-lg bg-rose-600 text-[13px] font-medium text-pure-white hover:bg-rose-700 active:scale-[0.98]"
                        >
                            Delete Link
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </DashboardContainer>
    );
}
