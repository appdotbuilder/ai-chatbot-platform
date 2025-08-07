<?php

namespace Database\Factories;

use App\Models\Chatbot;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Conversation>
 */
class ConversationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $lastMessageAt = fake()->optional(0.8)->dateTimeThisMonth();
        
        return [
            'chatbot_id' => Chatbot::factory(),
            'whatsapp_phone_number' => '+1' . fake()->numerify('##########'),
            'whatsapp_name' => fake()->optional(0.7)->name(),
            'status' => fake()->randomElement(['active', 'closed']),
            'last_message_at' => $lastMessageAt,
        ];
    }

    /**
     * Indicate that the conversation is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'active',
            'last_message_at' => fake()->dateTimeBetween('-1 week', 'now'),
        ]);
    }

    /**
     * Indicate that the conversation is closed.
     */
    public function closed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'closed',
        ]);
    }

    /**
     * Indicate that the conversation has recent activity.
     */
    public function recent(): static
    {
        return $this->state(fn (array $attributes) => [
            'last_message_at' => fake()->dateTimeBetween('-1 day', 'now'),
        ]);
    }
}