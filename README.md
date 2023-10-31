# MeiMei
#server

・env.example ファイルを.env にコピーして、データベースの認証情報を更新する
・MySQL は autocommit (自動コミットモード)を無効化する方は　 autocommit を設定してください。

cd server

composer install 

php artisan key:generate

php artisan migrate (tạo database meimei trước khi nhập câu lệnh này)

php artisan db:seed --class=UserSeeder (chay Seeder)

php artisan serve

#client

cd client

npm i

npm start
