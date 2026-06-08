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
        Schema::create('click_events', function (Blueprint $table) {
            $table->id();
            $table->foreignId('link_id')->constrained()->cascadeOnDelete();
            $table->string('browser', 50)->nullable();
            $table->string('device_type', 50)->nullable();
            $table->string('platform', 50)->nullable();
            $table->string('country', 10)->nullable();
            $table->text('referer')->nullable();
            $table->ipAddress('ip_address')->nullable(); // Creates INET column on PostgreSQL
            $table->text('user_agent')->nullable();
            $table->timestamp('clicked_at')->useCurrent();

            // Composite index for time-series query performance
            $table->index(['link_id', 'clicked_at']);
            // Dimensional lookup aggregation index
            $table->index(['link_id', 'device_type', 'browser', 'platform'], 'idx_click_events_dimensions');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('click_events');
    }
};
