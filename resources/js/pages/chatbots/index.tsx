import React from 'react';
import { Link, router } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { type BreadcrumbItem } from '@/types';

interface ChatbotsIndexProps {
    chatbots: {
        data: Array<{
            id: number;
            name: string;
            description: string;
            status: string;
            whatsapp_phone_number: string;
            knowledge_bases_count: number;
            conversations_count: number;
            created_at: string;
        }>;
        links: unknown[];
        meta: Record<string, unknown>;
    };
    [key: string]: unknown;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Chatbots',
        href: '/chatbots',
    },
];

export default function ChatbotsIndex({ chatbots }: ChatbotsIndexProps) {
    const handleCreateChatbot = () => {
        router.get(route('chatbots.create'));
    };

    const handleDeleteChatbot = (chatbotId: number) => {
        if (confirm('Are you sure you want to delete this chatbot? This action cannot be undone.')) {
            router.delete(route('chatbots.destroy', chatbotId));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="🤖 My Chatbots" />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">🤖 My Chatbots</h1>
                        <p className="mt-2 text-gray-600">
                            Manage all your AI-powered WhatsApp chatbots from one place.
                        </p>
                    </div>
                    <Button onClick={handleCreateChatbot} size="lg">
                        Create New Bot 🚀
                    </Button>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="border-0 shadow-md">
                        <CardHeader>
                            <CardTitle className="flex items-center text-lg">
                                <span className="mr-2">📊</span>
                                Total Bots
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-blue-600">{chatbots.data.length}</div>
                        </CardContent>
                    </Card>
                    
                    <Card className="border-0 shadow-md">
                        <CardHeader>
                            <CardTitle className="flex items-center text-lg">
                                <span className="mr-2">⚡</span>
                                Active Bots
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-green-600">
                                {chatbots.data.filter(bot => bot.status === 'active').length}
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card className="border-0 shadow-md">
                        <CardHeader>
                            <CardTitle className="flex items-center text-lg">
                                <span className="mr-2">💬</span>
                                Total Conversations
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-purple-600">
                                {chatbots.data.reduce((sum, bot) => sum + bot.conversations_count, 0)}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Chatbots List */}
                {!chatbots.data.length ? (
                    <Card className="text-center py-16 border-0 shadow-lg">
                        <CardContent>
                            <div className="text-8xl mb-6">🤖</div>
                            <CardTitle className="text-2xl mb-4">No chatbots found</CardTitle>
                            <CardDescription className="text-lg mb-8 max-w-md mx-auto">
                                Create your first AI chatbot to start automating customer conversations through WhatsApp.
                            </CardDescription>
                            <Button onClick={handleCreateChatbot} size="lg" className="px-8">
                                Create Your First Bot 🚀
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-4">
                        {chatbots.data.map((chatbot) => (
                            <Card key={chatbot.id} className="border-0 shadow-md hover:shadow-lg transition-all duration-200">
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start space-x-4 flex-1">
                                            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-md">
                                                <span className="text-white text-2xl">🤖</span>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div>
                                                        <h3 className="text-xl font-semibold text-gray-900 mb-1">
                                                            {chatbot.name}
                                                        </h3>
                                                        <p className="text-gray-600 mb-3">
                                                            {chatbot.description || 'No description provided'}
                                                        </p>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex items-center space-x-6 mb-4">
                                                    <Badge 
                                                        variant={chatbot.status === 'active' ? 'default' : 'secondary'}
                                                        className={chatbot.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                                                    >
                                                        {chatbot.status === 'active' ? '🟢 Active' : '🔴 Inactive'}
                                                    </Badge>
                                                    
                                                    {chatbot.whatsapp_phone_number && (
                                                        <span className="text-sm text-gray-600 flex items-center">
                                                            📱 {chatbot.whatsapp_phone_number}
                                                        </span>
                                                    )}
                                                </div>
                                                
                                                <div className="flex items-center space-x-6 text-sm text-gray-500">
                                                    <span className="flex items-center">
                                                        📚 {chatbot.knowledge_bases_count} knowledge bases
                                                    </span>
                                                    <span className="flex items-center">
                                                        💬 {chatbot.conversations_count} conversations
                                                    </span>
                                                    <span className="flex items-center">
                                                        📅 Created {new Date(chatbot.created_at).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="flex flex-col space-y-2 ml-4">
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href={route('chatbots.show', chatbot.id)}>
                                                    View Details
                                                </Link>
                                            </Button>
                                            <Button size="sm" asChild>
                                                <Link href={route('chatbots.edit', chatbot.id)}>
                                                    Edit Bot
                                                </Link>
                                            </Button>
                                            <Button 
                                                variant="outline" 
                                                size="sm" 
                                                onClick={() => handleDeleteChatbot(chatbot.id)}
                                                className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}