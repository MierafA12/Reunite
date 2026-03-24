<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('found_reports', function (Blueprint $table) {
            $table->uuid('id')->primary();

            // The missing report this "found" submission is for
            $table->uuid('missing_report_id');
            $table->foreign('missing_report_id')
                  ->references('id')
                  ->on('missing_reports')
                  ->onDelete('cascade');

            // The user (reporter) who is submitting the "found" evidence
            $table->uuid('reporter_id');
            $table->foreign('reporter_id')
                  ->references('id')
                  ->on('users')
                  ->onDelete('cascade');

            // Date the person was found
            $table->date('date_found');

            // Text description of how/where they were found
            $table->text('description')->nullable();

            // Status: pending = waiting admin review, confirmed = admin approved, rejected = admin rejected
            $table->enum('status', ['pending', 'confirmed', 'rejected'])->default('pending')->index();

            // Optional admin note when reviewing
            $table->text('admin_note')->nullable();

            // Admin who reviewed this
            $table->uuid('reviewed_by')->nullable();
            $table->foreign('reviewed_by')
                  ->references('id')
                  ->on('users')
                  ->nullOnDelete();

            $table->timestamp('reviewed_at')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('found_reports');
    }
};
