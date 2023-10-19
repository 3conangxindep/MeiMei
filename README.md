# MeiMei
#server

cd server
composer install \n
php artisan migrate \n
php artisan db:seed --class=UserSeeder
php artisan serve

#client

npm i
npm start
