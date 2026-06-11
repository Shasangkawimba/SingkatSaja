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
    Clock,
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
    const [selectedLinkToDelete, setSelectedLinkToDelete] = useState<LinkType | null>(null);
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
        if (!selectedLinkToDelete) return;
        router.delete(`/links/${selectedLinkToDelete.id}`, {
            onSuccess: () => {
                setSelectedLinkToDelete(null);
                toast.success('Link successfully deleted.');
            },
        });
    };

    const filteredLinks = links.data.filter(
        (link) =>
            link.short_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
            link.destination_url.toLowerCase().includes(searchQuery.toLowerCase()),
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
                <Button asChild className="h-9 gap-2">
                    <Link href="/links/create">
                        <Plus className="h-4 w-4" />
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
                        <Button asChild className="mt-4">
                            <Link href="/links/create">Create your first link</Link>
                        </Button>
                    }
                />
            ) : (
                <div className="flex flex-col gap-6 pt-4">
                    {/* Toolbar */}
                    <div className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row">
                        <div className="relative flex w-full items-center sm:max-w-md">
                            <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="Search links or destinations..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="h-9 w-full bg-card pl-9 text-sm focus-visible:ring-offset-1"
                            />
                        </div>

                        <div className="flex w-full items-center justify-end gap-3 sm:w-auto">
                            <Select
                                defaultValue={(typeof filters === 'object' && !Array.isArray(filters) ? filters.sort : '') || 'newest'}
                                onValueChange={handleSortChange}
                            >
                                <SelectTrigger className="h-9 w-[160px] bg-card text-sm">
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

                    {/* Data Table */}
                    <Card className="overflow-hidden border-border/40 bg-card shadow-sm">
                        {isLoading ? (
                            <div className="p-6">
                                <LoadingState variant="table" count={5} message="Updating links..." />
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[800px] border-collapse text-left text-sm">
                                    <thead>
                                        <tr className="border-b border-border/40 bg-muted/30 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                                            <th className="px-6 py-4">Short Code</th>
                                            <th className="px-6 py-4">Destination</th>
                                            <th className="px-6 py-4 text-right">Clicks</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4">Expiration</th>
                                            <th className="px-6 py-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-border/40">
                                        {filteredLinks.length === 0 ? (
                                            <tr>
                                                <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                                                    No links match your search.
                                                </td>
                                            </tr>
                                        ) : (
                                            filteredLinks.map((link) => {
                                                const expired = isLinkExpired(link);
                                                return (
                                                    <tr key={link.id} className="group transition-colors hover:bg-muted/20">
                                                        <td className="px-6 py-4">
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-semibold text-foreground">
                                                                    {link.short_code}
                                                                </span>
                                                                <button
                                                                    onClick={() => handleCopy(link.short_code, link.id)}
                                                                    className="invisible text-muted-foreground transition-colors hover:text-foreground group-hover:visible"
                                                                    title="Copy URL"
                                                                >
                                                                    {copiedId === link.id ? (
                                                                        <Check className="h-3.5 w-3.5 text-emerald-500" />
                                                                    ) : (
                                                                        <Copy className="h-3.5 w-3.5" />
                                                                    )}
                                                                </button>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <a
                                                                href={link.destination_url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex max-w-[250px] items-center gap-1.5 truncate text-muted-foreground transition-colors hover:text-foreground hover:underline"
                                                                title={link.destination_url}
                                                            >
                                                                <span className="truncate">{link.destination_url}</span>
                                                                <ExternalLink className="h-3 w-3 shrink-0" />
                                                            </a>
                                                        </td>
                                                        <td className="px-6 py-4 text-right">
                                                            <Badge variant="secondary" className="bg-secondary/50 font-mono text-xs text-foreground">
                                                                {link.clicks_count ?? 0}
                                                            </Badge>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {expired ? (
                                                                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-destructive">
                                                                    <div className="h-1.5 w-1.5 rounded-full bg-destructive" />
                                                                    Expired
                                                                </span>
                                                            ) : (
                                                                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                                                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                                    Active
                                                                </span>
                                                            )}
                                                        </td>
                                                        <td className="px-6 py-4 text-muted-foreground">
                                                            {link.expires_at ? (
                                                                <div className="flex items-center gap-1.5 text-xs">
                                                                    <Clock className="h-3.5 w-3.5" />
                                                                    {new Date(link.expires_at).toLocaleDateString()}
                                                                </div>
                                                            ) : (
                                                                <span className="text-xs">—</span>
                                                            )}
                                                        </td>
                                                        <td className="px-6 py-4 text-right">
                                                            <div className="flex items-center justify-end gap-1">
                                                                <Button asChild variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
                                                                    <Link href={`/links/${link.id}`} title="View Analytics">
                                                                        <Eye className="h-4 w-4" />
                                                                    </Link>
                                                                </Button>
                                                                <Button asChild variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-foreground">
                                                                    <Link href={`/links/${link.id}/edit`} title="Edit Link">
                                                                        <Edit2 className="h-4 w-4" />
                                                                    </Link>
                                                                </Button>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    onClick={() => setSelectedLinkToDelete(link)}
                                                                    className="h-7 w-7 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                                                                    title="Delete Link"
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </Card>

                    {/* Pagination */}
                    {links.links.length > 3 && (
                        <div className="flex items-center justify-center gap-2 pt-4">
                            {links.links.map((pageLink, index) => {
                                const label = pageLink.label.replace('&laquo; Previous', 'Prev').replace('Next &raquo;', 'Next');
                                return (
                                    <Button
                                        key={index}
                                        asChild={!!pageLink.url}
                                        disabled={!pageLink.url || pageLink.active}
                                        variant={pageLink.active ? 'default' : 'outline'}
                                        size="sm"
                                        className={`h-8 min-w-8 text-xs ${pageLink.active ? '' : 'text-muted-foreground'}`}
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

            {/* Delete Dialog */}
            <Dialog open={!!selectedLinkToDelete} onOpenChange={(open) => !open && setSelectedLinkToDelete(null)}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader className="flex flex-col items-center gap-4 text-center sm:items-start sm:text-left sm:flex-row">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
                            <AlertTriangle className="h-5 w-5 text-destructive" />
                        </div>
                        <div className="flex flex-col gap-1.5 mt-1 sm:mt-0">
                            <DialogTitle>Delete Link</DialogTitle>
                            <DialogDescription>
                                Are you sure you want to delete <span className="font-semibold text-foreground">singkat.saja/{selectedLinkToDelete?.short_code}</span>? 
                                This will permanently remove the link from the redirect engine. Analytics data will be preserved.
                            </DialogDescription>
                        </div>
                    </DialogHeader>
                    <DialogFooter className="mt-4 sm:justify-end">
                        <Button variant="outline" onClick={() => setSelectedLinkToDelete(null)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDelete}>
                            Delete Link
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </DashboardContainer>
    );
}
