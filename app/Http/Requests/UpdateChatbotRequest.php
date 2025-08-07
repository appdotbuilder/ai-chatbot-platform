<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateChatbotRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'whatsapp_phone_number' => 'nullable|string|max:20',
            'whatsapp_access_token' => 'nullable|string|max:500',
            'whatsapp_webhook_verify_token' => 'nullable|string|max:255',
            'status' => 'sometimes|in:active,inactive',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Chatbot name is required.',
            'name.max' => 'Chatbot name cannot exceed 255 characters.',
            'description.max' => 'Description cannot exceed 1000 characters.',
            'whatsapp_phone_number.max' => 'WhatsApp phone number cannot exceed 20 characters.',
            'status.in' => 'Status must be either active or inactive.',
        ];
    }
}