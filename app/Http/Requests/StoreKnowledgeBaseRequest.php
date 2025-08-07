<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreKnowledgeBaseRequest extends FormRequest
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
            'type' => 'sometimes|in:pdf,excel,text',
            'file' => 'nullable|file|mimes:pdf,xlsx,xls,csv,txt|max:10240', // 10MB max
            'content' => 'nullable|string',
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
            'name.required' => 'Knowledge base name is required.',
            'name.max' => 'Knowledge base name cannot exceed 255 characters.',
            'file.mimes' => 'File must be a PDF, Excel, CSV, or text file.',
            'file.max' => 'File size cannot exceed 10MB.',
            'type.in' => 'Type must be pdf, excel, or text.',
        ];
    }
}