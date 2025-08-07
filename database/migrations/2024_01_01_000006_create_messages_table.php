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
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('conversation_id')->constrained()->onDelete('cascade');
            $table->enum('type', ['user', 'bot'])->comment('Message sender type');
            $table->text('content');
            $table->string('whatsapp_message_id')->nullable()->comment('WhatsApp message ID');
            $table->json('metadata')->nullable()->comment('Additional message data');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('conversation_id');
            $table->index('type');
            $table->index('whatsapp_message_id');
            $table->index(['conversation_id', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};