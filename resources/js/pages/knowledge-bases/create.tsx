import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { type BreadcrumbItem } from '@/types';

interface CreateKnowledgeBaseProps {
    chatbot: {
        id: number;
        name: string;
        description: string;
    };
    errors?: Record<string, string>;
    [key: string]: unknown;
}

export default function CreateKnowledgeBase({ chatbot, errors }: CreateKnowledgeBaseProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Chatbots',
            href: '/chatbots',
        },
        {
            title: chatbot.name,
            href: `/chatbots/${chatbot.id}`,
        },
        {
            title: 'Knowledge Bases',
            href: `/chatbots/${chatbot.id}/knowledge-bases`,
        },
        {
            title: 'Upload Document',
            href: `/chatbots/${chatbot.id}/knowledge-bases/create`,
        },
    ];

    const [formData, setFormData] = useState({
        name: '',
        content: '',
    });
    
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        const data = new FormData();
        data.append('name', formData.name);
        if (formData.content) {
            data.append('content', formData.content);
        }
        if (selectedFile) {
            data.append('file', selectedFile);
        }
        
        router.post(route('chatbots.knowledge-bases.store', chatbot.id), data, {
            onFinish: () => setIsSubmitting(false)
        });
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        setSelectedFile(file);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`📤 Upload Document - ${chatbot.name}`} />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">📤 Upload Document</h1>
                        <p className="mt-2 text-gray-600">
                            Add knowledge to <strong>{chatbot.name}</strong> by uploading files or entering text
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Form */}
                    <div className="lg:col-span-2">
                        <Card className="border-0 shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center text-xl">
                                    <span className="mr-2">📚</span>
                                    Knowledge Base Details
                                </CardTitle>
                                <CardDescription>
                                    Upload documents or enter text to train your AI chatbot
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Name */}
                                    <div>
                                        <Label htmlFor="name" className="text-base font-medium">
                                            Knowledge Base Name *
                                        </Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                            placeholder="e.g., Product Manual, FAQ, Company Policies"
                                            className="mt-2"
                                            required
                                        />
                                        {errors?.name && (
                                            <p className="text-red-600 text-sm mt-1">{errors.name}</p>
                                        )}
                                    </div>

                                    <div className="border-t pt-6">
                                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                                            <span className="mr-2">📤</span>
                                            Upload Method
                                        </h3>
                                        <p className="text-gray-600 mb-6">
                                            Choose to upload a file or enter text content directly
                                        </p>
                                    </div>

                                    {/* File Upload */}
                                    <div>
                                        <Label htmlFor="file" className="text-base font-medium">
                                            Upload File (Optional)
                                        </Label>
                                        <Input
                                            id="file"
                                            type="file"
                                            onChange={handleFileChange}
                                            accept=".pdf,.xlsx,.xls,.csv,.txt"
                                            className="mt-2"
                                        />
                                        <p className="text-sm text-gray-500 mt-1">
                                            Supported formats: PDF, Excel (xlsx, xls), CSV, Text files (max 10MB)
                                        </p>
                                        {selectedFile && (
                                            <div className="mt-2 p-2 bg-blue-50 rounded-lg">
                                                <p className="text-sm text-blue-800">
                                                    Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                                                </p>
                                            </div>
                                        )}
                                        {errors?.file && (
                                            <p className="text-red-600 text-sm mt-1">{errors.file}</p>
                                        )}
                                    </div>

                                    {/* Text Content */}
                                    <div>
                                        <Label htmlFor="content" className="text-base font-medium">
                                            Text Content (Optional)
                                        </Label>
                                        <Textarea
                                            id="content"
                                            value={formData.content}
                                            onChange={(e) => handleInputChange('content', e.target.value)}
                                            placeholder="Enter text content directly... This is useful for FAQ, policies, or any text-based information."
                                            rows={8}
                                            className="mt-2"
                                        />
                                        <p className="text-sm text-gray-500 mt-1">
                                            You can enter text content if you don't have a file to upload
                                        </p>
                                        {errors?.content && (
                                            <p className="text-red-600 text-sm mt-1">{errors.content}</p>
                                        )}
                                    </div>

                                    {/* Submit Buttons */}
                                    <div className="flex space-x-4 pt-6">
                                        <Button 
                                            type="submit" 
                                            disabled={isSubmitting || (!selectedFile && !formData.content.trim())}
                                            size="lg"
                                            className="flex-1"
                                        >
                                            {isSubmitting ? '⏳ Uploading...' : '📤 Upload Knowledge Base'}
                                        </Button>
                                        <Button 
                                            type="button" 
                                            variant="outline"
                                            onClick={() => router.get(route('chatbots.knowledge-bases.index', chatbot.id))}
                                            size="lg"
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <Card className="border-0 shadow-md">
                            <CardHeader>
                                <CardTitle className="flex items-center text-lg">
                                    <span className="mr-2">💡</span>
                                    Tips for Best Results
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="p-3 bg-blue-50 rounded-lg">
                                    <h4 className="font-semibold text-blue-900">Clear Naming</h4>
                                    <p className="text-sm text-blue-800 mt-1">
                                        Use descriptive names like "Product FAQ" or "User Manual"
                                    </p>
                                </div>
                                <div className="p-3 bg-green-50 rounded-lg">
                                    <h4 className="font-semibold text-green-900">File Formats</h4>
                                    <p className="text-sm text-green-800 mt-1">
                                        PDFs and Excel files work best for structured information
                                    </p>
                                </div>
                                <div className="p-3 bg-purple-50 rounded-lg">
                                    <h4 className="font-semibold text-purple-900">Content Quality</h4>
                                    <p className="text-sm text-purple-800 mt-1">
                                        Clear, well-organized content helps your bot give better answers
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-md">
                            <CardHeader>
                                <CardTitle className="flex items-center text-lg">
                                    <span className="mr-2">🔄</span>
                                    What Happens Next?
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ol className="space-y-2 text-sm">
                                    <li className="flex items-start">
                                        <span className="inline-block w-5 h-5 bg-blue-100 text-blue-800 rounded-full text-xs flex items-center justify-center mr-2 mt-0.5">1</span>
                                        Upload your document
                                    </li>
                                    <li className="flex items-start">
                                        <span className="inline-block w-5 h-5 bg-gray-100 text-gray-800 rounded-full text-xs flex items-center justify-center mr-2 mt-0.5">2</span>
                                        AI processes the content
                                    </li>
                                    <li className="flex items-start">
                                        <span className="inline-block w-5 h-5 bg-gray-100 text-gray-800 rounded-full text-xs flex items-center justify-center mr-2 mt-0.5">3</span>
                                        Knowledge becomes available
                                    </li>
                                    <li className="flex items-start">
                                        <span className="inline-block w-5 h-5 bg-gray-100 text-gray-800 rounded-full text-xs flex items-center justify-center mr-2 mt-0.5">4</span>
                                        Bot starts using new knowledge
                                    </li>
                                </ol>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}