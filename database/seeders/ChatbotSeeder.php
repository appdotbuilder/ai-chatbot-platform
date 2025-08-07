<?php

namespace Database\Seeders;

use App\Models\Chatbot;
use App\Models\Conversation;
use App\Models\KnowledgeBase;
use App\Models\Message;
use App\Models\User;
use Illuminate\Database\Seeder;

class ChatbotSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create a demo user if none exists
        $user = User::firstOrCreate(
            ['email' => 'demo@chatbot.com'],
            [
                'name' => 'Demo User',
                'password' => bcrypt('password'),
            ]
        );

        // Create chatbots for the demo user
        $chatbots = collect([
            [
                'name' => 'Customer Support Bot',
                'description' => 'Handles customer inquiries and provides 24/7 support for common questions.',
                'status' => 'active',
                'whatsapp_phone_number' => '+1234567890',
            ],
            [
                'name' => 'Sales Assistant',
                'description' => 'Helps customers with product information and guides them through the sales process.',
                'status' => 'active',
                'whatsapp_phone_number' => '+1234567891',
            ],
            [
                'name' => 'FAQ Bot',
                'description' => 'Answers frequently asked questions about our services and policies.',
                'status' => 'inactive',
                'whatsapp_phone_number' => null,
            ],
        ])->map(function ($chatbotData) use ($user) {
            return Chatbot::factory()
                ->for($user)
                ->create($chatbotData);
        });

        // Create knowledge bases for each chatbot
        $chatbots->each(function (Chatbot $chatbot) {
            // Create 2-4 knowledge bases per chatbot
            KnowledgeBase::factory(random_int(2, 4))
                ->for($chatbot)
                ->create()
                ->each(function (KnowledgeBase $kb) {
                    // Randomly set some as ready, some as processing
                    $kb->status = fake()->randomElement(['ready', 'ready', 'ready', 'processing']);
                    $kb->save();
                });
        });

        // Create conversations for active chatbots
        $chatbots->where('status', 'active')->each(function (Chatbot $chatbot) {
            // Create 3-8 conversations per active chatbot
            $conversations = Conversation::factory(random_int(3, 8))
                ->for($chatbot)
                ->create();

            // Create messages for each conversation
            $conversations->each(function (Conversation $conversation) {
                // Create 2-10 messages per conversation
                $messageCount = random_int(2, 10);
                
                for ($i = 0; $i < $messageCount; $i++) {
                    $messageTime = now()->subDays(random_int(0, 30))->addMinutes($i * 5);
                    Message::factory()
                        ->for($conversation)
                        ->create([
                            'type' => $i % 2 === 0 ? 'user' : 'bot',
                            'created_at' => $messageTime,
                        ]);
                    
                    // Update conversation last message time with each message
                    $conversation->update(['last_message_at' => $messageTime]);
                }
            });
        });

        $this->command->info('Created ' . $chatbots->count() . ' chatbots with knowledge bases and conversations');
    }
}