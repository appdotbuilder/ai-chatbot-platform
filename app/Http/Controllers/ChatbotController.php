<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreChatbotRequest;
use App\Http\Requests\UpdateChatbotRequest;
use App\Models\Chatbot;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ChatbotController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $chatbots = $request->user()
            ->chatbots()
            ->withCount(['knowledgeBases', 'conversations'])
            ->latest()
            ->paginate(10);
        
        return Inertia::render('chatbots/index', [
            'chatbots' => $chatbots
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('chatbots/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreChatbotRequest $request)
    {
        $chatbot = $request->user()->chatbots()->create($request->validated());

        return redirect()->route('chatbots.show', $chatbot)
            ->with('success', 'Chatbot created successfully! 🤖');
    }

    /**
     * Display the specified resource.
     */
    public function show(Chatbot $chatbot)
    {
        abort_unless($chatbot->user_id === auth()->id(), 403);
        
        $chatbot->load([
            'knowledgeBases' => function ($query) {
                $query->latest();
            },
            'conversations' => function ($query) {
                $query->with('messages')->latest('last_message_at')->limit(5);
            }
        ]);

        return Inertia::render('chatbots/show', [
            'chatbot' => $chatbot
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Chatbot $chatbot)
    {
        abort_unless($chatbot->user_id === auth()->id(), 403);

        return Inertia::render('chatbots/edit', [
            'chatbot' => $chatbot
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateChatbotRequest $request, Chatbot $chatbot)
    {
        abort_unless($chatbot->user_id === auth()->id(), 403);
        
        $chatbot->update($request->validated());

        return redirect()->route('chatbots.show', $chatbot)
            ->with('success', 'Chatbot updated successfully! ✨');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Chatbot $chatbot)
    {
        abort_unless($chatbot->user_id === auth()->id(), 403);
        
        $chatbot->delete();

        return redirect()->route('chatbots.index')
            ->with('success', 'Chatbot deleted successfully! 🗑️');
    }
}