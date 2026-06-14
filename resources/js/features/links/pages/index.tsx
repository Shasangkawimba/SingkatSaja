import { Head, Link, router } from '@inertiajs/react';
import {
    Search,
    Edit2,
    Trash2,
    Copy,
    Check,
    Plus,
    AlertTriangle,
    ExternalLink,
    Clock,
    BarChart3
} from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { DashboardContainer } from '@/features/dashboard/components/dashboard-container';
import type { LinksIndexProps, Link as LinkType } from '@/features/links/types/link';
import { EmptyState } from '@/shared/components/empty-state';
import { LoadingState } from '@/shared/components/loading-state';
import { Button } from '@/shared/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/shared/ui/dialog';
import { Input } from '@/shared/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/shared/ui/select';

export default function Index({ links, filters }: LinksIndexProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLinkToDelete, setSelectedLinkToDelete] = useState<LinkType | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [copiedId, setCopiedId] = useState<number | null>(null);

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsMounted(true);
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

    const linksData = links?.data ?? [];

    const filteredLinks = linksData.filter(
        (link) =>
            link.short_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
            link.destination_url.toLowerCase().includes(searchQuery.toLowerCase()),
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
            className="relative z-10"
            actions={
                <Button asChild className="font-bold rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]">
                    <Link href="/links/create">
                        <Plus className="mr-2 h-4 w-4" />
                        Create Link
                    </Link>
                </Button>
            }
        >
            <Head title="My Links" />

            {linksData.length === 0 ? (
                <div className="glass-panel mt-8 border border-white/40 dark:border-white/20">
                    <EmptyState
                        title="No links created yet"
                        description="Generate your first shortened Base62 link to start tracking clicks."
                        action={
                            <Button asChild className="mt-4 font-bold rounded-xl shadow-[0_0_15px_rgba(59,130,246,0.2)] hover:shadow-[0_0_25px_rgba(59,130,246,0.4)]">
                                <Link href="/links/create">Create your first link</Link>
                            </Button>
                        }
                    />
                </div>
            ) : (
                <div className="flex flex-col gap-6 pt-6">
                    {/* Toolbar */}
                    <div className="flex w-full flex-col items-center justify-between gap-4 sm:flex-row glass-panel p-4 rounded-2xl border border-white/40 dark:border-white/20 shadow-sm">
                        <div className="relative flex w-full items-center sm:max-w-md">
                            <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
                            <Input
                                type="text"
                                placeholder="Search links or destinations..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="h-12 w-full pl-12 rounded-xl bg-white/30 dark:bg-black/20 border-white/40 dark:border-white/10 focus-visible:ring-primary/50 text-base backdrop-blur-md"
                            />
                        </div>

                        <div className="flex w-full items-center justify-end gap-3 sm:w-auto">
                            <Select
                                defaultValue={(typeof filters === 'object' && !Array.isArray(filters) ? filters.sort : '') || 'newest'}
                                onValueChange={handleSortChange}
                            >
                                <SelectTrigger className="h-12 w-[180px] rounded-xl bg-white/30 dark:bg-black/20 border-white/40 dark:border-white/10 font-medium backdrop-blur-md">
                                    <SelectValue placeholder="Sort option" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-white/40 dark:border-white/10 bg-white/60 dark:bg-black/40 backdrop-blur-xl">
                                    <SelectItem value="newest" className="font-medium rounded-lg">Newest First</SelectItem>
                                    <SelectItem value="oldest" className="font-medium rounded-lg">Oldest First</SelectItem>
                                    <SelectItem value="most_clicked" className="font-medium rounded-lg">Most Clicked</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Data Table */}
                    <div className="glass-panel rounded-3xl border border-white/50 dark:border-white/20 shadow-sm overflow-hidden">
                        {isLoading ? (
                            <div className="p-8">
                                <LoadingState variant="table" count={5} message="Updating links..." />
                            </div>
                        ) : (
                            <div className="p-1">
                                {filteredLinks.length === 0 ? (
                                    <div className="glass-panel p-16 text-center text-base font-medium text-muted-foreground rounded-2xl border border-white/20">
                                        No links match your search.
                                    </div>
                                ) : (
                                    <>
                                        {/* Desktop View */}
                                        <div className="hidden lg:block overflow-x-auto">
                                            <table className="w-full border-collapse text-left">
                                                <thead>
                                                    <tr className="border-b border-white/20 dark:border-white/10 bg-white/20 dark:bg-black/20 backdrop-blur-md text-xs uppercase tracking-wider font-bold text-muted-foreground whitespace-nowrap">
                                                        <th className="px-5 py-4">Short Code</th>
                                                        <th className="px-5 py-4">Destination</th>
                                                        <th className="px-5 py-4 text-center">Clicks</th>
                                                        <th className="px-5 py-4 text-center">Status</th>
                                                        <th className="px-5 py-4">Expiration</th>
                                                        <th className="px-5 py-4 text-right">Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-white/20 dark:divide-white/5 bg-transparent text-sm">
                                                    {filteredLinks.map((link) => {
                                                        const expired = isLinkExpired(link);

                                                        return (
                                                            <tr key={link.id} className="group transition-colors duration-300 hover:bg-white/30 dark:hover:bg-white/5">
                                                                <td className="px-5 py-4 whitespace-nowrap">
                                                                    <div className="flex items-center gap-3">
                                                                        <span className="font-mono text-sm font-bold text-foreground bg-white/50 dark:bg-black/30 px-3 py-1.5 rounded-lg border border-white/40 dark:border-white/10 shadow-sm backdrop-blur-sm">
                                                                            {link.short_code}
                                                                        </span>
                                                                        <button
                                                                            onClick={() => handleCopy(link.short_code, link.id)}
                                                                            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/40 dark:bg-white/10 border border-white/50 dark:border-white/10 text-muted-foreground hover:text-foreground hover:bg-white/60 dark:hover:bg-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-sm"
                                                                            title="Copy URL"
                                                                        >
                                                                            {copiedId === link.id ? (
                                                                                <Check className="h-4 w-4 text-emerald-500" />
                                                                            ) : (
                                                                                <Copy className="h-4 w-4" />
                                                                            )}
                                                                        </button>
                                                                    </div>
                                                                </td>
                                                                <td className="px-5 py-4">
                                                                    <a
                                                                        href={link.destination_url}
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="flex max-w-[200px] md:max-w-[300px] items-center gap-2 truncate text-muted-foreground transition-colors hover:text-primary font-medium"
                                                                        title={link.destination_url}
                                                                    >
                                                                        <span className="truncate">{link.destination_url}</span>
                                                                        <ExternalLink className="h-4 w-4 shrink-0 opacity-50" />
                                                                    </a>
                                                                </td>
                                                                <td className="px-5 py-4 text-center">
                                                                    <span className="inline-flex items-center justify-center rounded-full bg-primary/10 border border-primary/10 px-3 py-1 text-xs font-bold text-primary shadow-sm backdrop-blur-sm">
                                                                        {link.clicks_count ?? 0}
                                                                    </span>
                                                                </td>
                                                                <td className="px-5 py-4 text-center">
                                                                    {expired ? (
                                                                        <span className="inline-flex items-center gap-2 rounded-full bg-destructive/10 border border-destructive/20 px-3 py-1 text-xs font-bold text-destructive shadow-sm backdrop-blur-sm">
                                                                            <div className="h-2 w-2 rounded-full bg-destructive" />
                                                                            Expired
                                                                        </span>
                                                                    ) : (
                                                                        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 shadow-sm backdrop-blur-sm">
                                                                            <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                                                            Active
                                                                        </span>
                                                                    )}
                                                                </td>
                                                                <td className="px-5 py-4 text-muted-foreground font-medium">
                                                                    {link.expires_at ? (
                                                                        <div className="flex items-center gap-2">
                                                                            <Clock className="h-4 w-4" />
                                                                            {isMounted ? new Date(link.expires_at).toLocaleDateString() : ''}
                                                                        </div>
                                                                    ) : (
                                                                        <span className="text-muted-foreground/50">--</span>
                                                                    )}
                                                                </td>
                                                                <td className="px-5 py-4 text-right whitespace-nowrap">
                                                                    <div className="flex items-center justify-end gap-2">
                                                                        <Button asChild variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-white/40 dark:bg-white/10 border border-white/50 dark:border-white/10 shadow-sm hover:shadow-md transition-all hover:bg-white/60 dark:hover:bg-white/20">
                                                                            <Link href={`/links/${link.id}`} title="View Analytics">
                                                                                <BarChart3 className="h-4 w-4" />
                                                                                <span className="sr-only">Analytics</span>
                                                                            </Link>
                                                                        </Button>
                                                                        <Button asChild variant="ghost" size="icon" className="h-10 w-10 rounded-full bg-white/40 dark:bg-white/10 border border-white/50 dark:border-white/10 shadow-sm hover:shadow-md transition-all hover:bg-white/60 dark:hover:bg-white/20">
                                                                            <Link href={`/links/${link.id}/edit`} title="Edit Link">
                                                                                <Edit2 className="h-4 w-4" />
                                                                                <span className="sr-only">Edit</span>
                                                                            </Link>
                                                                        </Button>
                                                                        <Button
                                                                            variant="ghost"
                                                                            size="icon"
                                                                            onClick={() => setSelectedLinkToDelete(link)}
                                                                            className="h-10 w-10 rounded-full bg-white/40 dark:bg-white/10 border border-white/50 dark:border-white/10 shadow-sm hover:shadow-md hover:bg-destructive/10 hover:text-destructive hover:border-destructive/20 transition-all"
                                                                            title="Delete Link"
                                                                        >
                                                                            <Trash2 className="h-4 w-4" />
                                                                            <span className="sr-only">Delete</span>
                                                                        </Button>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
                                        </div>

                                        {/* Mobile/Tablet View */}
                                        <div className="flex flex-col gap-4 lg:hidden">
                                            {filteredLinks.map((link) => {
                                                const expired = isLinkExpired(link);

                                                return (
                                                    <div key={link.id} className="glass-panel p-5 rounded-2xl border border-white/30 dark:border-white/10 shadow-sm flex flex-col gap-4">
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-2">
                                                                <span className="font-mono text-sm font-bold text-foreground bg-white/50 dark:bg-black/30 px-3 py-1.5 rounded-lg border border-white/40 dark:border-white/10 shadow-sm">
                                                                    {link.short_code}
                                                                </span>
                                                                <button
                                                                    onClick={() => handleCopy(link.short_code, link.id)}
                                                                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/40 dark:bg-white/10 border border-white/50 dark:border-white/10 text-muted-foreground hover:text-foreground shadow-sm"
                                                                    title="Copy URL"
                                                                >
                                                                    {copiedId === link.id ? (
                                                                        <Check className="h-4 w-4 text-emerald-500" />
                                                                    ) : (
                                                                        <Copy className="h-4 w-4" />
                                                                    )}
                                                                </button>
                                                            </div>
                                                            {expired ? (
                                                                <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive/10 border border-destructive/20 px-2.5 py-0.5 text-xs font-bold text-destructive">
                                                                    <div className="h-1.5 w-1.5 rounded-full bg-destructive" />
                                                                    Expired
                                                                </span>
                                                            ) : (
                                                                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                                                                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                                                    Active
                                                                </span>
                                                            )}
                                                        </div>

                                                        <div className="flex flex-col gap-1.5">
                                                            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Destination</span>
                                                            <a
                                                                href={link.destination_url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors font-medium break-all"
                                                            >
                                                                <span className="line-clamp-2">{link.destination_url}</span>
                                                                <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-50" />
                                                            </a>
                                                        </div>

                                                        <div className="flex items-center justify-between border-t border-white/10 dark:border-white/5 pt-4">
                                                            <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
                                                                <div className="flex items-center gap-1">
                                                                    <span className="font-bold text-foreground">{link.clicks_count ?? 0}</span> clicks
                                                                </div>
                                                                {link.expires_at && (
                                                                    <div className="flex items-center gap-1">
                                                                        <Clock className="h-3.5 w-3.5" />
                                                                        {isMounted ? new Date(link.expires_at).toLocaleDateString() : ''}
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="flex gap-2">
                                                                <Button asChild variant="ghost" size="icon" className="h-9 w-9 rounded-xl bg-white/40 dark:bg-white/10 border border-white/50 dark:border-white/10 shadow-sm hover:bg-white/60 dark:hover:bg-white/20">
                                                                    <Link href={`/links/${link.id}`} title="View Analytics">
                                                                        <BarChart3 className="h-4.5 w-4.5" />
                                                                    </Link>
                                                                </Button>
                                                                <Button asChild variant="ghost" size="icon" className="h-9 w-9 rounded-xl bg-white/40 dark:bg-white/10 border border-white/50 dark:border-white/10 shadow-sm hover:bg-white/60 dark:hover:bg-white/20">
                                                                    <Link href={`/links/${link.id}/edit`} title="Edit Link">
                                                                        <Edit2 className="h-4 w-4" />
                                                                    </Link>
                                                                </Button>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    onClick={() => setSelectedLinkToDelete(link)}
                                                                    className="h-9 w-9 rounded-xl bg-white/40 dark:bg-white/10 border border-white/50 dark:border-white/10 shadow-sm hover:text-destructive hover:bg-destructive/10"
                                                                    title="Delete Link"
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {links?.links && links.links.length > 3 && (
                        <div className="flex items-center justify-center gap-2 pt-6">
                            {links.links.map((pageLink, index) => {
                                const label = pageLink.label.replace('&laquo; Previous', 'Prev').replace('Next &raquo;', 'Next');

                                return (
                                    <Button
                                        key={index}
                                        asChild={!!pageLink.url}
                                        disabled={!pageLink.url || pageLink.active}
                                        variant={pageLink.active ? 'default' : 'outline'}
                                        size="sm"
                                        className={`h-10 min-w-[2.5rem] rounded-xl font-bold ${pageLink.active ? 'shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-white/40 dark:bg-white/10 border-white/50 dark:border-white/10 hover:bg-white/60 dark:hover:bg-white/20'}`}
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
                <DialogContent className="sm:max-w-md glass-panel rounded-3xl border border-white/40 dark:border-white/20">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-3 text-xl">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 border border-destructive/20 text-destructive">
                                <AlertTriangle className="h-5 w-5" />
                            </div>
                            Delete Link
                        </DialogTitle>
                        <DialogDescription className="pt-4 text-base font-medium">
                            Are you sure you want to delete <span className="font-mono bg-white/50 dark:bg-black/30 px-2 py-1 rounded-md border border-white/40 dark:border-white/10 mx-1 text-foreground shadow-sm backdrop-blur-sm">singkat.saja/{selectedLinkToDelete?.short_code}</span>? 
                            <br/><br/>
                            This will permanently remove the link from the redirect engine. Analytics data will be preserved.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="gap-3 sm:gap-0 mt-6">
                        <Button variant="outline" onClick={() => setSelectedLinkToDelete(null)} className="rounded-xl h-11 px-6 font-bold bg-white/40 dark:bg-white/10 border-white/50 dark:border-white/10 hover:bg-white/60 dark:hover:bg-white/20">
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDelete} className="rounded-xl h-11 px-6 font-bold shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </DashboardContainer>
    );
}
