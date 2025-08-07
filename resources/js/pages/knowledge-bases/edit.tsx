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

interface EditKnowledgeBaseProps {
    chatbot: {
        id: number;
        name: string;
        description: string;
    };
    knowledgeBase: {
        id: number;
        name: string;
        content: string;
        type: string;
        status: string;
    };
    errors?: Record<string, string>;
    [key: string]: unknown;
}

export default function EditKnowledgeBase({ chatbot, knowledgeBase, errors }: EditKnowledgeBaseProps) {
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
            title: knowledgeBase.name,
            href: `/knowledge-bases/${knowledgeBase.id}`,
        },
        {
            title: 'Edit',
            href: `/knowledge-bases/${knowledgeBase.id}/edit`,
        },
    ];

    const [formData, setFormData] = useState({
        name: knowledgeBase.name,
        content: knowledgeBase.content || '',
    });
    
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        router.put(route('knowledge-bases.update', knowledgeBase.id), formData, {
            onFinish: () => setIsSubmitting(false)
        });
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`✏️ Edit ${knowledgeBase.name}`} />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">✏️ Edit Knowledge Base</h1>
                        <p className="mt-2 text-gray-600">
                            Update <strong>{knowledgeBase.name}</strong> for {chatbot.name}
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
                                    Update the name and content of your knowledge base
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

                                    {/* Text Content */}
                                    <div>
                                        <Label htmlFor="content" className="text-base font-medium">
                                            Content
                                        </Label>
                                        <Textarea
                                            id="content"
                                            value={formData.content}
                                            onChange={(e) => handleInputChange('content', e.target.value)}
                                            placeholder="Enter or update the text content..."
                                            rows={12}
                                            className="mt-2"
                                        />
                                        <p className="text-sm text-gray-500 mt-1">
                                            {formData.content.length} characters
                                        </p>
                                        {errors?.content && (
                                            <p className="text-red-600 text-sm mt-1">{errors.content}</p>
                                        )}
                                    </div>

                                    {/* Submit Buttons */}
                                    <div className="flex space-x-4 pt-6">
                                        <Button 
                                            type="submit" 
                                            disabled={isSubmitting}
                                            size="lg"
                                            className="flex-1"
                                        >
                                            {isSubmitting ? '⏳ Saving...' : '💾 Save Changes'}
                                        </Button>
                                        <Button 
                                            type="button" 
                                            variant="outline"
                                            onClick={() => router.get(route('knowledge-bases.show', knowledgeBase.id))}
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
                                    <span className="mr-2">ℹ️</span>
                                    File Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Type</label>
                                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded mt-1 capitalize">
                                        {knowledgeBase.type}
                                    </p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-700">Status</label>
                                    <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded mt-1 capitalize">
                                        {knowledgeBase.status}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-md">
                            <CardHeader>
                                <CardTitle className="flex items-center text-lg">
                                    <span className="mr-2">💡</span>
                                    Editing Tips
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="p-3 bg-blue-50 rounded-lg">
                                    <h4 className="font-semibold text-blue-900">Content Updates</h4>
                                    <p className="text-sm text-blue-800 mt-1">
                                        Changes to content will be processed and made available to your bot
                                    </p>
                                </div>
                                <div className="p-3 bg-green-50 rounded-lg">
                                    <h4 className="font-semibold text-green-900">Formatting</h4>
                                    <p className="text-sm text-green-800 mt-1">
                                        Use clear headings and bullet points for better AI understanding
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}