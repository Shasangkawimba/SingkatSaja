import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\LinkController::index
 * @see app/Http/Controllers/LinkController.php:24
 * @route '/links'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/links',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LinkController::index
 * @see app/Http/Controllers/LinkController.php:24
 * @route '/links'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\LinkController::index
 * @see app/Http/Controllers/LinkController.php:24
 * @route '/links'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\LinkController::index
 * @see app/Http/Controllers/LinkController.php:24
 * @route '/links'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\LinkController::index
 * @see app/Http/Controllers/LinkController.php:24
 * @route '/links'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\LinkController::index
 * @see app/Http/Controllers/LinkController.php:24
 * @route '/links'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\LinkController::index
 * @see app/Http/Controllers/LinkController.php:24
 * @route '/links'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\LinkController::create
 * @see app/Http/Controllers/LinkController.php:39
 * @route '/links/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/links/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LinkController::create
 * @see app/Http/Controllers/LinkController.php:39
 * @route '/links/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\LinkController::create
 * @see app/Http/Controllers/LinkController.php:39
 * @route '/links/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\LinkController::create
 * @see app/Http/Controllers/LinkController.php:39
 * @route '/links/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\LinkController::create
 * @see app/Http/Controllers/LinkController.php:39
 * @route '/links/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\LinkController::create
 * @see app/Http/Controllers/LinkController.php:39
 * @route '/links/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\LinkController::create
 * @see app/Http/Controllers/LinkController.php:39
 * @route '/links/create'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\LinkController::store
 * @see app/Http/Controllers/LinkController.php:47
 * @route '/links'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/links',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\LinkController::store
 * @see app/Http/Controllers/LinkController.php:47
 * @route '/links'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\LinkController::store
 * @see app/Http/Controllers/LinkController.php:47
 * @route '/links'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\LinkController::store
 * @see app/Http/Controllers/LinkController.php:47
 * @route '/links'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\LinkController::store
 * @see app/Http/Controllers/LinkController.php:47
 * @route '/links'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\LinkController::show
 * @see app/Http/Controllers/LinkController.php:58
 * @route '/links/{link}'
 */
export const show = (args: { link: number | { id: number } } | [link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/links/{link}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LinkController::show
 * @see app/Http/Controllers/LinkController.php:58
 * @route '/links/{link}'
 */
show.url = (args: { link: number | { id: number } } | [link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { link: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { link: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    link: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        link: typeof args.link === 'object'
                ? args.link.id
                : args.link,
                }

    return show.definition.url
            .replace('{link}', parsedArgs.link.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\LinkController::show
 * @see app/Http/Controllers/LinkController.php:58
 * @route '/links/{link}'
 */
show.get = (args: { link: number | { id: number } } | [link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\LinkController::show
 * @see app/Http/Controllers/LinkController.php:58
 * @route '/links/{link}'
 */
show.head = (args: { link: number | { id: number } } | [link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\LinkController::show
 * @see app/Http/Controllers/LinkController.php:58
 * @route '/links/{link}'
 */
    const showForm = (args: { link: number | { id: number } } | [link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\LinkController::show
 * @see app/Http/Controllers/LinkController.php:58
 * @route '/links/{link}'
 */
        showForm.get = (args: { link: number | { id: number } } | [link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\LinkController::show
 * @see app/Http/Controllers/LinkController.php:58
 * @route '/links/{link}'
 */
        showForm.head = (args: { link: number | { id: number } } | [link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\LinkController::edit
 * @see app/Http/Controllers/LinkController.php:72
 * @route '/links/{link}/edit'
 */
export const edit = (args: { link: number | { id: number } } | [link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/links/{link}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\LinkController::edit
 * @see app/Http/Controllers/LinkController.php:72
 * @route '/links/{link}/edit'
 */
edit.url = (args: { link: number | { id: number } } | [link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { link: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { link: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    link: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        link: typeof args.link === 'object'
                ? args.link.id
                : args.link,
                }

    return edit.definition.url
            .replace('{link}', parsedArgs.link.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\LinkController::edit
 * @see app/Http/Controllers/LinkController.php:72
 * @route '/links/{link}/edit'
 */
edit.get = (args: { link: number | { id: number } } | [link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\LinkController::edit
 * @see app/Http/Controllers/LinkController.php:72
 * @route '/links/{link}/edit'
 */
edit.head = (args: { link: number | { id: number } } | [link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\LinkController::edit
 * @see app/Http/Controllers/LinkController.php:72
 * @route '/links/{link}/edit'
 */
    const editForm = (args: { link: number | { id: number } } | [link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\LinkController::edit
 * @see app/Http/Controllers/LinkController.php:72
 * @route '/links/{link}/edit'
 */
        editForm.get = (args: { link: number | { id: number } } | [link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\LinkController::edit
 * @see app/Http/Controllers/LinkController.php:72
 * @route '/links/{link}/edit'
 */
        editForm.head = (args: { link: number | { id: number } } | [link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\LinkController::update
 * @see app/Http/Controllers/LinkController.php:84
 * @route '/links/{link}'
 */
export const update = (args: { link: number | { id: number } } | [link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

update.definition = {
    methods: ["patch"],
    url: '/links/{link}',
} satisfies RouteDefinition<["patch"]>

/**
* @see \App\Http\Controllers\LinkController::update
 * @see app/Http/Controllers/LinkController.php:84
 * @route '/links/{link}'
 */
update.url = (args: { link: number | { id: number } } | [link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { link: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { link: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    link: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        link: typeof args.link === 'object'
                ? args.link.id
                : args.link,
                }

    return update.definition.url
            .replace('{link}', parsedArgs.link.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\LinkController::update
 * @see app/Http/Controllers/LinkController.php:84
 * @route '/links/{link}'
 */
update.patch = (args: { link: number | { id: number } } | [link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\LinkController::update
 * @see app/Http/Controllers/LinkController.php:84
 * @route '/links/{link}'
 */
    const updateForm = (args: { link: number | { id: number } } | [link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\LinkController::update
 * @see app/Http/Controllers/LinkController.php:84
 * @route '/links/{link}'
 */
        updateForm.patch = (args: { link: number | { id: number } } | [link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\LinkController::destroy
 * @see app/Http/Controllers/LinkController.php:97
 * @route '/links/{link}'
 */
export const destroy = (args: { link: number | { id: number } } | [link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/links/{link}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\LinkController::destroy
 * @see app/Http/Controllers/LinkController.php:97
 * @route '/links/{link}'
 */
destroy.url = (args: { link: number | { id: number } } | [link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { link: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { link: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    link: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        link: typeof args.link === 'object'
                ? args.link.id
                : args.link,
                }

    return destroy.definition.url
            .replace('{link}', parsedArgs.link.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\LinkController::destroy
 * @see app/Http/Controllers/LinkController.php:97
 * @route '/links/{link}'
 */
destroy.delete = (args: { link: number | { id: number } } | [link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\LinkController::destroy
 * @see app/Http/Controllers/LinkController.php:97
 * @route '/links/{link}'
 */
    const destroyForm = (args: { link: number | { id: number } } | [link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\LinkController::destroy
 * @see app/Http/Controllers/LinkController.php:97
 * @route '/links/{link}'
 */
        destroyForm.delete = (args: { link: number | { id: number } } | [link: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const LinkController = { index, create, store, show, edit, update, destroy }

export default LinkController