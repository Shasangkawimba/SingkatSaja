import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Search, Eye, Edit2, Trash2, Copy, Plus, AlertTriangle } from 'lucide-react';
import { toast } from 'sonner';
import { DashboardContainer } from '@/components/dashboard-container';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { EmptyState } from '@/components/empty-state';
import { LoadingState } from '@/components/loading-state';
import type { LinksIndexProps, Link as LinkType } from '@/types/link';

export default function Index({ links, filters }: LinksIndexProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLinkToDelete, setSelectedLinkToDelete] = useState<LinkType | null>(null);
    const [isLoading, setIsLoading] = useState(false);

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

    const handleCopy = (code: string) => {
        const fullUrl = `${window.location.origin}/${code}`;
        navigator.clipboard.writeText(fullUrl);
        toast.success('Short link copied to clipboard.');
    };

    const handleDelete = () => {
        if (!selectedLinkToDelete) return;
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
            link.destination_url.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const isLinkExpired = (link: LinkType) => {
        if (!link.expires_at) return false;
        return new Date(link.expires_at) < new Date();
    };

    return (
        <DashboardContainer
            title="My Links"
            description="Manage, monitor, and configure shortened links."
            actions={
                <Button asChild className="bg-vivid-indigo hover:bg-vivid-indigo/90 text-pure-white font-medium">
                    <Link href="/links/create">
                        <Plus className="size-16 mr-8" />
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
                        <Button asChild className="bg-vivid-indigo hover:bg-vivid-indigo/90 text-pure-white font-medium">
                            <Link href="/links/create">
                                Create your first link
                            </Link>
                        </Button>
                    }
                />
            ) : (
                <div className="flex flex-col gap-20">
                    {/* Filter controls */}
                    <div className="flex flex-col sm:flex-row gap-16 items-center justify-between">
                        <div className="relative w-full sm:max-w-xs flex items-center">
                            <Search className="absolute left-12 size-16 text-slate pointer-events-none" />
                            <Input
                                type="text"
                                placeholder="Search links or destinations..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-36 bg-pure-white border-slate/30 text-body"
                            />
                        </div>

                        <div className="flex items-center gap-12 w-full sm:w-auto justify-end">
                            <span className="text-caption font-bold text-graphite hidden md:inline">Sort by:</span>
                            <Select
                                defaultValue={filters.sort || 'newest'}
                                onValueChange={handleSortChange}
                            >
                                <SelectTrigger className="w-[180px] bg-pure-white border-slate/30 text-body">
                                    <SelectValue placeholder="Sort option" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="newest">Newest First</SelectItem>
                                    <SelectItem value="oldest">Oldest First</SelectItem>
                                    <SelectItem value="most_clicked">Most Clicked</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Table View */}
                    <Card className="border border-slate/20 bg-pure-white overflow-hidden">
                        {isLoading ? (
                            <div className="p-32">
                                <LoadingState variant="table" count={5} message="Updating links..." />
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse min-w-[800px]">
                                    <thead>
                                        <tr className="border-b border-slate/10 bg-frost-gray/50 text-caption font-bold text-slate">
                                            <th className="p-16">Short Code</th>
                                            <th className="p-16">Destination URL</th>
                                            <th className="p-16 text-center">Clicks</th>
                                            <th className="p-16">Expiration</th>
                                            <th className="p-16">Status</th>
                                            <th className="p-16 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate/10 text-body text-graphite">
                                        {filteredLinks.map((link) => {
                                            const expired = isLinkExpired(link);
                                            return (
                                                <tr key={link.id} className="hover:bg-frost-gray/30 transition-colors">
                                                    <td className="p-16">
                                                        <div className="flex items-center gap-8">
                                                            <span className="font-bold tracking-tight text-vivid-indigo">
                                                                {link.short_code}
                                                            </span>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => handleCopy(link.short_code)}
                                                                className="size-24 rounded-full text-slate hover:text-vivid-indigo"
                                                            >
                                                                <Copy className="size-12" />
                                                            </Button>
                                                        </div>
                                                    </td>
                                                    <td className="p-16 max-w-xs md:max-w-sm">
                                                        <div className="truncate text-slate hover:text-graphite transition-colors">
                                                            <a
                                                                href={link.destination_url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="hover:underline flex items-center gap-4"
                                                            >
                                                                {link.destination_url}
                                                            </a>
                                                        </div>
                                                    </td>
                                                    <td className="p-16 text-center font-bold">
                                                        {link.clicks_count ?? 0}
                                                    </td>
                                                    <td className="p-16 text-slate">
                                                        {link.expires_at
                                                            ? new Date(link.expires_at).toLocaleDateString(undefined, {
                                                                  year: 'numeric',
                                                                  month: 'short',
                                                                  day: 'numeric',
                                                              })
                                                            : 'Never'}
                                                    </td>
                                                    <td className="p-16">
                                                        {expired ? (
                                                            <Badge variant="danger">Expired</Badge>
                                                        ) : (
                                                            <Badge variant="success">Active</Badge>
                                                        )}
                                                    </td>
                                                    <td className="p-16 text-right">
                                                        <div className="flex items-center justify-end gap-8">
                                                            <Button asChild variant="ghost" size="icon" className="size-28 text-slate hover:text-vivid-indigo">
                                                                <Link href={`/links/${link.id}`} title="View Analytics">
                                                                    <Eye className="size-16" />
                                                                </Link>
                                                            </Button>
                                                            <Button asChild variant="ghost" size="icon" className="size-28 text-slate hover:text-vivid-indigo">
                                                                <Link href={`/links/${link.id}/edit`} title="Edit Link">
                                                                    <Edit2 className="size-16" />
                                                                </Link>
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => setSelectedLinkToDelete(link)}
                                                                className="size-28 text-slate hover:text-red-600"
                                                                title="Delete Link"
                                                            >
                                                                <Trash2 className="size-16" />
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
                        <div className="flex items-center justify-center gap-8 mt-16">
                            {links.links.map((pageLink, index) => {
                                const isPrevOrNext = pageLink.label.includes('Previous') || pageLink.label.includes('Next');
                                const label = pageLink.label
                                    .replace('&laquo; Previous', 'Previous')
                                    .replace('Next &raquo;', 'Next');

                                return (
                                    <Button
                                        key={index}
                                        asChild={!!pageLink.url}
                                        disabled={!pageLink.url || pageLink.active}
                                        variant={pageLink.active ? 'default' : 'ghost'}
                                        className={`px-12 h-9 text-caption font-medium border border-slate/20 ${
                                            pageLink.active ? 'bg-vivid-indigo text-pure-white hover:bg-vivid-indigo/90' : 'text-slate hover:bg-frost-gray'
                                        }`}
                                    >
                                        {pageLink.url ? (
                                            <Link href={pageLink.url} preserveState>
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
            <Dialog open={!!selectedLinkToDelete} onOpenChange={(open) => !open && setSelectedLinkToDelete(null)}>
                <DialogContent className="sm:max-w-md bg-pure-white border border-slate/30 shadow-md">
                    <DialogHeader className="flex flex-col gap-12">
                        <div className="size-40 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-8">
                            <AlertTriangle className="size-20" />
                        </div>
                        <DialogTitle className="text-center font-bold text-heading-sm text-graphite">Delete Link</DialogTitle>
                        <DialogDescription className="text-center text-body text-slate leading-relaxed">
                            Are you sure you want to delete this link? The shortcode <span className="font-bold text-graphite">singkat.saja/{selectedLinkToDelete?.short_code}</span> will be soft-deleted and evicted from the Redis redirect cache.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex gap-12 sm:justify-center pt-16">
                        <Button
                            variant="ghost"
                            onClick={() => setSelectedLinkToDelete(null)}
                            className="border border-slate/30 text-graphite hover:bg-frost-gray font-medium"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleDelete}
                            className="bg-red-600 hover:bg-red-700 text-pure-white font-medium"
                        >
                            Confirm Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </DashboardContainer>
    );
}
