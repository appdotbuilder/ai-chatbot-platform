<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreKnowledgeBaseRequest;
use App\Http\Requests\UpdateKnowledgeBaseRequest;
use App\Models\Chatbot;
use App\Models\KnowledgeBase;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class KnowledgeBaseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Chatbot $chatbot)
    {
        abort_unless($chatbot->user_id === auth()->id(), 403);
        
        $knowledgeBases = $chatbot->knowledgeBases()
            ->latest()
            ->paginate(10);
        
        return Inertia::render('knowledge-bases/index', [
            'chatbot' => $chatbot,
            'knowledgeBases' => $knowledgeBases
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Chatbot $chatbot)
    {
        abort_unless($chatbot->user_id === auth()->id(), 403);

        return Inertia::render('knowledge-bases/create', [
            'chatbot' => $chatbot
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreKnowledgeBaseRequest $request, Chatbot $chatbot)
    {
        abort_unless($chatbot->user_id === auth()->id(), 403);
        
        $data = $request->validated();
        $data['chatbot_id'] = $chatbot->id;

        // Handle file upload if present
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $path = $file->store('knowledge-bases', 'private');
            $data['file_path'] = $path;
            $data['original_filename'] = $file->getClientOriginalName();
            
            // Determine type based on file extension
            $extension = strtolower($file->getClientOriginalExtension());
            if (in_array($extension, ['pdf'])) {
                $data['type'] = 'pdf';
            } elseif (in_array($extension, ['xlsx', 'xls', 'csv'])) {
                $data['type'] = 'excel';
            } else {
                $data['type'] = 'text';
            }
        }

        $knowledgeBase = KnowledgeBase::create($data);

        return redirect()->route('knowledge-bases.show', $knowledgeBase)
            ->with('success', 'Knowledge base created successfully! 📚');
    }

    /**
     * Display the specified resource.
     */
    public function show(Chatbot $chatbot, KnowledgeBase $knowledgeBase)
    {
        abort_unless($chatbot->user_id === auth()->id(), 403);

        return Inertia::render('knowledge-bases/show', [
            'chatbot' => $chatbot,
            'knowledgeBase' => $knowledgeBase
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Chatbot $chatbot, KnowledgeBase $knowledgeBase)
    {
        abort_unless($chatbot->user_id === auth()->id(), 403);

        return Inertia::render('knowledge-bases/edit', [
            'chatbot' => $chatbot,
            'knowledgeBase' => $knowledgeBase
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateKnowledgeBaseRequest $request, Chatbot $chatbot, KnowledgeBase $knowledgeBase)
    {
        abort_unless($chatbot->user_id === auth()->id(), 403);
        
        $knowledgeBase->update($request->validated());

        return redirect()->route('knowledge-bases.show', $knowledgeBase)
            ->with('success', 'Knowledge base updated successfully! ✨');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(KnowledgeBase $knowledgeBase)
    {
        // Check if user owns the chatbot that owns this knowledge base
        abort_unless($knowledgeBase->chatbot->user_id === auth()->id(), 403);
        
        $chatbotId = $knowledgeBase->chatbot_id;
        
        // Delete the file if it exists
        if ($knowledgeBase->file_path && Storage::disk('private')->exists($knowledgeBase->file_path)) {
            Storage::disk('private')->delete($knowledgeBase->file_path);
        }
        
        $knowledgeBase->delete();

        return redirect()->route('chatbots.knowledge-bases.index', $chatbotId)
            ->with('success', 'Knowledge base deleted successfully! 🗑️');
    }
}