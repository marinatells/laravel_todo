После клонирования проекта:

1. `composer update`
2. Копировать файл
    1. `cp .env.example .env` (MacOS/Linux)
    2. `copy .env.example .env` (Windows)
3. `php artisan key:generate`
4. создай новую БД, пропиши её настройки в файле `.env`
5. `php artisan migrate`
6. `php artisan db:seed`
7. `npm i`
8. `npm run dev`

После запусти эти команды в разных терминалах и надейся на лучшее)

1. `npm run hot`
2. `php artisan serve`
