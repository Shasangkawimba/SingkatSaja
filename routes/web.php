<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [\App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');

    Route::get('links', [\App\Http\Controllers\LinkController::class, 'index'])->name('links.index');
    Route::get('links/create', [\App\Http\Controllers\LinkController::class, 'create'])->name('links.create');
    Route::post('links', [\App\Http\Controllers\LinkController::class, 'store'])->name('links.store');
    Route::get('links/{link}', [\App\Http\Controllers\LinkController::class, 'show'])->name('links.show');
    Route::get('links/{link}/edit', [\App\Http\Controllers\LinkController::class, 'edit'])->name('links.edit');
    Route::patch('links/{link}', [\App\Http\Controllers\LinkController::class, 'update'])->name('links.update');
    Route::delete('links/{link}', [\App\Http\Controllers\LinkController::class, 'destroy'])->name('links.destroy');
});

require __DIR__.'/settings.php';

Route::get('api/health', [\App\Http\Controllers\HealthController::class, 'show'])->name('health');

Route::get('robots.txt', [\App\Http\Controllers\SeoController::class, 'robots'])->name('seo.robots');
Route::get('sitemap.xml', [\App\Http\Controllers\SeoController::class, 'sitemap'])->name('seo.sitemap');

Route::get('/ping', fn () => response('pong'))->withoutMiddleware([\App\Http\Middleware\HandleInertiaRequests::class, \App\Http\Middleware\HandleAppearance::class]);

Route::get('/{short_code}', [\App\Http\Controllers\RedirectController::class, 'redirect'])->name('redirect');


