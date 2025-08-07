<?php

namespace Tests\Feature;

use App\Models\Chatbot;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ChatbotTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    /**
     * Test that authenticated users can view their chatbots.
     */
    public function test_authenticated_user_can_view_chatbots(): void
    {
        $user = User::factory()->create();
        $chatbot = Chatbot::factory()->for($user)->create();

        $response = $this->actingAs($user)->get(route('chatbots.index'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('chatbots/index')
                 ->has('chatbots.data', 1)
                 ->where('chatbots.data.0.name', $chatbot->name)
        );
    }

    /**
     * Test that users can create a new chatbot.
     */
    public function test_user_can_create_chatbot(): void
    {
        $user = User::factory()->create();
        
        $chatbotData = [
            'name' => 'Test Chatbot',
            'description' => 'A test chatbot for customer support',
            'status' => 'active',
        ];

        $response = $this->actingAs($user)->post(route('chatbots.store'), $chatbotData);

        $response->assertRedirect();
        $this->assertDatabaseHas('chatbots', [
            'name' => 'Test Chatbot',
            'user_id' => $user->id,
        ]);
    }

    /**
     * Test that users can view their own chatbot details.
     */
    public function test_user_can_view_own_chatbot_details(): void
    {
        $user = User::factory()->create();
        $chatbot = Chatbot::factory()->for($user)->create();

        $response = $this->actingAs($user)->get(route('chatbots.show', $chatbot));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('chatbots/show')
                 ->where('chatbot.name', $chatbot->name)
        );
    }

    /**
     * Test that users cannot view other users' chatbots.
     */
    public function test_user_cannot_view_other_users_chatbot(): void
    {
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();
        $chatbot = Chatbot::factory()->for($user1)->create();

        $response = $this->actingAs($user2)->get(route('chatbots.show', $chatbot));

        $response->assertStatus(403);
    }

    /**
     * Test that users can update their own chatbot.
     */
    public function test_user_can_update_own_chatbot(): void
    {
        $user = User::factory()->create();
        $chatbot = Chatbot::factory()->for($user)->create();

        $updateData = [
            'name' => 'Updated Chatbot Name',
            'description' => 'Updated description',
            'status' => 'inactive',
        ];

        $response = $this->actingAs($user)->put(route('chatbots.update', $chatbot), $updateData);

        $response->assertRedirect();
        $this->assertDatabaseHas('chatbots', [
            'id' => $chatbot->id,
            'name' => 'Updated Chatbot Name',
        ]);
    }

    /**
     * Test that users can delete their own chatbot.
     */
    public function test_user_can_delete_own_chatbot(): void
    {
        $user = User::factory()->create();
        $chatbot = Chatbot::factory()->for($user)->create();

        $response = $this->actingAs($user)->delete(route('chatbots.destroy', $chatbot));

        $response->assertRedirect();
        $this->assertDatabaseMissing('chatbots', [
            'id' => $chatbot->id,
        ]);
    }

    /**
     * Test chatbot name validation.
     */
    public function test_chatbot_name_is_required(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->post(route('chatbots.store'), [
            'description' => 'Test description',
        ]);

        $response->assertSessionHasErrors('name');
    }

    /**
     * Test that chatbot status defaults to active.
     */
    public function test_chatbot_status_defaults_to_active(): void
    {
        $user = User::factory()->create();
        
        $chatbotData = [
            'name' => 'Test Chatbot',
            'description' => 'A test chatbot',
        ];

        $this->actingAs($user)->post(route('chatbots.store'), $chatbotData);

        $this->assertDatabaseHas('chatbots', [
            'name' => 'Test Chatbot',
            'status' => 'active',
        ]);
    }
}