<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
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
