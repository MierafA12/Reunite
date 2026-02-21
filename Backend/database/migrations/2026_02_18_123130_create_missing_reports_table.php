<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
    Schema::create('missing_reports', function (Blueprint $table) {
    $table->uuid('id')->primary();

    $table->uuid('user_id');

    $table->foreign('user_id')
          ->references('id')
          ->on('users')
          ->onDelete('cascade');

    $table->string('first_name');
    $table->string('middle_name')->nullable();
    $table->string('last_name');

    $table->integer('age')->nullable();
    $table->enum('gender', ['male', 'female', 'other']);
    $table->string('nationality')->nullable();
    $table->string('relation_with_person');

    $table->string('last_seen_location');
    $table->date('last_seen_date');

    $table->text('physical_description');
    $table->longText('circumstances');

    $table->boolean('offer_reward')->default(false);
    $table->decimal('reward_amount', 10, 2)->nullable();

    $table->enum('status', ['pending', 'approved', 'rejected'])
          ->default('pending')
          ->index();

    $table->timestamps();
    $table->softDeletes();
});
 }

    public function down(): void
    {
        Schema::dropIfExists('missing_reports');
    }
};
