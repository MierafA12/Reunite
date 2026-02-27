<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
    Schema::create('password_reset_tokens', function (Blueprint $table) {
    $table->uuid('id')->primary();

    $table->uuid('user_id');

    $table->foreign('user_id')
          ->references('id')
          ->on('users')
          ->onDelete('cascade');

    $table->string('token');

    $table->timestamp('expires_at');
    $table->boolean('used')->default(false)->index();

    $table->timestamps();
});
}

    public function down(): void
    {
        Schema::dropIfExists('password_reset_tokens_tables');
    }
};
