<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('daily_stats', function (Blueprint $table) {
            $table->id();
            $table->foreignId('link_id')->constrained()->cascadeOnDelete();
            $table->date('date');
            $table->integer('clicks_count')->default(0);
            $table->timestamps();

            // Unique composite constraint to support UPSERT operations
            $table->unique(['link_id', 'date'], 'uq_daily_stats_link_date');
            // Index for range queries
            $table->index(['link_id', 'date']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('daily_stats');
    }
};
