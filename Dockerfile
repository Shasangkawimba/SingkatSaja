# Stage 1: Build frontend assets
FROM node:20-alpine AS frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Install PHP dependencies
FROM composer:2 AS composer-builder
WORKDIR /app
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-interaction --no-plugins --no-scripts --prefer-dist --optimize-autoloader

# Stage 3: Production Runtime
FROM webdevops/php-nginx:8.3

# Set environment variables for webdevops image
ENV WEB_DOCUMENT_ROOT=/app/public
ENV PHP_DATE_TIMEZONE=UTC

WORKDIR /app

# Copy application files
COPY . .

# Copy vendor and public build from builder stages
COPY --from=composer-builder /app/vendor ./vendor
COPY --from=frontend-builder /app/public/build ./public/build

# Set correct permissions for storage and bootstrap
RUN chmod -R 777 storage bootstrap/cache

# Cache configuration, routes, and views for production performance
RUN php artisan config:cache && \
    php artisan route:cache && \
    php artisan view:cache
