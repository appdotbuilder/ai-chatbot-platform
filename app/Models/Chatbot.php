<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Chatbot
 *
 * @property int $id
 * @property int $user_id
 * @property string $name
 * @property string|null $description
 * @property string|null $whatsapp_phone_number
 * @property string|null $whatsapp_access_token
 * @property string|null $whatsapp_webhook_verify_token
 * @property string $status
 * @property array|null $settings
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @property-read \App\Models\User $user
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\KnowledgeBase> $knowledgeBases
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Conversation> $conversations
 * @property-read int|null $knowledge_bases_count
 * @property-read int|null $conversations_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Chatbot newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Chatbot newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Chatbot query()
 * @method static \Illuminate\Database\Eloquent\Builder|Chatbot whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Chatbot whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Chatbot whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Chatbot whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Chatbot whereSettings($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Chatbot whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Chatbot whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Chatbot whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Chatbot whereWhatsappAccessToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Chatbot whereWhatsappPhoneNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Chatbot whereWhatsappWebhookVerifyToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Chatbot active()
 * @method static \Database\Factories\ChatbotFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Chatbot extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'name',
        'description',
        'whatsapp_phone_number',
        'whatsapp_access_token',
        'whatsapp_webhook_verify_token',
        'status',
        'settings',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'settings' => 'array',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user that owns the chatbot.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the knowledge bases for the chatbot.
     */
    public function knowledgeBases(): HasMany
    {
        return $this->hasMany(KnowledgeBase::class);
    }

    /**
     * Get the conversations for the chatbot.
     */
    public function conversations(): HasMany
    {
        return $this->hasMany(Conversation::class);
    }

    /**
     * Scope a query to only include active chatbots.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }
}