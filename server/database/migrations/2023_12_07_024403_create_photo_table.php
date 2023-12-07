<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('photos', function (Blueprint $table) {
            $table->increments('id');
            $table->string('photo_path', 350);
            $table->timestamps();
            // データを消すではなく消す日にちを付ける)関数を使うためのカラム
            $table->timestamp('deleted_at')->nullable();
            //$table->integer('group_id')->unsigned();
            //$table->integer('user_id')->unsigned();

            // $table->foreign('group_id')->references('group_id')->on('groups');
            // $table->foreign('user_id')->references('user_id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Schema::table('photos', function (Blueprint $table) {
        //     $table->dropForeign(['group_id']);
        //     $table->dropForeign(['user_id']);
        // });

        Schema::dropIfExists('photos');
    }
};
