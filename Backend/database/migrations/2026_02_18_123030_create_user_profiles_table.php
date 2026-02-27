<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
    Schema::create('user_profiles', function (Blueprint $table) {
    $table->uuid('id')->primary();

    $table->uuid('user_id')->unique();

    $table->foreign('user_id')
          ->references('id')
          ->on('users')
          ->onDelete('cascade');

    $table->string('profile_image')->nullable();

    $table->string('middle_name')->nullable();
    $table->string('phone')->nullable()->unique();
    $table->string('workplace')->nullable();
    $table->string('address')->nullable();

    $table->date('date_of_birth')->nullable();
    $table->enum('gender', ['male', 'female', 'other'])->nullable();

    $table->text('bio')->nullable();

    $table->timestamps();
});

    }

    public function down(): void
    {
        Schema::dropIfExists('user_profiles');
    }
};
