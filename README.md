# MeiMei
#server

cd server

composer install 

php artisan migrate (tạo database meimei trước khi nhập câu lệnh này)

php artisan db:seed --class=UserSeeder

php artisan serve

#client

npm i

npm start
