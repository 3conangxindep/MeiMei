# MeiMei
#server

cd server

composer install 

php artisan key:generate

php artisan migrate (tạo database meimei trước khi nhập câu lệnh này)

php artisan migrate:refresh (chạy lại database khi có thay đổi)

php artisan serve

#client

cd client

npm i

npm start
