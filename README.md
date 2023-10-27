# MeiMei
#server

cd server

composer install 

php artisan key:generate

php artisan migrate (tạo database meimei trước khi nhập câu lệnh này)

php artisan serve

#client

cd client

npm i

npm start
