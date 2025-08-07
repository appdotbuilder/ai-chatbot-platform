<?php

namespace Database\Factories;

use App\Models\Conversation;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Message>
 */
class MessageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $type = fake()->randomElement(['user', 'bot']);
        
        $userMessages = [
            'Hi, I need help with my order',
            'What are your business hours?',
            'Can you tell me about your products?',
            'I have a question about pricing',
            'How can I contact support?',
            'What is your return policy?',
            'Do you offer discounts?',
            'I need to cancel my order',
        ];
        
        $botMessages = [
            'Hello! I\'m here to help you with any questions you might have.',
            'Our business hours are Monday to Friday, 9 AM to 6 PM.',
            'I can help you find information about our products and services.',
            'Let me check that for you. Please give me a moment.',
            'Is there anything else I can help you with today?',
            'Thank you for contacting us. We appreciate your business!',
            'I\'ll connect you with a human agent who can better assist you.',
            'Based on your query, here\'s what I found...',
        ];

        return [
            'conversation_id' => Conversation::factory(),
            'type' => $type,
            'content' => $type === 'user' ? 
                fake()->randomElement($userMessages) : 
                fake()->randomElement($botMessages),
            'whatsapp_message_id' => fake()->optional(0.8)->uuid(),
            'metadata' => [
                'timestamp' => fake()->unixTime(),
                'message_status' => fake()->randomElement(['sent', 'delivered', 'read']),
                'media_type' => fake()->optional(0.1)->randomElement(['image', 'document', 'audio']),
            ],
        ];
    }

    /**
     * Create a user message.
     */
    public function fromUser(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'user',
        ]);
    }

    /**
     * Create a bot message.
     */
    public function fromBot(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'bot',
        ]);
    }

    /**
     * Create a message with media.
     */
    public function withMedia(string $mediaType = 'image'): static
    {
        return $this->state(fn (array $attributes) => [
            'metadata' => array_merge($attributes['metadata'] ?? [], [
                'media_type' => $mediaType,
                'media_url' => fake()->imageUrl(),
            ]),
        ]);
    }
}