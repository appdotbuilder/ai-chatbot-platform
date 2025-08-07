<?php

namespace Tests\Feature;

use App\Models\Chatbot;
use App\Models\KnowledgeBase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class KnowledgeBaseTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        Storage::fake('private');
    }

    /**
     * Test that users can view knowledge bases for their chatbot.
     */
    public function test_user_can_view_chatbot_knowledge_bases(): void
    {
        $user = User::factory()->create();
        $chatbot = Chatbot::factory()->for($user)->create();
        $knowledgeBase = KnowledgeBase::factory()->for($chatbot)->create();

        $response = $this->actingAs($user)->get(route('chatbots.knowledge-bases.index', $chatbot));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('knowledge-bases/index')
                 ->has('knowledgeBases.data', 1)
        );
    }

    /**
     * Test that users can create a knowledge base with text content.
     */
    public function test_user_can_create_knowledge_base_with_text(): void
    {
        $user = User::factory()->create();
        $chatbot = Chatbot::factory()->for($user)->create();

        $knowledgeBaseData = [
            'name' => 'Company FAQ',
            'type' => 'text',
            'content' => 'This is our frequently asked questions content.',
        ];

        $response = $this->actingAs($user)->post(
            route('chatbots.knowledge-bases.store', $chatbot), 
            $knowledgeBaseData
        );

        $response->assertRedirect();
        $this->assertDatabaseHas('knowledge_bases', [
            'name' => 'Company FAQ',
            'chatbot_id' => $chatbot->id,
            'type' => 'text',
        ]);
    }

    /**
     * Test that users can upload a file for knowledge base.
     */
    public function test_user_can_upload_file_for_knowledge_base(): void
    {
        $user = User::factory()->create();
        $chatbot = Chatbot::factory()->for($user)->create();
        
        $file = UploadedFile::fake()->create('test.pdf', 1000, 'application/pdf');

        $knowledgeBaseData = [
            'name' => 'Product Manual',
            'file' => $file,
        ];

        $response = $this->actingAs($user)->post(
            route('chatbots.knowledge-bases.store', $chatbot), 
            $knowledgeBaseData
        );

        $response->assertRedirect();
        $this->assertDatabaseHas('knowledge_bases', [
            'name' => 'Product Manual',
            'chatbot_id' => $chatbot->id,
            'type' => 'pdf',
            'original_filename' => 'test.pdf',
        ]);

        // Check that file was stored
        $knowledgeBase = KnowledgeBase::where('name', 'Product Manual')->first();
        Storage::disk('private')->assertExists($knowledgeBase->file_path);
    }

    /**
     * Test that users can only access knowledge bases for their own chatbots.
     */
    public function test_user_cannot_access_other_users_knowledge_bases(): void
    {
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();
        $chatbot = Chatbot::factory()->for($user1)->create();

        $response = $this->actingAs($user2)->get(route('chatbots.knowledge-bases.index', $chatbot));

        $response->assertStatus(403);
    }

    /**
     * Test that knowledge base name is required.
     */
    public function test_knowledge_base_name_is_required(): void
    {
        $user = User::factory()->create();
        $chatbot = Chatbot::factory()->for($user)->create();

        $response = $this->actingAs($user)->post(
            route('chatbots.knowledge-bases.store', $chatbot), 
            []
        );

        $response->assertSessionHasErrors('name');
    }

    /**
     * Test that file upload validates allowed types.
     */
    public function test_file_upload_validates_allowed_types(): void
    {
        $user = User::factory()->create();
        $chatbot = Chatbot::factory()->for($user)->create();
        
        $file = UploadedFile::fake()->create('test.exe', 1000, 'application/exe');

        $knowledgeBaseData = [
            'name' => 'Invalid File',
            'file' => $file,
        ];

        $response = $this->actingAs($user)->post(
            route('chatbots.knowledge-bases.store', $chatbot), 
            $knowledgeBaseData
        );

        $response->assertSessionHasErrors('file');
    }

    /**
     * Test that file size is validated.
     */
    public function test_file_size_is_validated(): void
    {
        $user = User::factory()->create();
        $chatbot = Chatbot::factory()->for($user)->create();
        
        // Create a file larger than 10MB (10240 KB)
        $file = UploadedFile::fake()->create('large.pdf', 12000, 'application/pdf');

        $knowledgeBaseData = [
            'name' => 'Large File',
            'file' => $file,
        ];

        $response = $this->actingAs($user)->post(
            route('chatbots.knowledge-bases.store', $chatbot), 
            $knowledgeBaseData
        );

        $response->assertSessionHasErrors('file');
    }

    /**
     * Test that users can delete their knowledge bases.
     */
    public function test_user_can_delete_knowledge_base(): void
    {
        $user = User::factory()->create();
        $chatbot = Chatbot::factory()->for($user)->create();
        $knowledgeBase = KnowledgeBase::factory()->for($chatbot)->create();

        $response = $this->actingAs($user)->delete(
            route('knowledge-bases.destroy', $knowledgeBase)
        );

        $response->assertRedirect();
        $this->assertDatabaseMissing('knowledge_bases', [
            'id' => $knowledgeBase->id,
        ]);
    }
}