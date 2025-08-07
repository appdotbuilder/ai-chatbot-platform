<?php

use App\Http\Controllers\ChatbotController;
use App\Http\Controllers\KnowledgeBaseController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $chatbots = auth()->user()
            ->chatbots()
            ->withCount(['knowledgeBases', 'conversations'])
            ->latest()
            ->limit(3)
            ->get();
        
        return Inertia::render('dashboard', [
            'chatbots' => ['data' => $chatbots]
        ]);
    })->name('dashboard');
    
    // Chatbot routes
    Route::resource('chatbots', ChatbotController::class);
    Route::resource('chatbots.knowledge-bases', KnowledgeBaseController::class)->shallow();
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
