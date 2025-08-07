<?php

namespace Database\Factories;

use App\Models\Chatbot;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\KnowledgeBase>
 */
class KnowledgeBaseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $types = ['pdf', 'excel', 'text'];
        $type = fake()->randomElement($types);
        
        $fileExtensions = [
            'pdf' => '.pdf',
            'excel' => fake()->randomElement(['.xlsx', '.xls', '.csv']),
            'text' => '.txt'
        ];

        return [
            'chatbot_id' => Chatbot::factory(),
            'name' => fake()->words(3, true),
            'type' => $type,
            'file_path' => fake()->optional()->filePath(),
            'original_filename' => fake()->words(2, true) . $fileExtensions[$type],
            'content' => fake()->optional()->paragraphs(5, true),
            'metadata' => [
                'file_size' => fake()->numberBetween(1024, 10485760), // 1KB to 10MB
                'pages' => $type === 'pdf' ? fake()->numberBetween(1, 50) : null,
                'sheets' => $type === 'excel' ? fake()->numberBetween(1, 10) : null,
                'processed_at' => fake()->dateTimeThisMonth(),
            ],
            'status' => fake()->randomElement(['processing', 'ready', 'error']),
            'error_message' => fake()->optional(0.1)->sentence(),
        ];
    }

    /**
     * Indicate that the knowledge base is ready.
     */
    public function ready(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'ready',
            'error_message' => null,
        ]);
    }

    /**
     * Indicate that the knowledge base is processing.
     */
    public function processing(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'processing',
            'error_message' => null,
        ]);
    }

    /**
     * Indicate that the knowledge base has an error.
     */
    public function error(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'error',
            'error_message' => fake()->sentence(),
        ]);
    }

    /**
     * Create a PDF knowledge base.
     */
    public function pdf(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'pdf',
            'original_filename' => fake()->words(2, true) . '.pdf',
            'metadata' => array_merge($attributes['metadata'] ?? [], [
                'pages' => fake()->numberBetween(1, 50),
            ]),
        ]);
    }

    /**
     * Create an Excel knowledge base.
     */
    public function excel(): static
    {
        return $this->state(fn (array $attributes) => [
            'type' => 'excel',
            'original_filename' => fake()->words(2, true) . fake()->randomElement(['.xlsx', '.xls', '.csv']),
            'metadata' => array_merge($attributes['metadata'] ?? [], [
                'sheets' => fake()->numberBetween(1, 10),
                'rows' => fake()->numberBetween(10, 1000),
            ]),
        ]);
    }
}