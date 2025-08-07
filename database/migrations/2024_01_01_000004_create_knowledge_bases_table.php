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
        Schema::create('knowledge_bases', function (Blueprint $table) {
            $table->id();
            $table->foreignId('chatbot_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->enum('type', ['pdf', 'excel', 'text']);
            $table->string('file_path')->nullable()->comment('Path to uploaded file');
            $table->string('original_filename')->nullable();
            $table->text('content')->nullable()->comment('Extracted text content');
            $table->json('metadata')->nullable()->comment('File metadata and processing info');
            $table->enum('status', ['processing', 'ready', 'error'])->default('processing');
            $table->text('error_message')->nullable();
            $table->timestamps();
            
            // Indexes for performance
            $table->index('chatbot_id');
            $table->index('type');
            $table->index('status');
            $table->index(['chatbot_id', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('knowledge_bases');
    }
};