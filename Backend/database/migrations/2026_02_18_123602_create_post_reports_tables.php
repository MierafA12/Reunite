<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
    Schema::create('post_reports', function (Blueprint $table) {
    $table->uuid('id')->primary();

    $table->uuid('missing_report_id');
    $table->uuid('reported_by');

    $table->foreign('missing_report_id')
          ->references('id')
          ->on('missing_reports')
          ->onDelete('cascade');

    $table->foreign('reported_by')
          ->references('id')
          ->on('users')
          ->onDelete('cascade');

    $table->text('reason');

    $table->enum('status', ['pending', 'reviewed', 'rejected', 'confirmed'])
          ->default('pending')
          ->index();

    $table->uuid('reviewed_by')->nullable();

    $table->foreign('reviewed_by')
          ->references('id')
          ->on('users')
          ->nullOnDelete();

    $table->timestamp('reviewed_at')->nullable();

    $table->timestamps();

    $table->unique(['missing_report_id', 'reported_by']);
});
}

    public function down(): void
    {
        Schema::dropIfExists('post_reports_tables');
    }
};
