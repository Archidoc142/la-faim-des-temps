#!/bin/bash
set -e

echo "Deployment started ..."

# Enter maintenance mode or return true
# if already is in maintenance mode
(php artisan down) || true

# Pull the latest version of the app
git reset --hard
git pull origin main
git push

# Install composer dependencies
npm i
composer update --with-all-dependencies
composer install --no-interaction --prefer-dist --optimize-autoloader

# Clear the old cache
php artisan clear-compiled

# Recreate cache
php artisan optimize

# Compile npm assets
npm run build

# Run database migrations
php artisan migrate:fresh --seed

# Exit maintenance mode
php artisan up

echo "Deployment finished!"
