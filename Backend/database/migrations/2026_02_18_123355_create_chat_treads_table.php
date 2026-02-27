<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
    Schema::create('chat_threads', function (Blueprint $table) {
    $table->uuid('id')->primary();

    $table->uuid('missing_report_id');
    $table->uuid('owner_id');
    $table->uuid('helper_id');

    $table->foreign('missing_report_id')
          ->references('id')
          ->on('missing_reports')
          ->onDelete('cascade');

    $table->foreign('owner_id')
          ->references('id')
          ->on('users')
          ->onDelete('cascade');

    $table->foreign('helper_id')
          ->references('id')
          ->on('users')
          ->onDelete('cascade');

    $table->boolean('is_blocked')->default(false);

    $table->timestamps();

    $table->unique(['missing_report_id', 'owner_id', 'helper_id']);
});
}


    public function down(): void
    {
        Schema::dropIfExists('chat_treads');
    }
};
