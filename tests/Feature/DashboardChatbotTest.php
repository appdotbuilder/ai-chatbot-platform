<?php

namespace Tests\Feature;

use App\Models\Chatbot;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DashboardChatbotTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Test that the dashboard displays chatbot information for authenticated users.
     */
    public function test_dashboard_displays_chatbot_information(): void
    {
        $user = User::factory()->create();
        $chatbots = Chatbot::factory(3)->for($user)->create();

        $response = $this->actingAs($user)->get('/dashboard');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('dashboard')
                 ->has('chatbots.data', 3)
        );
    }

    /**
     * Test that the dashboard shows empty state when user has no chatbots.
     */
    public function test_dashboard_shows_empty_state_when_no_chatbots(): void
    {
        $user = User::factory()->create();

        $response = $this->actingAs($user)->get('/dashboard');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('dashboard')
                 ->has('chatbots.data', 0)
        );
    }

    /**
     * Test that unauthenticated users are redirected from dashboard.
     */
    public function test_unauthenticated_users_redirected_from_dashboard(): void
    {
        $response = $this->get('/dashboard');

        $response->assertRedirect('/login');
    }

    /**
     * Test that the welcome page loads for unauthenticated users.
     */
    public function test_welcome_page_loads_for_unauthenticated_users(): void
    {
        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('welcome')
        );
    }
}