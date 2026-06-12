#!/usr/bin/env bash
# exit on error
set -o errexit

# Install PHP production dependencies
composer install --no-dev --optimize-autoloader

# Install Node dependencies and build the Inertia frontend bundle
npm install
npm run build

# Cache configuration, routes, and views for production performance
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Run database migrations
php artisan migrate --force
