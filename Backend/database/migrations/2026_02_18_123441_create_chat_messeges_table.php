<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
    Schema::create('chat_messages', function (Blueprint $table) {
    $table->uuid('id')->primary();

    $table->uuid('thread_id');
    $table->uuid('sender_id');

    $table->foreign('thread_id')
          ->references('id')
          ->on('chat_threads')
          ->onDelete('cascade');

    $table->foreign('sender_id')
          ->references('id')
          ->on('users')
          ->onDelete('cascade');

    $table->text('message');

    $table->boolean('is_read')->default(false)->index();
    $table->timestamp('read_at')->nullable();

    $table->boolean('is_reported')->default(false);

    $table->timestamps();
});
}

    public function down(): void
    {
        Schema::dropIfExists('chat_messeges');
    }
};
