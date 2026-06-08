<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('links', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('short_code');
            $table->text('destination_url');
            $table->timestamp('expires_at')->nullable();
            $table->timestamps();
            $table->softDeletes();

            // Index for dashboard listing performance
            $table->index(['user_id', 'deleted_at']);
        });

        // Partial unique index to allow soft-deleted duplicates but enforce active uniqueness
        DB::statement('CREATE UNIQUE INDEX uq_links_active_short_code ON links (short_code) WHERE (deleted_at IS NULL)');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('links');
    }
};
