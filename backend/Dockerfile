FROM php:8.3-fpm-alpine

RUN apk add --no-cache \
    git \
    unzip \
    libzip-dev \
    libpng-dev \
    oniguruma-dev \
    libxml2-dev

RUN docker-php-ext-install pdo pdo_mysql zip

WORKDIR /var/www/html

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

COPY . .

RUN composer install --no-interaction --ignore-platform-req=ext-http

RUN php artisan key:generate || true

EXPOSE 8000

CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"]

