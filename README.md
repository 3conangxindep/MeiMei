# MeiMei
#server

cd server
composer install
php artisan migrate
php artisan db:seed --class=UserSeeder
php artisan serve

#client

npm i
npm start
