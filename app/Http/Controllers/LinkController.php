<?php

namespace App\Http\Controllers;

use App\Actions\Link\CreateLinkAction;
use App\Actions\Link\DeleteLinkAction;
use App\Actions\Analytics\GetLinkAnalyticsAction;
use App\Actions\Link\GetLinksAction;
use App\Actions\Link\UpdateLinkAction;
use App\Http\Requests\StoreLinkRequest;
use App\Http\Requests\UpdateLinkRequest;
use App\Models\Link;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class LinkController extends Controller
{
    /**
     * Display a listing of the user's links.
     */
    public function index(Request $request, GetLinksAction $action): Response
    {
        $links = $action->execute($request->user(), $request->all());

        return Inertia::render('links/index', [
            'links' => $links,
            'filters' => [
                'sort' => $request->query('sort', 'newest'),
            ],
        ]);
    }

    /**
     * Show the form for creating a new link.
     */
    public function create(): Response
    {
        return Inertia::render('links/create');
    }
 
    /**
     * Store a newly created link.
     */
    public function store(StoreLinkRequest $request, CreateLinkAction $action): RedirectResponse
    {
        $action->execute($request->user(), $request->validated());
 
        return redirect()->route('links.index')
            ->with('success', 'Link created successfully.');
    }
 
    /**
     * Display the specified link's analytics dashboard.
     */
    public function show(Link $link, GetLinkAnalyticsAction $action): Response
    {
        Gate::authorize('view', $link);
 
        $analytics = $action->execute($link);
 
        return Inertia::render('links/show', [
            'analytics' => $analytics,
        ]);
    }

    /**
     * Show the form for editing the specified link.
     */
    public function edit(Link $link): Response
    {
        Gate::authorize('update', $link);

        return Inertia::render('links/edit', [
            'link' => $link,
        ]);
    }

    /**
     * Update the specified link in storage.
     */
    public function update(UpdateLinkRequest $request, Link $link, UpdateLinkAction $action): RedirectResponse
    {
        Gate::authorize('update', $link);

        $action->execute($link, $request->validated());

        return redirect()->route('links.index')
            ->with('success', 'Link updated successfully.');
    }

    /**
     * Remove the specified link from storage.
     */
    public function destroy(Link $link, DeleteLinkAction $action): RedirectResponse
    {
        Gate::authorize('delete', $link);

        $action->execute($link);

        return redirect()->route('links.index')
            ->with('success', 'Link deleted successfully.');
    }
}
