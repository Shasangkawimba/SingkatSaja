import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\RedirectController::redirect
 * @see app/Http/Controllers/RedirectController.php:14
 * @route '/{short_code}'
 */
export const redirect = (args: { short_code: string | number } | [short_code: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: redirect.url(args, options),
    method: 'get',
})

redirect.definition = {
    methods: ["get","head"],
    url: '/{short_code}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\RedirectController::redirect
 * @see app/Http/Controllers/RedirectController.php:14
 * @route '/{short_code}'
 */
redirect.url = (args: { short_code: string | number } | [short_code: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { short_code: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    short_code: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        short_code: args.short_code,
                }

    return redirect.definition.url
            .replace('{short_code}', parsedArgs.short_code.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\RedirectController::redirect
 * @see app/Http/Controllers/RedirectController.php:14
 * @route '/{short_code}'
 */
redirect.get = (args: { short_code: string | number } | [short_code: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: redirect.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\RedirectController::redirect
 * @see app/Http/Controllers/RedirectController.php:14
 * @route '/{short_code}'
 */
redirect.head = (args: { short_code: string | number } | [short_code: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: redirect.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\RedirectController::redirect
 * @see app/Http/Controllers/RedirectController.php:14
 * @route '/{short_code}'
 */
    const redirectForm = (args: { short_code: string | number } | [short_code: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: redirect.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\RedirectController::redirect
 * @see app/Http/Controllers/RedirectController.php:14
 * @route '/{short_code}'
 */
        redirectForm.get = (args: { short_code: string | number } | [short_code: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: redirect.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\RedirectController::redirect
 * @see app/Http/Controllers/RedirectController.php:14
 * @route '/{short_code}'
 */
        redirectForm.head = (args: { short_code: string | number } | [short_code: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: redirect.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    redirect.form = redirectForm
const RedirectController = { redirect }

export default RedirectController