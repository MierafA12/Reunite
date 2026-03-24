<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('found_report_media', function (Blueprint $table) {
            $table->uuid('id')->primary();

            $table->uuid('found_report_id');
            $table->foreign('found_report_id')
                  ->references('id')
                  ->on('found_reports')
                  ->onDelete('cascade');

            $table->enum('media_type', ['image', 'video']);
            $table->string('media_url');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('found_report_media');
    }
};
