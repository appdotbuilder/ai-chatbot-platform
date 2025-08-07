import React, { useState } from 'react';
import { router } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { SelectSimple } from '@/components/ui/select';
import { type BreadcrumbItem } from '@/types';

interface EditChatbotProps {
    chatbot: {
        id: number;
        name: string;
        description: string;
        whatsapp_phone_number: string;
        whatsapp_access_token: string;
        whatsapp_webhook_verify_token: string;
        status: string;
    };
    errors?: Record<string, string>;
    [key: string]: unknown;
}

export default function EditChatbot({ chatbot, errors }: EditChatbotProps) {
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
            title: 'Edit',
            href: `/chatbots/${chatbot.id}/edit`,
        },
    ];

    const [formData, setFormData] = useState({
        name: chatbot.name,
        description: chatbot.description || '',
        whatsapp_phone_number: chatbot.whatsapp_phone_number || '',
        whatsapp_access_token: chatbot.whatsapp_access_token || '',
        whatsapp_webhook_verify_token: chatbot.whatsapp_webhook_verify_token || '',
        status: chatbot.status
    });
    
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        router.put(route('chatbots.update', chatbot.id), formData, {
            onFinish: () => setIsSubmitting(false)
        });
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`✏️ Edit ${chatbot.name}`} />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">✏️ Edit Chatbot</h1>
                        <p className="mt-2 text-gray-600">
                            Update settings and configuration for <strong>{chatbot.name}</strong>
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Form */}
                    <div className="lg:col-span-2">
                        <Card className="border-0 shadow-lg">
                            <CardHeader>
                                <CardTitle className="flex items-center text-xl">
                                    <span className="mr-2">🤖</span>
                                    Bot Configuration
                                </CardTitle>
                                <CardDescription>
                                    Update your chatbot's basic settings and identity.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Bot Name */}
                                    <div>
                                        <Label htmlFor="name" className="text-base font-medium">
                                            Bot Name *
                                        </Label>
                                        <Input
                                            id="name"
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                            placeholder="e.g., Customer Support Bot"
                                            className="mt-2"
                                            required
                                        />
                                        {errors?.name && (
                                            <p className="text-red-600 text-sm mt-1">{errors.name}</p>
                                        )}
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <Label htmlFor="description" className="text-base font-medium">
                                            Description
                                        </Label>
                                        <Textarea
                                            id="description"
                                            value={formData.description}
                                            onChange={(e) => handleInputChange('description', e.target.value)}
                                            placeholder="Describe what your chatbot does and how it helps customers..."
                                            rows={3}
                                            className="mt-2"
                                        />
                                        {errors?.description && (
                                            <p className="text-red-600 text-sm mt-1">{errors.description}</p>
                                        )}
                                    </div>

                                    {/* Status */}
                                    <div>
                                        <Label htmlFor="status" className="text-base font-medium">
                                            Status
                                        </Label>
                                        <SelectSimple 
                                            value={formData.status} 
                                            onValueChange={(value) => handleInputChange('status', value)}
                                        >
                                            <option value="active">🟢 Active - Ready to serve</option>
                                            <option value="inactive">🔴 Inactive - Disabled</option>
                                        </SelectSimple>
                                        {errors?.status && (
                                            <p className="text-red-600 text-sm mt-1">{errors.status}</p>
                                        )}
                                    </div>

                                    <div className="border-t pt-6">
                                        <h3 className="text-lg font-semibold mb-4 flex items-center">
                                            <span className="mr-2">📱</span>
                                            WhatsApp Configuration
                                        </h3>
                                        <p className="text-gray-600 mb-6">
                                            Update your WhatsApp Cloud API integration settings.
                                        </p>
                                    </div>

                                    {/* WhatsApp Phone Number */}
                                    <div>
                                        <Label htmlFor="whatsapp_phone_number" className="text-base font-medium">
                                            WhatsApp Business Phone Number
                                        </Label>
                                        <Input
                                            id="whatsapp_phone_number"
                                            type="text"
                                            value={formData.whatsapp_phone_number}
                                            onChange={(e) => handleInputChange('whatsapp_phone_number', e.target.value)}
                                            placeholder="e.g., +1234567890"
                                            className="mt-2"
                                        />
                                        <p className="text-sm text-gray-500 mt-1">
                                            Your verified WhatsApp Business phone number
                                        </p>
                                        {errors?.whatsapp_phone_number && (
                                            <p className="text-red-600 text-sm mt-1">{errors.whatsapp_phone_number}</p>
                                        )}
                                    </div>

                                    {/* WhatsApp Access Token */}
                                    <div>
                                        <Label htmlFor="whatsapp_access_token" className="text-base font-medium">
                                            WhatsApp Access Token
                                        </Label>
                                        <Input
                                            id="whatsapp_access_token"
                                            type="password"
                                            value={formData.whatsapp_access_token}
                                            onChange={(e) => handleInputChange('whatsapp_access_token', e.target.value)}
                                            placeholder="Your WhatsApp Cloud API access token"
                                            className="mt-2"
                                        />
                                        <p className="text-sm text-gray-500 mt-1">
                                            Get this from your Meta for Developers account
                                        </p>
                                        {errors?.whatsapp_access_token && (
                                            <p className="text-red-600 text-sm mt-1">{errors.whatsapp_access_token}</p>
                                        )}
                                    </div>

                                    {/* Webhook Verify Token */}
                                    <div>
                                        <Label htmlFor="whatsapp_webhook_verify_token" className="text-base font-medium">
                                            Webhook Verify Token
                                        </Label>
                                        <Input
                                            id="whatsapp_webhook_verify_token"
                                            type="text"
                                            value={formData.whatsapp_webhook_verify_token}
                                            onChange={(e) => handleInputChange('whatsapp_webhook_verify_token', e.target.value)}
                                            placeholder="A secret token for webhook verification"
                                            className="mt-2"
                                        />
                                        <p className="text-sm text-gray-500 mt-1">
                                            Create a secure token to verify webhook requests
                                        </p>
                                        {errors?.whatsapp_webhook_verify_token && (
                                            <p className="text-red-600 text-sm mt-1">{errors.whatsapp_webhook_verify_token}</p>
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
                                            {isSubmitting ? '⏳ Saving Changes...' : '💾 Save Changes'}
                                        </Button>
                                        <Button 
                                            type="button" 
                                            variant="outline"
                                            onClick={() => router.get(route('chatbots.show', chatbot.id))}
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
                                    Configuration Tips
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="p-3 bg-blue-50 rounded-lg">
                                    <h4 className="font-semibold text-blue-900">Status Changes</h4>
                                    <p className="text-sm text-blue-800 mt-1">
                                        Setting to inactive will stop the bot from responding to messages
                                    </p>
                                </div>
                                <div className="p-3 bg-green-50 rounded-lg">
                                    <h4 className="font-semibold text-green-900">WhatsApp Setup</h4>
                                    <p className="text-sm text-green-800 mt-1">
                                        Make sure your phone number is verified with Meta Business
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-md">
                            <CardHeader>
                                <CardTitle className="flex items-center text-lg">
                                    <span className="mr-2">🔗</span>
                                    Quick Links
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <Button variant="outline" className="w-full justify-start" onClick={() => router.get(route('chatbots.show', chatbot.id))}>
                                        📊 View Bot Details
                                    </Button>
                                    <Button variant="outline" className="w-full justify-start" onClick={() => router.get(route('chatbots.knowledge-bases.index', chatbot.id))}>
                                        📚 Manage Knowledge Base
                                    </Button>
                                    <Button variant="outline" className="w-full justify-start" onClick={() => router.get(route('chatbots.index'))}>
                                        🤖 All Chatbots
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}