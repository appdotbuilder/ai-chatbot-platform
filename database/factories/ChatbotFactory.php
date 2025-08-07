<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Chatbot>
 */
class ChatbotFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'name' => fake()->randomElement([
                'Customer Support Bot',
                'Sales Assistant',
                'FAQ Helper',
                'Order Tracker',
                'Product Advisor'
            ]),
            'description' => fake()->sentence(10),
            'whatsapp_phone_number' => fake()->optional()->phoneNumber(),
            'whatsapp_access_token' => fake()->optional()->sha256(),
            'whatsapp_webhook_verify_token' => fake()->optional()->uuid(),
            'status' => fake()->randomElement(['active', 'inactive']),
            'settings' => [
                'response_delay' => fake()->numberBetween(1, 5),
                'max_retries' => fake()->numberBetween(3, 5),
                'timeout' => fake()->numberBetween(30, 120),
            ],
        ];
    }

    /**
     * Indicate that the chatbot is active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'active',
        ]);
    }

    /**
     * Indicate that the chatbot is inactive.
     */
    public function inactive(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'inactive',
        ]);
    }

    /**
     * Indicate that the chatbot has WhatsApp configured.
     */
    public function withWhatsApp(): static
    {
        return $this->state(fn (array $attributes) => [
            'whatsapp_phone_number' => '+1' . fake()->numerify('##########'),
            'whatsapp_access_token' => fake()->sha256(),
            'whatsapp_webhook_verify_token' => fake()->uuid(),
        ]);
    }
}