<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
    Schema::create('notifications', function (Blueprint $table) {
    $table->uuid('id')->primary();

    $table->uuid('user_id');

    $table->foreign('user_id')
          ->references('id')
          ->on('users')
          ->onDelete('cascade');

    $table->enum('type', ['sighting', 'tip', 'system', 'update'])
          ->index();

    $table->string('title');
    $table->text('message');

    $table->string('link')->nullable();

    $table->uuid('related_id')->nullable();
    $table->string('related_type')->nullable();

    $table->boolean('is_read')->default(false)->index();
    $table->timestamp('read_at')->nullable();

    $table->timestamps();
    $table->softDeletes();
});
 }

    public function down(): void
    {
        Schema::dropIfExists('notifications_tables');
    }
};
