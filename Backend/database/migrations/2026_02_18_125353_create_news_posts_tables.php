<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
    Schema::create('news_posts', function (Blueprint $table) {
    $table->uuid('id')->primary();

    $table->uuid('user_id');

    $table->foreignId('news_category_id')
          ->constrained('news_categories')
          ->cascadeOnDelete();

    $table->foreign('user_id')
          ->references('id')
          ->on('users')
          ->cascadeOnDelete();

    $table->string('title');
    $table->string('slug')->unique();

    $table->text('excerpt')->nullable();
    $table->longText('content');

    $table->boolean('is_featured')->default(false)->index();

    $table->enum('status', ['draft', 'published'])
          ->default('draft')
          ->index();

    $table->timestamp('published_at')->nullable();

    $table->timestamps();
    $table->softDeletes();
});
}

    public function down(): void
    {
        Schema::dropIfExists('news_posts_tables');
    }
};
