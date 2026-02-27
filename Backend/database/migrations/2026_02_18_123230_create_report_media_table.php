<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
    Schema::create('report_media', function (Blueprint $table) {
    $table->uuid('id')->primary();

    $table->uuid('missing_report_id');

    $table->foreign('missing_report_id')
          ->references('id')
          ->on('missing_reports')
          ->onDelete('cascade');

    $table->enum('media_type', ['image', 'video']);

    $table->string('media_url');

    $table->timestamps();
});
 }

    public function down(): void
    {
        Schema::dropIfExists('report_media');
    }
};
