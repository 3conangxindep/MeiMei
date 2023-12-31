<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCompanyTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('company', function (Blueprint $table) {
            $table->string('id_card')->primary();
            $table->string('com_name')->nullable();
            $table->string('com_tel')->nullable();
            $table->string('com_fax')->nullable();
            $table->string('com_email')->nullable();
            $table->string('com_post_code')->nullable();
            $table->string('com_address')->nullable();
            $table->string('department')->nullable();
            $table->string('position')->nullable();
            $table->string('website')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
            $table->softDeletes();

            // Foreign key
            $table->foreign('id_card')->references('id_card')->on('user');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('company');
    }
}
