<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\KnowledgeBase
 *
 * @property int $id
 * @property int $chatbot_id
 * @property string $name
 * @property string $type
 * @property string|null $file_path
 * @property string|null $original_filename
 * @property string|null $content
 * @property array|null $metadata
 * @property string $status
 * @property string|null $error_message
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read \App\Models\Chatbot $chatbot
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|KnowledgeBase newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|KnowledgeBase newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|KnowledgeBase query()
 * @method static \Illuminate\Database\Eloquent\Builder|KnowledgeBase whereChatbotId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KnowledgeBase whereContent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KnowledgeBase whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KnowledgeBase whereErrorMessage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KnowledgeBase whereFilePath($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KnowledgeBase whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KnowledgeBase whereMetadata($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KnowledgeBase whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KnowledgeBase whereOriginalFilename($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KnowledgeBase whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KnowledgeBase whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KnowledgeBase whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|KnowledgeBase ready()
 * @method static \Database\Factories\KnowledgeBaseFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class KnowledgeBase extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'chatbot_id',
        'name',
        'type',
        'file_path',
        'original_filename',
        'content',
        'metadata',
        'status',
        'error_message',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'metadata' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the chatbot that owns the knowledge base.
     */
    public function chatbot(): BelongsTo
    {
        return $this->belongsTo(Chatbot::class);
    }

    /**
     * Scope a query to only include ready knowledge bases.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeReady($query)
    {
        return $query->where('status', 'ready');
    }
}