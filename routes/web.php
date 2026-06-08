<?php

use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [\App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');

    Route::get('links', [\App\Http\Controllers\LinkController::class, 'index'])->name('links.index');
    Route::post('links', [\App\Http\Controllers\LinkController::class, 'store'])->name('links.store');
    Route::get('links/{link}', [\App\Http\Controllers\LinkController::class, 'show'])->name('links.show');
    Route::patch('links/{link}', [\App\Http\Controllers\LinkController::class, 'update'])->name('links.update');
    Route::delete('links/{link}', [\App\Http\Controllers\LinkController::class, 'destroy'])->name('links.destroy');
});

require __DIR__.'/settings.php';

Route::get('/{short_code}', [\App\Http\Controllers\RedirectController::class, 'redirect'])->name('redirect');

